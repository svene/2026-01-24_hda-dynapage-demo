package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.app.Evt;
import dev.svenehrke.springboothonopoc.app.EvtConfig;
import dev.svenehrke.springboothonopoc.core.OOBPersonPageModel;
import dev.svenehrke.springboothonopoc.core.OOBPersonTableModel;
import dev.svenehrke.springboothonopoc.core.PeopleService;
import dev.svenehrke.springboothonopoc.core.RouteBuilder;
import dev.svenehrke.springboothonopoc.outbound.hono.HonoEventPersonApi;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * General Forwarding Pattern (Spring -> Hono):
 * - Step 1: Gather data from DB or services
 * - Step 2: Forward HTTP request to HONO
 */
@Controller
@RequestMapping(EvtConfig.EVT_BASE_URL)
public class EvtPeopleController {

	private final PeopleService peopleService;
	private final HonoEventPersonApi honoApi;
	private final RouteBuilder routeBuilder;

	public EvtPeopleController(
		@Evt PeopleService peopleService,
		HonoEventPersonApi honoApi,
		@Evt RouteBuilder routeBuilder
	) {
		this.peopleService = peopleService;
		this.honoApi = honoApi;
		this.routeBuilder = routeBuilder;
	}

	@GetMapping(RouteBuilder.PAGE_URL)
	public ResponseEntity<String> peoplePage() {
		var vm = new OOBPersonPageModel(peopleService.personTableModel(), routeBuilder.url(RouteBuilder.PERSON_TABLE_URL));
		return honoApi.peoplePage(vm);
	}
	@GetMapping(RouteBuilder.PERSON_TABLE_URL)
	public ResponseEntity<String> peopleUrl(@RequestParam() String search) {
		OOBPersonTableModel vm = peopleService.peopleForSearch(search);
		return honoApi.personTable(vm);
	}


	@GetMapping(RouteBuilder.DETAILS_URL)
	public ResponseEntity<String> details(@PathVariable int id) {
		return honoApi.personDetails(peopleService.personDetailModel(id));
	}
	@GetMapping(RouteBuilder.DETAILS_BACK_URL)
	public ResponseEntity<String> detailsBack(@PathVariable int id) {
		return honoApi.personDetailsBack(peopleService.personTableRowModel(id));
	}


}
