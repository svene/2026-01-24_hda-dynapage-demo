package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.app.Evt;
import dev.svenehrke.springboothonopoc.core.*;
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
@RequestMapping(JTSEvtPerson.URLs.EVT_BASE_URL)
public class EvtPeopleUIController {

	private final PeopleService peopleService;
	private final HonoAppClient honoAppClient;

	public EvtPeopleUIController(
		@Evt PeopleService peopleService,
		HonoAppClient honoAppClient
	) {
		this.peopleService = peopleService;
		this.honoAppClient = honoAppClient;
	}

	@GetMapping("/route/{name}") // SPRING-HONO
	public ResponseEntity<String> route(@PathVariable String name, @RequestParam(name = "id", required = false) Integer id, HttpServletRequest request) {
		JTSEvtPersonRouteName routeName;
		try {
			routeName = JTSEvtPersonRouteName.valueOf(name);
		} catch (IllegalArgumentException e) {
			return honoAppClient.route(OOBPersonRow.name(), null); // TODO: return 404-response
		}
		Object vm = switch (routeName) {
			case EvtPersonPage -> new PersonPageModel(peopleService.personTableModel());
			case EvtPersonDetailsCard, EvtPersonDetails, EvtPersonDetailsRow -> peopleService.personDetailModel(id);
			case EvtPersonTable -> peopleService.peopleForSearch(request.getParameter("search"));
			case EvtPersonRow -> peopleService.personTableRowModel(id);
			case EvtPersonEditor -> peopleService.personEditModel(id);

		};
		return honoAppClient.route(name, vm);
	}

}
