package dev.svenehrke.springboothonopoc.core;

import dev.svenehrke.springboothonopoc.app.Oob;
import dev.svenehrke.springboothonopoc.inbound.web.RoutingUrls;
import org.springframework.stereotype.Component;

@Component
@Oob
public class OOBRouteBuilder implements RouteBuilder {
	@Override
	public String detailsUrl(int id) {
		return RoutingUrls.DETAILS.url(id);
	}
}
