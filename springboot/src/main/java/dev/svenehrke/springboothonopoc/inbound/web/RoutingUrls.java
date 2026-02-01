package dev.svenehrke.springboothonopoc.inbound.web;

import org.springframework.web.util.UriComponentsBuilder;

public interface RoutingUrls {
	String PAGE = "/page";
	String PERSON_TABLE = "/persontable";
	String DELETE = "/delete";

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
	interface EDIT_BACK {
		String URL = "/person/{id}/editback";
		static String url(int id) {
			return UriComponentsBuilder
				.fromPath(URL)
				.buildAndExpand(id)
				.toUriString();
		};
	}
	interface DETAILS {
		String URL = "/person/{id}/details";
	}
	interface ROW {
		String URL = "/person/{id}/row";
	}
	interface PERSON {
		String URL = "/person/{id}";
	}
}
