package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.app.Evt;
import dev.svenehrke.springboothonopoc.app.EvtConfig;
import dev.svenehrke.springboothonopoc.core.*;
import dev.svenehrke.springboothonopoc.core.EvtHonoWebApiSharedConsts.EvtBackendEvents;
import dev.svenehrke.springboothonopoc.core.OobHonoWebApiSharedConsts.OOBHonoWebApiConsts;
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

	@GetMapping(EvtConfig.EVT_BASE_URL + RouteBuilder.PAGE_URL)
	public ResponseEntity<String> peoplePage() {
		var vm = new OOBPersonPageModel(peopleService.personTableModel(), routeBuilder.url(RouteBuilder.PERSON_TABLE_URL));
		return honoApi.peoplePage(vm);
	}
	@GetMapping(EvtConfig.EVT_BASE_URL + RouteBuilder.PERSON_TABLE_URL)
	public ResponseEntity<String> peopleUrl(@RequestParam() String search) {
		OOBPersonTableModel vm = peopleService.peopleForSearch(search);
		return honoApi.personTable(vm);
	}

	@GetMapping(EvtConfig.EVT_BASE_URL + OOBHonoWebApiConsts.PERSON_DETAILS)
	public ResponseEntity<String> details(@PathVariable int id) {
		return honoApi.personDetails(peopleService.personDetailModel(id));
	}
	@GetMapping(EvtConfig.EVT_BASE_URL + RouteBuilder.DETAILS_ROW_URL)
	public ResponseEntity<String> detailsRow(@PathVariable int id) {
		return honoApi.personDetailsRow(peopleService.personDetailModel(id));
	}

	@GetMapping(EvtConfig.EVT_BASE_URL + RouteBuilder.DETAILS_CARD_URL)
	public ResponseEntity<String> detailsCard(@PathVariable int id) {
		return honoApi.personDetailsCard(peopleService.personDetailModel(id));
	}

	@GetMapping(EvtConfig.EVT_BASE_URL + RouteBuilder.EDIT_URL)
	public ResponseEntity<String> edit(@PathVariable int id) {
		OOBPersonEditModel vm = peopleService.personEditModel(id);
		return honoApi.personEdit(vm);
	}
	@GetMapping(EvtConfig.EVT_BASE_URL + RouteBuilder.ROW_URL)
	public ResponseEntity<String> row(@PathVariable int id) {
		return honoApi.personRow(peopleService.personTableRowModel(id));
	}

	@DeleteMapping(EvtConfig.EVT_BASE_URL + RouteBuilder.DELETE_URL)
	public ResponseEntity<String> deleteRows(@RequestParam List<Integer> selection, HttpServletResponse response) {
		peopleService.deleteByIds(selection);
		response.setHeader("HX-Redirect", routeBuilder.url(RouteBuilder.PAGE_URL));
		return peoplePage();
	}

	@PutMapping(EvtConfig.EVT_BASE_URL + RouteBuilder.PERSON_URL)
	public void updatePerson(@PathVariable int id, OOBPersonEditModel personEditModel, HttpServletResponse response) {
		peopleService.updatePerson(id, personEditModel);
		response.setHeader(HTMXConsts.HX_TRIGGER, """
			{"%s": {"id": %d}}\
			""".formatted(EvtBackendEvents.PERSON_UPDATED, id));
	}

}
