package dev.svenehrke.springboothonopoc.core;

import dev.svenehrke.springboothonopoc.app.Oob;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@Oob
public class OOBRouteBuilder implements RouteBuilder {
	public static final String BASE = "/demo/oob";

	@Override
	public String detailsUrl(int id) {
		return UriComponentsBuilder
			.fromPath(BASE + RouteBuilder.DETAILS_URL)
			.buildAndExpand(id)
			.toUriString();
	}
	@Override
	public String detailsBackUrl(int id) {
		return UriComponentsBuilder
			.fromPath(BASE + RouteBuilder.DETAILS_BACK_URL)
			.buildAndExpand(id)
			.toUriString();
	}

	@Override
	public String editUrl(int id) {
		return UriComponentsBuilder
			.fromPath(BASE + RouteBuilder.EDIT_URL)
			.buildAndExpand(id)
			.toUriString();
	}

	@Override
	public String editBackUrl(int id) {
		return UriComponentsBuilder
			.fromPath(BASE + RouteBuilder.EDIT_BACK_URL)
			.buildAndExpand(id)
			.toUriString();
	}

	@Override
	public String saveUrl(int id) {
		return UriComponentsBuilder
			.fromPath(BASE + RouteBuilder.PERSON_URL)
			.buildAndExpand(id)
			.toUriString();
	}
}
