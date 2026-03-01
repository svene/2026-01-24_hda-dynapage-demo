package dev.svenehrke.springboothonopoc.app;

import dev.svenehrke.springboothonopoc.core.*;
import dev.svenehrke.springboothonopoc.outbound.db.HSQLPeopleRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.JdbcClient;

@Configuration
public class EvtConfig {
	@Bean
	@Evt
	public PeopleRepository evtPeopleRepository(
		JdbcClient jdbcClient,
		JdbcTemplate jdbcTemplate
	) {
		return new HSQLPeopleRepository(jdbcClient, jdbcTemplate);
	}

	@Bean
	@Evt
	public PeopleService evtPeopleService(@Evt PeopleRepository repo) {
		return new PeopleService(repo);
	}

}
