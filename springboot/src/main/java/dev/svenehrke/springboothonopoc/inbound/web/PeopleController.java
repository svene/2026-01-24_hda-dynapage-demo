package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.core.PersonEditModel;
import dev.svenehrke.springboothonopoc.core.PersonPageModel;
import dev.svenehrke.springboothonopoc.core.PeopleService;
import dev.svenehrke.springboothonopoc.outbound.hono.HonoOOBPersonApi;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

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

	@GetMapping(RoutingUrls.DEMO_OOB_PAGE)
	public ResponseEntity<String> peoplePage() {
		var vm = new PersonPageModel(peopleService.personTableModel());
		return honoOOBPersonApi.peoplePage(vm);
	}

	@GetMapping(RoutingUrls.PERSON_TABLE)
	public ResponseEntity<String> peopleUrl(@RequestParam() String search) {
		return honoOOBPersonApi.peopleUrl(peopleService.peopleForSearch(search));
	}

	@GetMapping("/person/{id}/edit")
	public ResponseEntity<String> edit(@PathVariable int id) {
		return honoOOBPersonApi.personEdit(peopleService.personTableRowModel(id));
	}
	@GetMapping("/person/{id}/editback")
	public ResponseEntity<String> editback(@PathVariable int id) {
		return honoOOBPersonApi.personEditBack(peopleService.personTableDetailModel(id));
	}


	@GetMapping("/person/{id}/details")
	public ResponseEntity<String> details(@PathVariable int id) {
		return honoOOBPersonApi.personDetails(peopleService.personTableDetailModel(id));
	}

	@GetMapping("/person/{id}/row")
	public ResponseEntity<String> row(@PathVariable int id) {
		return honoOOBPersonApi.personRow(peopleService.personTableRowModel(id));
	}

	@GetMapping(RoutingUrls.DETAILS_BACK.URL)
	public ResponseEntity<String> detailsback(@PathVariable int id) {
		return honoOOBPersonApi.personDetailsBack(peopleService.personTableRowModel(id));
	}

	@DeleteMapping("/person/delete")
	public ResponseEntity<String> deleteRows(@RequestParam List<Integer> selection, HttpServletResponse response) {
		peopleService.deleteByIds(selection);
		response.setHeader("HX-Redirect", RoutingUrls.DEMO_OOB_PAGE);
		return peoplePage();
	}

	@PutMapping("/person/{id}")
	public ResponseEntity<String> updatePerson(@PathVariable int id, PersonEditModel personEditModel, HttpServletResponse response) {
		response.setHeader("HX-Redirect", RoutingUrls.DEMO_OOB_PAGE);
		peopleService.updatePerson(id, personEditModel);
		return peoplePage();
	}

}
