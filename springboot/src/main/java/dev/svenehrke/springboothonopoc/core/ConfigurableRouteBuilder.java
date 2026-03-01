package dev.svenehrke.springboothonopoc.core;

import dev.svenehrke.springboothonopoc.core.OobHonoWebApiSharedConsts.OOBHonoWebApiConsts;

public class ConfigurableRouteBuilder implements RouteBuilder {
	private final String base;

	public ConfigurableRouteBuilder(String base) {
		this.base = base;
	}

	@Override
	public String url(String url) {
		return base + url;
	}

	@Override
	public String detailsUrl(int id) {
		return idUrl(OOBHonoWebApiConsts.PERSON_DETAILS, id); // TODO: OOB specific
	}
	@Override
	public String detailsBackUrl(int id) {
		return idUrl(OOBHonoWebApiConsts.PERSON_DETAILS_BACK, id);
	}
	@Override
	public String editUrl(int id) {
		return idUrl(base + RouteBuilder.EDIT_URL, id);
	}
	@Override
	public String detailsCardUrl(int id) {
		return idUrl(base + RouteBuilder.DETAILS_CARD_URL, id);
	}
	@Override
	public String updateUrl(int id) {
		return idUrl(base + RouteBuilder.PERSON_URL, id);
	}

	@Override
	public String rowUrl(int id) {
		return idUrl(base + RouteBuilder.ROW_URL, id);
	}
}
