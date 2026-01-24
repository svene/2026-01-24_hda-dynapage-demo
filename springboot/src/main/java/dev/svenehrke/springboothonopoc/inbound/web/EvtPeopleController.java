package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.core.PeopleService;
import dev.svenehrke.springboothonopoc.core.PersonPageModel;
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
public class EvtPeopleController {

	public static final String URL_DEMO_EVENT_PAGE = "/demo/event/page";

	private final PeopleService peopleService;
	private final HonoEventPersonApi honoApi;

	public EvtPeopleController(
		PeopleService peopleService,
		HonoEventPersonApi honoApi
	) {
		this.peopleService = peopleService;
		this.honoApi = honoApi;
	}

	@GetMapping(URL_DEMO_EVENT_PAGE)
	public ResponseEntity<String> peoplePage() {
		var vm = new PersonPageModel(peopleService.personTableModel(), RoutingUrls.PERSON_TABLE);
		return honoApi.peoplePage(vm);
	}


}
