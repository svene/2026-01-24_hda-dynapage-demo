package dev.svenehrke.springboothonopoc.app;

import dev.svenehrke.springboothonopoc.core.*;
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
		JdbcTemplate jdbcTemplate
	) {
		return new HSQLPeopleRepository(jdbcClient, jdbcTemplate);
	}

	@Bean
	@Oob
	public PeopleService oobPeopleService(@Oob PeopleRepository repo) {
		return new PeopleService(repo);
	}

}
