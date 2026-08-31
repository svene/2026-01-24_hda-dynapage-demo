package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.app.Partial;
import dev.svenehrke.springboothonopoc.core.PeopleService;
import dev.svenehrke.springboothonopoc.core.PersonPageModel;
import dev.svenehrke.springboothonopoc.outbound.hono.HonoAppClient;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import static dev.svenehrke.springboothonopoc.inbound.web.JTSPartialPersonRouteName.PartialPersonRow;

/**
 * General Forwarding Pattern (Spring -> Hono):
 * - Step 1: Gather data from DB or services
 * - Step 2: Forward HTTP request to HONO
 */
@Controller
@RequestMapping(JTSPartialPerson.URLs.PARTIAL_BASE_URL)
public class PartialPeopleUIController {

	private final PeopleService peopleService;
	private final HonoAppClient honoAppClient;

	public PartialPeopleUIController(
		@Partial PeopleService peopleService,
		HonoAppClient honoAppClient

	) {
		this.peopleService = peopleService;
		this.honoAppClient = honoAppClient;
	}

	@GetMapping("/uiroute/{name}") // SPRING-HONO
	public ResponseEntity<String> uiroute(@PathVariable String name, @RequestParam(name = "id", required = false) Integer id, HttpServletRequest request) {
		JTSPartialPersonRouteName routeName;
		try {
			routeName = JTSPartialPersonRouteName.valueOf(name);
		} catch (IllegalArgumentException e) {
			return honoAppClient.uiroute(PartialPersonRow.name(), null); // TODO: return 404-response
		}
		Object vm = switch (routeName) {
			case PartialPersonPage -> new PersonPageModel(peopleService.personTableModel());
			case PartialPersonDetails, PartialPersonDetailsCard, PartialPersonSaved -> peopleService.personDetailModel(id);
			case PartialPersonTable -> peopleService.peopleForSearch(request.getParameter("search"));
			case PartialPersonRow, PartialPersonDetailsBack -> peopleService.personTableRowModel(id);
			case PartialPersonEditor -> peopleService.personEditModel(id);
		};
		return honoAppClient.uiroute(name, vm);
	}

}
