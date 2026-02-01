package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.app.Oob;
import dev.svenehrke.springboothonopoc.core.OOBPersonEditModel;
import dev.svenehrke.springboothonopoc.core.OOBPersonPageModel;
import dev.svenehrke.springboothonopoc.core.PeopleService;
import dev.svenehrke.springboothonopoc.outbound.hono.HonoOOBPersonApi;
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
@RequestMapping(PeopleController.BASE)
public class PeopleController {

	private final PeopleService peopleService;
	private final HonoOOBPersonApi honoApi;

	public static final String BASE = "/demo/oob";

	public PeopleController(
		@Oob PeopleService peopleService,
		HonoOOBPersonApi honoApi
	) {
		this.peopleService = peopleService;
		this.honoApi = honoApi;
	}

	@GetMapping(RoutingUrls.PAGE)
	public ResponseEntity<String> peoplePage() {
		var vm = new OOBPersonPageModel(peopleService.personTableModel(), RoutingUrls.PERSON_TABLE);
		return honoApi.peoplePage(vm);
	}

	@GetMapping(RoutingUrls.PERSON_TABLE)
	public ResponseEntity<String> peopleUrl(@RequestParam() String search) {
		return honoApi.peopleUrl(peopleService.peopleForSearch(search));
	}

	@GetMapping(RoutingUrls.EDIT.URL)
	public ResponseEntity<String> edit(@PathVariable int id) {
		return honoApi.personEdit(peopleService.personEditModel(id));
	}

	@GetMapping(RoutingUrls.EDIT_BACK.URL)
	public ResponseEntity<String> editback(@PathVariable int id) {
		return honoApi.personEditBack(peopleService.personDetailModel(id));
	}


	@GetMapping(RoutingUrls.DETAILS.URL)
	public ResponseEntity<String> details(@PathVariable int id) {
		return honoApi.personDetails(peopleService.personDetailModel(id));
	}

	@GetMapping(RoutingUrls.ROW.URL)
	public ResponseEntity<String> row(@PathVariable int id) {
		return honoApi.personRow(peopleService.personTableRowModel(id));
	}

	@GetMapping(RoutingUrls.DETAILS_BACK.URL)
	public ResponseEntity<String> detailsback(@PathVariable int id) {
		return honoApi.personDetailsBack(peopleService.personTableRowModel(id));
	}

	@DeleteMapping(RoutingUrls.DELETE)
	public ResponseEntity<String> deleteRows(@RequestParam List<Integer> selection, HttpServletResponse response) {
		peopleService.deleteByIds(selection);
		response.setHeader("HX-Redirect", RoutingUrls.PAGE);
		return peoplePage();
	}

	@PutMapping(RoutingUrls.PERSON.URL)
	public ResponseEntity<String> updatePerson(@PathVariable int id, OOBPersonEditModel personEditModel, HttpServletResponse response) {
		response.setHeader("HX-Redirect", RoutingUrls.PAGE);
		peopleService.updatePerson(id, personEditModel);
		return peoplePage();
	}

}
