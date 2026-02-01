package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.app.Evt;
import dev.svenehrke.springboothonopoc.core.OOBPersonPageModel;
import dev.svenehrke.springboothonopoc.core.PeopleService;
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
@RequestMapping(EvtPeopleController.BASE)
public class EvtPeopleController {

	private final PeopleService peopleService;
	private final HonoEventPersonApi honoApi;

	public static final String BASE = "/demo/event";

	public EvtPeopleController(
		@Evt PeopleService peopleService,
		HonoEventPersonApi honoApi
	) {
		this.peopleService = peopleService;
		this.honoApi = honoApi;
	}

	@GetMapping(RoutingUrls.PAGE)
	public ResponseEntity<String> peoplePage() {
		var vm = new OOBPersonPageModel(peopleService.personTableModel(), RoutingUrls.PERSON_TABLE);
		return honoApi.peoplePage(vm);
	}

	@GetMapping(RoutingUrls.DETAILS.URL)
	public ResponseEntity<String> details(@PathVariable int id) {
		return honoApi.personDetails(peopleService.personDetailModel(id));
	}


}
