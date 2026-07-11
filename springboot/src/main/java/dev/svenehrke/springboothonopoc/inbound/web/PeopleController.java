package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.app.Oob;
import dev.svenehrke.springboothonopoc.core.*;
import dev.svenehrke.springboothonopoc.core.HonoWebApiSharedConsts.HonoWebApiConsts;
import dev.svenehrke.springboothonopoc.core.OobHonoWebApiSharedConsts.OOBHonoWebApiConsts;
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
	public ResponseEntity<String> peoplePage() {
		var vm = new PersonPageModel(peopleService.personTableModel());
		return honoAppClient.route("OOBPersonPage", vm);
	}

	@GetMapping(HonoWebApiConsts.PERSON_TABLE)
	public ResponseEntity<String> peopleUrl(@RequestParam() String search) {
		return honoAppClient.route("OOBPersonTable", peopleService.peopleForSearch(search));
	}

	@GetMapping(HonoWebApiConsts.PERSON_DETAILS)
	public ResponseEntity<String> details(@PathVariable int id) {
		return honoAppClient.route("OOBPersonDetails", peopleService.personDetailModel(id));
	}
	@GetMapping(HonoWebApiConsts.PERSON_DETAILS_BACK)
	public ResponseEntity<String> detailsBack(@PathVariable int id) {
		return honoAppClient.route("OOBPersonDetailsBack", peopleService.personTableRowModel(id));
	}

	@GetMapping(HonoWebApiConsts.PERSON_EDIT)
	public ResponseEntity<String> edit(@PathVariable int id) {
		return honoAppClient.route("OOBPersonEditor", peopleService.personEditModel(id));
	}

	@GetMapping(HonoWebApiConsts.PERSON_DETAILS_CARD)
	public ResponseEntity<String> detailsCard(@PathVariable int id) {
		return honoAppClient.route("OOBPersondetailsCard", peopleService.personDetailModel(id));
	}

	@GetMapping(HonoWebApiConsts.PERSON_ROW)
	public ResponseEntity<String> row(@PathVariable int id) {
		return honoAppClient.route("OOBPersonRow", peopleService.personTableRowModel(id));
	}

	@DeleteMapping(HonoWebApiConsts.DELETE)
	public ResponseEntity<String> deleteRows(@RequestParam List<Integer> selection) {
		peopleService.deleteByIds(selection);
		return honoAppClient.route("OOBPersonTable", peopleService.peopleForSearch(""));
	}

	@PutMapping(HonoWebApiConsts.PERSON)
	public void updatePerson(
		@PathVariable int id,
		PersonEditModel personEditModel,
		HttpServletResponse response
	) {
		peopleService.updatePerson(id, personEditModel);
		response.setHeader(HX_REDIRECT, OOBHonoWebApiConsts.BASE + HonoWebApiConsts.PAGE);
	}

}
