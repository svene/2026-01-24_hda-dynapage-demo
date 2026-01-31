package dev.svenehrke.springboothonopoc.app;

import dev.svenehrke.springboothonopoc.core.PeopleRepository;
import dev.svenehrke.springboothonopoc.core.PeopleService;
import dev.svenehrke.springboothonopoc.core.RouteBuilder;
import dev.svenehrke.springboothonopoc.outbound.db.HSQLPeopleRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.JdbcClient;

@Configuration
public class OobConfig {
	@Bean
	@Oob
	public PeopleRepository oobPeopleRepository(
		JdbcClient jdbcClient,
		JdbcTemplate jdbcTemplate,
		@Oob RouteBuilder routeBuilder
	) {
		return new HSQLPeopleRepository(jdbcClient, jdbcTemplate, routeBuilder);
	}

	@Bean
	@Oob
	public PeopleService oobPeopleService(@Oob PeopleRepository repo) {
		return new PeopleService(repo);
	}
}
