import { Project, Node, SyntaxKind, TemplateExpression, SourceFile } from "ts-morph";
import * as path from "path";
import * as fs from "fs";
import {SharedConstGeneratorOptions} from "./generator-options";

/* =======================
   Public API
   ======================= */

export function generateSharedConsts(options: SharedConstGeneratorOptions): void {
	const {
		tsConfigPath,
		inputGlob,
		outputDir,
		javaPackage,
	} = options;

	const project = new Project({
		tsConfigFilePath: tsConfigPath,
	});

	const sourceFiles = project.addSourceFilesAtPaths(inputGlob);

	if (sourceFiles.length === 0) {
		console.warn("No shared const files found.");
		return;
	}

	fs.mkdirSync(outputDir, { recursive: true });

	for (const sf of sourceFiles) {
		generateJavaForFile(sf, outputDir, javaPackage);
	}
}

/* =======================
   Core generation
   ======================= */

function generateJavaForFile(
	sourceFile: SourceFile,
	outputDir: string,
	javaPackage: string
): void {
	const tsFileName = path.basename(sourceFile.getFilePath());
  const javaTypeName = toJavaTypeName(tsFileName);
  const javaFilePath = path.join(outputDir, `${javaTypeName}.java`);

  // 1️⃣ collect string constants
	const stringConsts = collectStringConsts(sourceFile);

  // 2️⃣ build Java source
	const lines: string[] = [];

	lines.push(`package ${javaPackage};`, "");
  lines.push(`public interface ${javaTypeName} {`, "");

  // 3️⃣ top-level constants
	for (const [name, value] of stringConsts) {
		lines.push(
      ...indent([`String ${name} = "${value}";`])
		);
	}

	if (stringConsts.size > 0) {
		lines.push("");
	}

  // 4️⃣ exported objects → nested interfaces
	sourceFile.getVariableStatements().forEach(stmt => {
		if (!stmt.isExported()) return;

		stmt.getDeclarations().forEach(decl => {
			const obj = decl.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
			if (!obj) return;

			lines.push(
        ...emitNestedInterface(
					decl.getName(),
					obj,
					stringConsts
				),
				""
			);
		});
	});

	lines.push("}");

	fs.writeFileSync(javaFilePath, lines.join("\n"), "utf8");
}

/* =======================
   Helpers
   ======================= */

function collectStringConsts(sourceFile: SourceFile): Map<string, string> {
	const map = new Map<string, string>();

	sourceFile.getVariableDeclarations().forEach(decl => {
		const init = decl.getInitializer();
		if (Node.isStringLiteral(init)) {
			map.set(decl.getName(), init.getLiteralText());
		}
	});

	return map;
}

function emitNestedInterface(
  interfaceName: string,
	objectLiteral,
	stringConsts: Map<string, string>
): string[] {
	const lines: string[] = [];

  lines.push(`interface ${interfaceName} {`, "");

	objectLiteral.getProperties().forEach(prop => {
		if (!Node.isPropertyAssignment(prop)) return;

		const key = prop.getName();
		const init = prop.getInitializer();

		let value: string;

		if (Node.isStringLiteral(init)) {
			value = init.getLiteralText();
		} else if (Node.isTemplateExpression(init)) {
			value = resolveTemplate(init, stringConsts);
		} else {
			throw new Error(`Unsupported initializer for ${key}`);
		}

		lines.push(
      ...indent([`String ${key} = "${value}";`])
		);
	});

	lines.push("}");

	return indent(lines);
}

function resolveTemplate(
	expr: TemplateExpression,
	stringConsts: Map<string, string>
): string {
	let result = expr.getHead().getText().replace(/`/g, "");

	expr.getTemplateSpans().forEach(span => {
		const refName = span.getExpression().getText();
		const refValue = stringConsts.get(refName);

		if (!refValue) {
			throw new Error(`Unknown const referenced in template: ${refName}`);
		}

		result += refValue + span.getLiteral().getText();
	});

	return result;
}

function toJavaTypeName(tsFileName: string): string {
	return tsFileName
		.replace(/\.ts$/, "")
		.split("-")
		.map(p => p.charAt(0).toUpperCase() + p.slice(1))
		.join("");
}

function indent(lines: string[], level = 1): string[] {
	const pad = "    ".repeat(level);
	return lines.map(l => pad + l);
}
