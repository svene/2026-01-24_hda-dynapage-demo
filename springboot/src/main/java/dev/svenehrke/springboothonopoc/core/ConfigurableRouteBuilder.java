package dev.svenehrke.springboothonopoc.core;

public class ConfigurableRouteBuilder implements RouteBuilder {
	private final String base;

	public ConfigurableRouteBuilder(String base) {
		this.base = base;
	}

	@Override
	public String detailsUrl(int id) {
		return idUrl(base + RouteBuilder.DETAILS_URL, id);
	}
	@Override
	public String detailsBackUrl(int id) {
		return idUrl(base + RouteBuilder.DETAILS_BACK_URL, id);
	}
	@Override
	public String editUrl(int id) {
		return idUrl(base + RouteBuilder.EDIT_URL, id);
	}
	@Override
	public String editBackUrl(int id) {
		return idUrl(base + RouteBuilder.EDIT_BACK_URL, id);
	}
	@Override
	public String updateUrl(int id) {
		return idUrl(base + RouteBuilder.PERSON_URL, id);
	}
}
