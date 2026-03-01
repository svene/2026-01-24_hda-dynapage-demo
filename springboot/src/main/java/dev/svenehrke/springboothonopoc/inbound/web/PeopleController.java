package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.app.Oob;
import dev.svenehrke.springboothonopoc.core.*;
import dev.svenehrke.springboothonopoc.core.HonoWebApiSharedConsts.HonoWebApiConsts;
import dev.svenehrke.springboothonopoc.core.OobHonoWebApiSharedConsts.OOBHonoWebApiConsts;
import dev.svenehrke.springboothonopoc.outbound.hono.HonoAppClient;
import jakarta.servlet.http.HttpServletRequest;
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
@RequestMapping(OOBHonoWebApiConsts.BASE)
public class PeopleController {

	private final PeopleService peopleService;
	private final HonoAppClient honoAppClient;

	public PeopleController(
		@Oob PeopleService peopleService,
		HonoAppClient honoAppClient

	) {
		this.peopleService = peopleService;
		this.honoAppClient = honoAppClient;
	}

	@GetMapping(HonoWebApiConsts.PAGE)
	public ResponseEntity<String> peoplePage(HttpServletRequest request) {
		var vm = new OOBPersonPageModel(peopleService.personTableModel(), RouteBuilder.url(RouteBuilder.PERSON_TABLE_URL));
		return honoAppClient.post(request.getRequestURI(), vm);
	}

	@GetMapping(HonoWebApiConsts.PERSON_TABLE)
	public ResponseEntity<String> peopleUrl(@RequestParam() String search, HttpServletRequest request) {
		return honoAppClient.post(request.getRequestURI(), peopleService.peopleForSearch(search));
	}

	@GetMapping(HonoWebApiConsts.PERSON_DETAILS)
	public ResponseEntity<String> details(@PathVariable int id, HttpServletRequest request) {
		return honoAppClient.post(request.getRequestURI(), peopleService.personDetailModel(id));
	}
	@GetMapping(HonoWebApiConsts.PERSON_DETAILS_BACK)
	public ResponseEntity<String> detailsBack(@PathVariable int id, HttpServletRequest request) {
		return honoAppClient.post(request.getRequestURI(), peopleService.personTableRowModel(id));
	}

	@GetMapping(HonoWebApiConsts.PERSON_EDIT)
	public ResponseEntity<String> edit(@PathVariable int id, HttpServletRequest request) {
		return honoAppClient.post(request.getRequestURI(), peopleService.personEditModel(id));
	}

	@GetMapping(HonoWebApiConsts.PERSON_DETAILS_CARD)
	public ResponseEntity<String> detailsCard(@PathVariable int id, HttpServletRequest request) {
		return honoAppClient.post(request.getRequestURI(), peopleService.personDetailModel(id));
	}

	@GetMapping(HonoWebApiConsts.PERSON_ROW)
	public ResponseEntity<String> row(@PathVariable int id, HttpServletRequest request) {
		return honoAppClient.post(request.getRequestURI(), peopleService.personTableRowModel(id));
	}

	@DeleteMapping(HonoWebApiConsts.DELETE)
	public ResponseEntity<String> deleteRows(@RequestParam List<Integer> selection) {
		peopleService.deleteByIds(selection);
		return honoAppClient.post(RouteBuilder.url(OOBHonoWebApiConsts.BASE + RouteBuilder.PERSON_TABLE_URL) , peopleService.peopleForSearch(""));
	}

	@PutMapping(HonoWebApiConsts.PERSON)
	public void updatePerson(
		@PathVariable int id,
		OOBPersonEditModel personEditModel,
		HttpServletResponse response
	) {
		peopleService.updatePerson(id, personEditModel);
		response.setHeader(HX_REDIRECT, OOBHonoWebApiConsts.BASE + HonoWebApiConsts.PAGE);
	}

}
