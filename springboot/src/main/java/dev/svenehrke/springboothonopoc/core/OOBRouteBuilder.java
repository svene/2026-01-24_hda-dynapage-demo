package dev.svenehrke.springboothonopoc.core;

import dev.svenehrke.springboothonopoc.app.Oob;
import org.springframework.stereotype.Component;

@Component
@Oob
public class OOBRouteBuilder implements RouteBuilder {
	public static final String BASE = "/demo/oob";

	@Override
	public String detailsUrl(int id) {
		return idUrl(BASE + RouteBuilder.DETAILS_URL, id);
	}
	@Override
	public String detailsBackUrl(int id) {
		return idUrl(BASE + RouteBuilder.DETAILS_BACK_URL, id);
	}

	@Override
	public String editUrl(int id) {
		return idUrl(BASE + RouteBuilder.EDIT_URL, id);
	}

	@Override
	public String editBackUrl(int id) {
		return idUrl(BASE + RouteBuilder.EDIT_BACK_URL, id);
	}

	@Override
	public String updateUrl(int id) {
		return idUrl(BASE + RouteBuilder.PERSON_URL, id);
	}
}
