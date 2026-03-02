package dev.svenehrke.springboothonopoc.core;

import dev.svenehrke.springboothonopoc.core.HonoWebApiSharedConsts.HonoWebApiConsts;
import org.springframework.web.util.UriComponentsBuilder;

public interface RouteBuilder {
	String PERSON_URL = "/person/{id}"; // TODO: no UI, only update
	String PAGE_URL = "/page";
	String PERSON_TABLE_URL = "/persontable";
	String DELETE_URL = "/delete"; // TODO: no UI, only update

	static String detailsUrl(int id) {
		return idUrl(HonoWebApiConsts.PERSON_DETAILS, id);
	}
	static String detailsBackUrl(int id) {
		return idUrl(HonoWebApiConsts.PERSON_DETAILS_BACK, id);
	}
	static String editUrl(int id) {
		return idUrl(HonoWebApiConsts.PERSON_EDIT, id);
	}
	static String detailsCardUrl(int id) {
		return idUrl(HonoWebApiConsts.PERSON_DETAILS_CARD, id);
	}
	static String updateUrl(int id) { // TODO: no UI, only update
		return idUrl(HonoWebApiConsts.PERSON, id);
	}
	static String rowUrl(int id) {
		return idUrl(HonoWebApiConsts.PERSON_ROW, id);
	}

	static String idUrl(String url, int id) {
		return UriComponentsBuilder.fromPath(url).buildAndExpand(id).toUriString();
	}

}
