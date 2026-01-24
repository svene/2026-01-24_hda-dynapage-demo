package dev.svenehrke.springboothonopoc.inbound.web;

import org.springframework.web.util.UriComponentsBuilder;

public interface RoutingUrls {
	String DEMO_OOB_BASE = "/demo/oob";
	String PERSON_TABLE = DEMO_OOB_BASE + "/persontable";
	String DEMO_OOB_PAGE = DEMO_OOB_BASE + "/page";

	interface DETAILS_BACK {
		String URL = "/person/{id}/detailsback";
		static String url(int id) {
			return UriComponentsBuilder
				.fromPath(URL)
				.buildAndExpand(id)
				.toUriString();
		};
	}
	interface EDIT {
		String URL = "/person/{id}/edit";
		static String url(int id) {
			return UriComponentsBuilder
				.fromPath(URL)
				.buildAndExpand(id)
				.toUriString();
		};
	}
}
