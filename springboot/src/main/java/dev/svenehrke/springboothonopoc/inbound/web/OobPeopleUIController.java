package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.app.Oob;
import dev.svenehrke.springboothonopoc.core.PeopleService;
import dev.svenehrke.springboothonopoc.core.PersonPageModel;
import dev.svenehrke.springboothonopoc.outbound.hono.HonoAppClient;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import static dev.svenehrke.springboothonopoc.inbound.web.JTSOobPersonRouteName.OOBPersonRow;

/**
 * General Forwarding Pattern (Spring -> Hono):
 * - Step 1: Gather data from DB or services
 * - Step 2: Forward HTTP request to HONO
 */
@Controller
@RequestMapping(JTSOobPerson.URLs.OOB_BASE_URL)
public class OobPeopleUIController {

	private final PeopleService peopleService;
	private final HonoAppClient honoAppClient;

	public OobPeopleUIController(
		@Oob PeopleService peopleService,
		HonoAppClient honoAppClient

	) {
		this.peopleService = peopleService;
		this.honoAppClient = honoAppClient;
	}

	@GetMapping("/uiroute/{name}") // SPRING-HONO
	public ResponseEntity<String> uiroute(@PathVariable String name, @RequestParam(name = "id", required = false) Integer id, HttpServletRequest request) {
		JTSOobPersonRouteName routeName;
		try {
			routeName = JTSOobPersonRouteName.valueOf(name);
		} catch (IllegalArgumentException e) {
			return honoAppClient.uiroute(OOBPersonRow.name(), null); // TODO: return 404-response
		}
		Object vm = switch (routeName) {
			case OOBPersonPage -> new PersonPageModel(peopleService.personTableModel());
			case OOBPersonDetails, OOBPersonDetailsCard, OOBPersonSaved -> peopleService.personDetailModel(id);
			case OOBPersonTable -> peopleService.peopleForSearch(request.getParameter("search"));
			case OOBPersonRow, OOBPersonDetailsBack -> peopleService.personTableRowModel(id);
			case OOBPersonEditor -> peopleService.personEditModel(id);
		};
		return honoAppClient.uiroute(name, vm);
	}

}
