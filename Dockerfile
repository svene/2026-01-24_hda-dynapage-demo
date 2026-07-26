# Dockerfile (repo root)
#
# One Dockerfile, multiple targets. Docker Compose builds this same file
# twice, once per service, selecting the target stage it needs. Both
# targets share the "maven-build" stage's cache, so Maven only really
# runs once per build (as long as its inputs haven't changed).
#
# Why one Dockerfile instead of two: the typescript-generator Maven plugin
# runs during the springboot build and writes hono/src/generated/types/vm-types.d.ts
# as a side effect. The hono image needs that generated file, so both
# builds need to share the same Maven build stage and repo-root context.

# ---------------------------------------------------------------------------
# Stage: maven-build
# Builds the springboot jar AND, as a side effect of the Maven build,
# generates hono/src/generated/types/vm-types.d.ts via the
# typescript-generator-maven-plugin bound to the process-classes phase.
# ---------------------------------------------------------------------------
FROM maven:3.9-eclipse-temurin-21 AS maven-build
WORKDIR /workspace

# Copy POMs first for dependency caching
COPY pom.xml .
COPY springboot/pom.xml springboot/pom.xml
RUN mvn -B -f pom.xml -pl springboot dependency:go-offline

# Copy sources and build. This runs process-classes (and therefore the
# typescript-generator plugin) as part of the package lifecycle.
COPY springboot/src springboot/src
RUN mvn -B -f pom.xml package -DskipTests

# ---------------------------------------------------------------------------
# Target: springboot-runtime
# ---------------------------------------------------------------------------
FROM eclipse-temurin:21-jre AS springboot-runtime
WORKDIR /app
COPY --from=maven-build /workspace/springboot/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

# ---------------------------------------------------------------------------
# Target: hono-runtime
# ---------------------------------------------------------------------------
FROM oven/bun:1 AS hono-runtime
WORKDIR /app

# Install dependencies first (better layer caching).
# Bun reads package-lock.json directly to resolve exact versions when no
# bun.lock/bun.lockb is present yet.
COPY hono/package.json hono/package-lock.json ./
RUN bun install

# Copy the rest of the hono source
COPY hono/tsconfig.json ./
COPY hono/src ./src
COPY hono/static ./static

# Overlay the Maven-generated TS types on top (generated, not checked in;
# see note re: .gitignore below)
COPY --from=maven-build /workspace/hono/src/generated/types/vm-types.d.ts ./src/generated/types/vm-types.d.ts

ENV NODE_ENV=production
EXPOSE 3000

CMD ["bun", "run", "src/index.ts"]
