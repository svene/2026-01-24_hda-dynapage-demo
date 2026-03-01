package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.app.Oob;
import dev.svenehrke.springboothonopoc.app.OobConfig;
import dev.svenehrke.springboothonopoc.core.OOBPersonEditModel;
import dev.svenehrke.springboothonopoc.core.OOBPersonPageModel;
import dev.svenehrke.springboothonopoc.core.PeopleService;
import dev.svenehrke.springboothonopoc.core.RouteBuilder;
import dev.svenehrke.springboothonopoc.outbound.hono.HonoAppClient;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static dev.svenehrke.springboothonopoc.core.RouteBuilder.PAGE_URL;
import static dev.svenehrke.springboothonopoc.inbound.web.HTMXConsts.HX_REDIRECT;

/**
 * General Forwarding Pattern (Spring -> Hono):
 * - Step 1: Gather data from DB or services
 * - Step 2: Forward HTTP request to HONO
 */
@Controller
@RequestMapping(OobConfig.OOB_BASE_URL)
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

	@GetMapping(PAGE_URL)
	public ResponseEntity<String> peoplePage(HttpServletRequest request) {
		var vm = new OOBPersonPageModel(peopleService.personTableModel(), routeBuilder.url(RouteBuilder.PERSON_TABLE_URL));
		return honoAppClient.post(request.getRequestURI(), vm);
	}

	@GetMapping(RouteBuilder.PERSON_TABLE_URL)
	public ResponseEntity<String> peopleUrl(@RequestParam() String search, HttpServletRequest request) {
		return honoAppClient.post(request.getRequestURI(), peopleService.peopleForSearch(search));
	}

	@GetMapping(RouteBuilder.DETAILS_URL)
	public ResponseEntity<String> details(@PathVariable int id, HttpServletRequest request) {
		return honoAppClient.post(request.getRequestURI(), peopleService.personDetailModel(id));
	}
	@GetMapping(RouteBuilder.DETAILS_BACK_URL)
	public ResponseEntity<String> detailsBack(@PathVariable int id, HttpServletRequest request) {
		return honoAppClient.post(request.getRequestURI(), peopleService.personTableRowModel(id));
	}

	@GetMapping(RouteBuilder.EDIT_URL)
	public ResponseEntity<String> edit(@PathVariable int id, HttpServletRequest request) {
		return honoAppClient.post(request.getRequestURI(), peopleService.personEditModel(id));
	}

	@GetMapping(RouteBuilder.DETAILS_CARD_URL)
	public ResponseEntity<String> detailsCard(@PathVariable int id, HttpServletRequest request) {
		return honoAppClient.post(request.getRequestURI(), peopleService.personDetailModel(id));
	}

	@GetMapping(RouteBuilder.ROW_URL)
	public ResponseEntity<String> row(@PathVariable int id, HttpServletRequest request) {
		return honoAppClient.post(request.getRequestURI(), peopleService.personTableRowModel(id));
	}

	@DeleteMapping(RouteBuilder.DELETE_URL)
	public ResponseEntity<String> deleteRows(@RequestParam List<Integer> selection, HttpServletRequest request, HttpServletResponse response) {
		peopleService.deleteByIds(selection);
		return honoAppClient.post(routeBuilder.url(RouteBuilder.PERSON_TABLE_URL) , peopleService.peopleForSearch(""));
	}

	@PutMapping(RouteBuilder.PERSON_URL)
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
