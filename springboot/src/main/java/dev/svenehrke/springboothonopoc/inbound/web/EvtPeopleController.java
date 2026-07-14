package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.app.Evt;
import dev.svenehrke.springboothonopoc.core.*;
import dev.svenehrke.springboothonopoc.outbound.hono.HonoAppClient;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * General Forwarding Pattern (Spring -> Hono):
 * - Step 1: Gather data from DB or services
 * - Step 2: Forward HTTP request to HONO
 */
@Controller
@RequestMapping(EvtPeopleController.EVT_PEOPLE_URL)
public class EvtPeopleController {

	public static final String EVT_PEOPLE_URL = "/demo/event";
	public static final String EVT_PEOPLE_PAGE_URL = "/page";

	private final PeopleService peopleService;
	private final HonoAppClient honoAppClient;

	public EvtPeopleController(
		@Evt PeopleService peopleService,
		HonoAppClient honoAppClient
	) {
		this.peopleService = peopleService;
		this.honoAppClient = honoAppClient;
	}

	@GetMapping(EVT_PEOPLE_PAGE_URL)
	public ResponseEntity<String> peoplePage() {
		var vm = new PersonPageModel(peopleService.personTableModel());
		return honoAppClient.route("EvtPersonPage", vm);
	}
	@GetMapping("/persontable")
	public ResponseEntity<String> peopleUrl(@RequestParam() String search) {
		PersonTableModel vm = peopleService.peopleForSearch(search);
		return honoAppClient.route("EvtPersonTable", vm);
	}

	@GetMapping("/person/{id}/details")
	public ResponseEntity<String> details(@PathVariable int id) {
		var vm = peopleService.personDetailModel(id);
		return honoAppClient.route("EvtPersonDetails", vm);
	}
	@GetMapping("/person/{id}/detailsrow")
	public ResponseEntity<String> detailsRow(@PathVariable int id) {
		var vm = peopleService.personDetailModel(id);
		return honoAppClient.route("EvtPersondetailsRow", vm);
	}

	@GetMapping("/person/{id}/detailscard")
	public ResponseEntity<String> detailsCard(@PathVariable int id) {
		var vm = peopleService.personDetailModel(id);
		return honoAppClient.route("EvtPersondetailsCard", vm);
	}

	@GetMapping("/person/{id}/edit")
	public ResponseEntity<String> edit(@PathVariable int id) {
		var vm = peopleService.personEditModel(id);
		return honoAppClient.route("EvtPersonEditor", vm);
	}
	@GetMapping("/person/{id}/row")
	public ResponseEntity<String> row(@PathVariable int id) {
		var vm = peopleService.personTableRowModel(id);
		return honoAppClient.route("EvtPersonRow", vm);
	}

	@DeleteMapping("/delete")
	public void deleteRows(@RequestParam List<Integer> selection, HttpServletResponse response) {
		peopleService.deleteByIds(selection);
		response.setHeader(
			HTMXConsts.HX_REDIRECT,
			EvtPeopleController.EVT_PEOPLE_URL + EvtPeopleController.EVT_PEOPLE_PAGE_URL
		);
	}

	@PutMapping("/person/{id}")
	public void updatePerson(@PathVariable int id, PersonEditModel personEditModel, HttpServletResponse response) {
		peopleService.updatePerson(id, personEditModel);
		response.setHeader(HTMXConsts.HX_TRIGGER, """
			{"%s": {"id": %d}}\
			""".formatted(EvtBackendEvents.PERSON_UPDATED, id));
	}

	// SPRING-HONO: evt-personpagerouting.tsx:evtEvents
	public static class EvtBackendEvents {
		public static  final String PERSON_UPDATED = "person-updated";
	}

}
