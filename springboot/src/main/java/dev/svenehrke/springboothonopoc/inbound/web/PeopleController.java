package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.app.Oob;
import dev.svenehrke.springboothonopoc.core.OOBPersonEditModel;
import dev.svenehrke.springboothonopoc.core.OOBPersonPageModel;
import dev.svenehrke.springboothonopoc.core.OOBRouteBuilder;
import dev.svenehrke.springboothonopoc.core.PeopleService;
import dev.svenehrke.springboothonopoc.core.RouteBuilder;
import dev.svenehrke.springboothonopoc.outbound.hono.HonoOOBPersonApi;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static dev.svenehrke.springboothonopoc.core.RouteBuilder.PAGE_URL;

/**
 * General Forwarding Pattern (Spring -> Hono):
 * - Step 1: Gather data from DB or services
 * - Step 2: Forward HTTP request to HONO
 */
@Controller
@RequestMapping(OOBRouteBuilder.BASE)
public class PeopleController {

	private final PeopleService peopleService;
	private final HonoOOBPersonApi honoApi;

	public PeopleController(
		@Oob PeopleService peopleService,
		HonoOOBPersonApi honoApi
	) {
		this.peopleService = peopleService;
		this.honoApi = honoApi;
	}

	@GetMapping(PAGE_URL)
	public ResponseEntity<String> peoplePage() {
		var vm = new OOBPersonPageModel(peopleService.personTableModel(), RouteBuilder.PERSON_TABLE_URL);
		return honoApi.peoplePage(vm);
	}

	@GetMapping(RouteBuilder.PERSON_TABLE_URL)
	public ResponseEntity<String> peopleUrl(@RequestParam() String search) {
		return honoApi.peopleUrl(peopleService.peopleForSearch(search));
	}

	@GetMapping(RouteBuilder.EDIT_URL)
	public ResponseEntity<String> edit(@PathVariable int id) {
		OOBPersonEditModel vm = peopleService.personEditModel(id);
		return honoApi.personEdit(vm);
	}

	@GetMapping(RouteBuilder.EDIT_BACK_URL)
	public ResponseEntity<String> editback(@PathVariable int id) {
		return honoApi.personEditBack(peopleService.personDetailModel(id));
	}


	@GetMapping(RouteBuilder.DETAILS_URL)
	public ResponseEntity<String> details(@PathVariable int id) {
		return honoApi.personDetails(peopleService.personDetailModel(id));
	}
	@GetMapping(RouteBuilder.DETAILS_BACK_URL)
	public ResponseEntity<String> detailsBack(@PathVariable int id) {
		return honoApi.personDetailsBack(peopleService.personTableRowModel(id));
	}


	@GetMapping(RouteBuilder.ROW_URL)
	public ResponseEntity<String> row(@PathVariable int id) {
		return honoApi.personRow(peopleService.personTableRowModel(id));
	}

	@DeleteMapping(RouteBuilder.DELETE_URL)
	public ResponseEntity<String> deleteRows(@RequestParam List<Integer> selection, HttpServletResponse response) {
		peopleService.deleteByIds(selection);
		response.setHeader("HX-Redirect", PAGE_URL);
		return peoplePage();
	}

	@PutMapping(RouteBuilder.PERSON_URL)
	public ResponseEntity<String> updatePerson(@PathVariable int id, OOBPersonEditModel personEditModel, HttpServletResponse response) {
		response.setHeader("HX-Redirect", OOBRouteBuilder.BASE + PAGE_URL);
		peopleService.updatePerson(id, personEditModel);
		return peoplePage();
	}

}
