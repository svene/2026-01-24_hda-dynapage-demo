package dev.svenehrke.springboothonopoc.core;

import dev.svenehrke.springboothonopoc.app.Evt;
import org.springframework.stereotype.Component;

@Component
@Evt
public class EvtRouteBuilder implements RouteBuilder {
	public static final String BASE = "/demo/event";
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
