package dev.svenehrke.springboothonopoc.app;

import dev.svenehrke.springboothonopoc.core.ConfigurableRouteBuilder;
import dev.svenehrke.springboothonopoc.core.PeopleRepository;
import dev.svenehrke.springboothonopoc.core.PeopleService;
import dev.svenehrke.springboothonopoc.core.RouteBuilder;
import dev.svenehrke.springboothonopoc.outbound.db.HSQLPeopleRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.JdbcClient;

@Configuration
public class EvtConfig {
	public static final String EVT_BASE_URL = "/demo/event";

	@Bean
	@Evt
	public PeopleRepository evtPeopleRepository(
		JdbcClient jdbcClient,
		JdbcTemplate jdbcTemplate,
		@Evt RouteBuilder routeBuilder
	) {
		return new HSQLPeopleRepository(jdbcClient, jdbcTemplate, routeBuilder);
	}

	@Bean
	@Evt
	public PeopleService evtPeopleService(@Evt PeopleRepository repo) {
		return new PeopleService(repo);
	}

	@Bean
	@Evt
	public RouteBuilder evtRouteBuilder() {
		return new ConfigurableRouteBuilder("/demo/evt");
	}

}
