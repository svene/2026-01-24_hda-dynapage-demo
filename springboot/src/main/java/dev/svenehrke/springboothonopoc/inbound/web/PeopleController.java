package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.core.PersonEditModel;
import dev.svenehrke.springboothonopoc.core.PersonPageModel;
import dev.svenehrke.springboothonopoc.core.PeopleService;
import dev.svenehrke.springboothonopoc.core.SpringUrlsSharedConsts.SpringUrls;
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
public class PeopleController {

	private final PeopleService peopleService;
	private final HonoOOBPersonApi honoOOBPersonApi;

	public PeopleController(
		PeopleService peopleService,
		HonoOOBPersonApi honoOOBPersonApi
	) {
		this.peopleService = peopleService;
		this.honoOOBPersonApi = honoOOBPersonApi;
	}

	@GetMapping(SpringUrls.OOB_DEMO_PAGE)
	public ResponseEntity<String> peoplePage() {
		var vm = new PersonPageModel(peopleService.personTableModel(), SpringUrls.OOB_PERSON_TABLE);
		return honoOOBPersonApi.peoplePage(vm);
	}

	@GetMapping(SpringUrls.OOB_PERSON_TABLE)
	public ResponseEntity<String> peopleUrl(@RequestParam() String search) {
		return honoOOBPersonApi.peopleUrl(peopleService.peopleForSearch(search));
	}

	@GetMapping(RoutingUrls.EDIT.URL)
	public ResponseEntity<String> edit(@PathVariable int id) {
		return honoOOBPersonApi.personEdit(peopleService.personEditModel(id));
	}

	@GetMapping(RoutingUrls.EDIT_BACK.URL)
	public ResponseEntity<String> editback(@PathVariable int id) {
		return honoOOBPersonApi.personEditBack(peopleService.personDetailModel(id));
	}


	@GetMapping(RoutingUrls.DETAILS.URL)
	public ResponseEntity<String> details(@PathVariable int id) {
		return honoOOBPersonApi.personDetails(peopleService.personDetailModel(id));
	}

	@GetMapping(RoutingUrls.ROW.URL)
	public ResponseEntity<String> row(@PathVariable int id) {
		return honoOOBPersonApi.personRow(peopleService.personTableRowModel(id));
	}

	@GetMapping(RoutingUrls.DETAILS_BACK.URL)
	public ResponseEntity<String> detailsback(@PathVariable int id) {
		return honoOOBPersonApi.personDetailsBack(peopleService.personTableRowModel(id));
	}

	@DeleteMapping(RoutingUrls.DELETE)
	public ResponseEntity<String> deleteRows(@RequestParam List<Integer> selection, HttpServletResponse response) {
		peopleService.deleteByIds(selection);
		response.setHeader("HX-Redirect", SpringUrls.OOB_DEMO_PAGE);
		return peoplePage();
	}

	@PutMapping(RoutingUrls.PERSON.URL)
	public ResponseEntity<String> updatePerson(@PathVariable int id, PersonEditModel personEditModel, HttpServletResponse response) {
		response.setHeader("HX-Redirect", SpringUrls.OOB_DEMO_PAGE);
		peopleService.updatePerson(id, personEditModel);
		return peoplePage();
	}

}
