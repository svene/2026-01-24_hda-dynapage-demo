package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.app.Evt;
import dev.svenehrke.springboothonopoc.core.*;
import dev.svenehrke.springboothonopoc.core.EvtHonoWebApiSharedConsts.EvtBackendEvents;
import dev.svenehrke.springboothonopoc.core.EvtHonoWebApiSharedConsts.EvtHonoWebApiConsts;
import dev.svenehrke.springboothonopoc.core.HonoWebApiSharedConsts.HonoWebApiConsts;
import dev.svenehrke.springboothonopoc.outbound.hono.HonoAppClient;
import jakarta.servlet.http.HttpServletRequest;
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
@RequestMapping(EvtHonoWebApiConsts.BASE)
public class EvtPeopleController {

	private final PeopleService peopleService;
	private final HonoAppClient honoAppClient;

	public EvtPeopleController(
		@Evt PeopleService peopleService,
		HonoAppClient honoAppClient
	) {
		this.peopleService = peopleService;
		this.honoAppClient = honoAppClient;
	}

	@GetMapping(HonoWebApiConsts.PAGE)
	public ResponseEntity<String> peoplePage(HttpServletRequest request) {
		var vm = new OOBPersonPageModel(peopleService.personTableModel());
		return honoAppClient.post(request.getRequestURI(), vm);
	}
	@GetMapping(HonoWebApiConsts.PERSON_TABLE)
	public ResponseEntity<String> peopleUrl(@RequestParam() String search, HttpServletRequest request) {
		OOBPersonTableModel vm = peopleService.peopleForSearch(search);
		return honoAppClient.post(request.getRequestURI(), vm);
	}

	@GetMapping(HonoWebApiConsts.PERSON_DETAILS)
	public ResponseEntity<String> details(@PathVariable int id, HttpServletRequest request) {
		var vm = peopleService.personDetailModel(id);
		return honoAppClient.post(request.getRequestURI(), vm);
	}
	@GetMapping(HonoWebApiConsts.PERSON_DETAILS_ROW)
	public ResponseEntity<String> detailsRow(@PathVariable int id, HttpServletRequest request) {
		var vm = peopleService.personDetailModel(id);
		return honoAppClient.post(request.getRequestURI(), vm);
	}

	@GetMapping(HonoWebApiConsts.PERSON_DETAILS_CARD)
	public ResponseEntity<String> detailsCard(@PathVariable int id, HttpServletRequest request) {
		var vm = peopleService.personDetailModel(id);
		return honoAppClient.post(request.getRequestURI(), vm);
	}

	@GetMapping(HonoWebApiConsts.PERSON_EDIT)
	public ResponseEntity<String> edit(@PathVariable int id, HttpServletRequest request) {
		var vm = peopleService.personEditModel(id);
		return honoAppClient.post(request.getRequestURI(), vm);
	}
	@GetMapping(HonoWebApiConsts.PERSON_ROW)
	public ResponseEntity<String> row(@PathVariable int id, HttpServletRequest request) {
		var vm = peopleService.personTableRowModel(id);
		return honoAppClient.post(request.getRequestURI(), vm);
	}

	@DeleteMapping(HonoWebApiConsts.DELETE)
	public void deleteRows(@RequestParam List<Integer> selection, HttpServletResponse response) {
		peopleService.deleteByIds(selection);
		response.setHeader(HTMXConsts.HX_REDIRECT, EvtHonoWebApiConsts.BASE + HonoWebApiConsts.PAGE);
	}

	@PutMapping(HonoWebApiConsts.PERSON)
	public void updatePerson(@PathVariable int id, OOBPersonEditModel personEditModel, HttpServletResponse response) {
		peopleService.updatePerson(id, personEditModel);
		response.setHeader(HTMXConsts.HX_TRIGGER, """
			{"%s": {"id": %d}}\
			""".formatted(EvtBackendEvents.PERSON_UPDATED, id));
	}

}
