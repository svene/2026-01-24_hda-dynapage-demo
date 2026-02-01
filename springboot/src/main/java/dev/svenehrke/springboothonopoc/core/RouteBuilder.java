package dev.svenehrke.springboothonopoc.core;

public interface RouteBuilder {
	String DETAILS_URL = "/person/{id}/details";
	String DETAILS_BACK_URL = "/person/{id}/detailsback";
	String EDIT_URL = "/person/{id}/edit";
	String EDIT_BACK_URL = "/person/{id}/editback";
	String ROW_URL = "/person/{id}/row";
	String PERSON_URL = "/person/{id}";
	String PAGE_URL = "/page";
	String PERSON_TABLE_URL = "/persontable";
	String DELETE_URL = "/delete";

	String detailsUrl(int id);
	String detailsBackUrl(int id);
	String editUrl(int id);
	String editBackUrl(int id);
	String saveUrl(int id);

}
