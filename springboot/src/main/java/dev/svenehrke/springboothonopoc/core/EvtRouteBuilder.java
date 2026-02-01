package dev.svenehrke.springboothonopoc.core;

import dev.svenehrke.springboothonopoc.app.Evt;
import dev.svenehrke.springboothonopoc.inbound.web.RoutingUrls;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@Evt
public class EvtRouteBuilder implements RouteBuilder {
	public static final String BASE = "/demo/event";
	@Override
	public String detailsUrl(int id) {
		return UriComponentsBuilder
			.fromPath(BASE + RoutingUrls.DETAILS.URL)
			.buildAndExpand(id)
			.toUriString();
	}
	@Override
	public String detailsBackUrl(int id) {
		return UriComponentsBuilder
			.fromPath(BASE + RoutingUrls.DETAILS_BACK.URL)
			.buildAndExpand(id)
			.toUriString();
	}
}
