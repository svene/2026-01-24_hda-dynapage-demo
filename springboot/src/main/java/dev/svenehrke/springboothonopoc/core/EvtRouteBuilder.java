package dev.svenehrke.springboothonopoc.core;

import dev.svenehrke.springboothonopoc.app.Evt;
import dev.svenehrke.springboothonopoc.inbound.web.RoutingUrls;
import org.springframework.stereotype.Component;

@Component
@Evt
public class EvtRouteBuilder implements RouteBuilder {
	@Override
	public String detailsUrl(int id) {
		return RoutingUrls.DETAILS.url(id);
	}
}
