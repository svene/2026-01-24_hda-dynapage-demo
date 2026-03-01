package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.app.Evt;
import dev.svenehrke.springboothonopoc.core.*;
import dev.svenehrke.springboothonopoc.core.EvtHonoWebApiSharedConsts.EvtBackendEvents;
import dev.svenehrke.springboothonopoc.core.EvtHonoWebApiSharedConsts.EvtHonoWebApiConsts;
import dev.svenehrke.springboothonopoc.outbound.hono.HonoEventPersonApi;
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
public class EvtPeopleController {

	private final PeopleService peopleService;
	private final HonoEventPersonApi honoApi;

	public EvtPeopleController(
		@Evt PeopleService peopleService,
		HonoEventPersonApi honoApi
	) {
		this.peopleService = peopleService;
		this.honoApi = honoApi;
	}

	@GetMapping(EvtHonoWebApiConsts.PAGE)
	public ResponseEntity<String> peoplePage() {
		var vm = new OOBPersonPageModel(peopleService.personTableModel(), RouteBuilder.PERSON_TABLE_URL);
		return honoApi.peoplePage(vm);
	}
	@GetMapping(EvtHonoWebApiConsts.PERSON_TABLE)
	public ResponseEntity<String> peopleUrl(@RequestParam() String search) {
		OOBPersonTableModel vm = peopleService.peopleForSearch(search);
		return honoApi.personTable(vm);
	}

	@GetMapping(EvtHonoWebApiConsts.PERSON_DETAILS)
	public ResponseEntity<String> details(@PathVariable int id) {
		return honoApi.personDetails(peopleService.personDetailModel(id));
	}
	@GetMapping(EvtHonoWebApiConsts.PERSON_DETAILS_ROW)
	public ResponseEntity<String> detailsRow(@PathVariable int id) {
		return honoApi.personDetailsRow(peopleService.personDetailModel(id));
	}

	@GetMapping(EvtHonoWebApiConsts.PERSON_DETAILS_CARD)
	public ResponseEntity<String> detailsCard(@PathVariable int id) {
		return honoApi.personDetailsCard(peopleService.personDetailModel(id));
	}

	@GetMapping(EvtHonoWebApiConsts.PERSON_EDIT)
	public ResponseEntity<String> edit(@PathVariable int id) {
		OOBPersonEditModel vm = peopleService.personEditModel(id);
		return honoApi.personEdit(vm);
	}
	@GetMapping(EvtHonoWebApiConsts.PERSON_ROW)
	public ResponseEntity<String> row(@PathVariable int id) {
		return honoApi.personRow(peopleService.personTableRowModel(id));
	}

	@DeleteMapping(EvtHonoWebApiSharedConsts.BASE + RouteBuilder.DELETE_URL)
	public ResponseEntity<String> deleteRows(@RequestParam List<Integer> selection, HttpServletResponse response) {
		peopleService.deleteByIds(selection);
		response.setHeader("HX-Redirect", RouteBuilder.PAGE_URL);
		return peoplePage();
	}

	@PutMapping(EvtHonoWebApiSharedConsts.BASE + RouteBuilder.PERSON_URL)
	public void updatePerson(@PathVariable int id, OOBPersonEditModel personEditModel, HttpServletResponse response) {
		peopleService.updatePerson(id, personEditModel);
		response.setHeader(HTMXConsts.HX_TRIGGER, """
			{"%s": {"id": %d}}\
			""".formatted(EvtBackendEvents.PERSON_UPDATED, id));
	}

}
