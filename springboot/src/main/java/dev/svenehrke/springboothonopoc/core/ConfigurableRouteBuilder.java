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
		return idUrl(OOBHonoWebApiConsts.PERSON_EDIT, id);
	}
	@Override
	public String detailsCardUrl(int id) {
		return idUrl(OOBHonoWebApiConsts.PERSON_DETAILS_CARD, id);
	}
	@Override
	public String updateUrl(int id) {
		return idUrl(base + RouteBuilder.PERSON_URL, id);
	} // TODO: no UI, only update

	@Override
	public String rowUrl(int id) {
		return idUrl(OOBHonoWebApiConsts.PERSON_ROW, id);
	}
}
