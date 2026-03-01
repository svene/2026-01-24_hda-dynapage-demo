package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.app.Oob;
import dev.svenehrke.springboothonopoc.app.OobConfig;
import dev.svenehrke.springboothonopoc.core.*;
import dev.svenehrke.springboothonopoc.core.OobHonoWebApiSharedConsts.OOBHonoWebApiConsts;
import dev.svenehrke.springboothonopoc.outbound.hono.HonoAppClient;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static dev.svenehrke.springboothonopoc.inbound.web.HTMXConsts.HX_REDIRECT;

/**
 * General Forwarding Pattern (Spring -> Hono):
 * - Step 1: Gather data from DB or services
 * - Step 2: Forward HTTP request to HONO
 */
@Controller
public class PeopleController {

	private final PeopleService peopleService;
	private final RouteBuilder routeBuilder;
	private final HonoAppClient honoAppClient;

	public PeopleController(
		@Oob PeopleService peopleService,
		@Oob RouteBuilder routeBuilder,
		HonoAppClient honoAppClient

	) {
		this.peopleService = peopleService;
		this.routeBuilder = routeBuilder;
		this.honoAppClient = honoAppClient;
	}

	@GetMapping(OOBHonoWebApiConsts.PAGE)
	public ResponseEntity<String> peoplePage(HttpServletRequest request) {
		var vm = new OOBPersonPageModel(peopleService.personTableModel(), routeBuilder.url(RouteBuilder.PERSON_TABLE_URL));
		return honoAppClient.post(request.getRequestURI(), vm);
	}

	@GetMapping(OOBHonoWebApiConsts.PERSON_TABLE)
	public ResponseEntity<String> peopleUrl(@RequestParam() String search, HttpServletRequest request) {
		return honoAppClient.post(request.getRequestURI(), peopleService.peopleForSearch(search));
	}

	@GetMapping(OOBHonoWebApiConsts.PERSON_DETAILS)
	public ResponseEntity<String> details(@PathVariable int id, HttpServletRequest request) {
		return honoAppClient.post(request.getRequestURI(), peopleService.personDetailModel(id));
	}
	@GetMapping(OOBHonoWebApiConsts.PERSON_DETAILS_BACK)
	public ResponseEntity<String> detailsBack(@PathVariable int id, HttpServletRequest request) {
		return honoAppClient.post(request.getRequestURI(), peopleService.personTableRowModel(id));
	}

	@GetMapping(OOBHonoWebApiConsts.PERSON_EDIT)
	public ResponseEntity<String> edit(@PathVariable int id, HttpServletRequest request) {
		return honoAppClient.post(request.getRequestURI(), peopleService.personEditModel(id));
	}

	@GetMapping(OOBHonoWebApiConsts.PERSON_DETAILS_CARD)
	public ResponseEntity<String> detailsCard(@PathVariable int id, HttpServletRequest request) {
		return honoAppClient.post(request.getRequestURI(), peopleService.personDetailModel(id));
	}

	@GetMapping(OOBHonoWebApiConsts.PERSON_ROW)
	public ResponseEntity<String> row(@PathVariable int id, HttpServletRequest request) {
		return honoAppClient.post(request.getRequestURI(), peopleService.personTableRowModel(id));
	}

	@DeleteMapping(OobConfig.OOB_BASE_URL + RouteBuilder.DELETE_URL)
	public ResponseEntity<String> deleteRows(@RequestParam List<Integer> selection, HttpServletRequest request, HttpServletResponse response) {
		peopleService.deleteByIds(selection);
		return honoAppClient.post(routeBuilder.url(RouteBuilder.PERSON_TABLE_URL) , peopleService.peopleForSearch(""));
	}

	@PutMapping(OobConfig.OOB_BASE_URL + RouteBuilder.PERSON_URL)
	public ResponseEntity<String> updatePerson(
		@PathVariable int id,
		OOBPersonEditModel personEditModel,
		HttpServletRequest request,
		HttpServletResponse response
	) {
		response.setHeader(HX_REDIRECT, routeBuilder.url(RouteBuilder.PAGE_URL));
		peopleService.updatePerson(id, personEditModel);
		return peoplePage(request);
	}

}
