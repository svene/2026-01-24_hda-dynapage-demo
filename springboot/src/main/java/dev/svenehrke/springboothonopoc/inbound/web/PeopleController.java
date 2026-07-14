package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.app.Oob;
import dev.svenehrke.springboothonopoc.core.*;
import dev.svenehrke.springboothonopoc.outbound.hono.HonoAppClient;
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
@RequestMapping(PeopleController.OOB_PEOPLE_URL)
public class PeopleController {

	public static final String OOB_PEOPLE_URL = "/demo/oob";
	public static final String OOB_PEOPLE_PAGE_URL = "/page";

	private final PeopleService peopleService;
	private final HonoAppClient honoAppClient;

	public PeopleController(
		@Oob PeopleService peopleService,
		HonoAppClient honoAppClient

	) {
		this.peopleService = peopleService;
		this.honoAppClient = honoAppClient;
	}

	@GetMapping(PeopleController.OOB_PEOPLE_PAGE_URL)
	public ResponseEntity<String> peoplePage() {
		var vm = new PersonPageModel(peopleService.personTableModel());
		return honoAppClient.route("OOBPersonPage", vm);
	}

	@GetMapping("/persontable")
	public ResponseEntity<String> peopleUrl(@RequestParam() String search) {
		return honoAppClient.route("OOBPersonTable", peopleService.peopleForSearch(search));
	}

	@GetMapping("/person/{id}/details")
	public ResponseEntity<String> details(@PathVariable int id) {
		return honoAppClient.route("OOBPersonDetails", peopleService.personDetailModel(id));
	}
	@GetMapping("/person/{id}/detailsback")
	public ResponseEntity<String> detailsBack(@PathVariable int id) {
		return honoAppClient.route("OOBPersonDetailsBack", peopleService.personTableRowModel(id));
	}

	@GetMapping("/person/{id}/edit")
	public ResponseEntity<String> edit(@PathVariable int id) {
		return honoAppClient.route("OOBPersonEditor", peopleService.personEditModel(id));
	}

	@GetMapping("/person/{id}/detailscard")
	public ResponseEntity<String> detailsCard(@PathVariable int id) {
		return honoAppClient.route("OOBPersondetailsCard", peopleService.personDetailModel(id));
	}

	@GetMapping("/person/{id}/row")
	public ResponseEntity<String> row(@PathVariable int id) {
		return honoAppClient.route("OOBPersonRow", peopleService.personTableRowModel(id));
	}

	@DeleteMapping("/delete")
	public ResponseEntity<String> deleteRows(@RequestParam List<Integer> selection) {
		peopleService.deleteByIds(selection);
		return honoAppClient.route("OOBPersonTable", peopleService.peopleForSearch(""));
	}

	@PutMapping("/person/{id}")
	public void updatePerson(
		@PathVariable int id,
		PersonEditModel personEditModel,
		HttpServletResponse response
	) {
		peopleService.updatePerson(id, personEditModel);
		response.setHeader(HX_REDIRECT, PeopleController.OOB_PEOPLE_URL);
	}

}
