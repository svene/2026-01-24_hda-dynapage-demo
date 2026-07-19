package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.app.Evt;
import dev.svenehrke.springboothonopoc.core.PeopleService;
import dev.svenehrke.springboothonopoc.core.PersonPageModel;
import dev.svenehrke.springboothonopoc.outbound.hono.HonoAppClient;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import static dev.svenehrke.springboothonopoc.inbound.web.JTSOobPersonRouteName.OOBPersonRow;

/**
 * General Forwarding Pattern (Spring -> Hono):
 * - Step 1: Gather data from DB or services
 * - Step 2: Forward HTTP request to HONO
 */
@Controller
@RequestMapping(JTSEvtHtmlPerson.URLs.EvtHtml_BASE_URL)
public class EvtHtmlPeopleUIController {

	private final PeopleService peopleService;
	private final HonoAppClient honoAppClient;

	public EvtHtmlPeopleUIController(
		@Evt PeopleService peopleService,
		HonoAppClient honoAppClient
	) {
		this.peopleService = peopleService;
		this.honoAppClient = honoAppClient;
	}

	@GetMapping("/component/{name}") // SPRING-HONO
	public ResponseEntity<String> component(@PathVariable String name, @RequestParam(name = "id", required = false) Integer id, HttpServletRequest request) {
		JTSEvtHtmlPersonRouteName routeName;
		try {
			routeName = JTSEvtHtmlPersonRouteName.valueOf(name);
		} catch (IllegalArgumentException e) {
			return honoAppClient.route(OOBPersonRow.name(), null); // TODO: return 404-response
		}
		Object vm = switch (routeName) {
			case EvtHtmlPersonPage -> new PersonPageModel(peopleService.personTableModel());
			case EvtHtmlPersonDetailsCard, EvtHtmlPersonDetails, EvtHtmlPersonDetailsRow -> peopleService.personDetailModel(id);
			case EvtHtmlPersonTable -> peopleService.peopleForSearch(request.getParameter("search"));
			case EvtHtmlPersonRow -> peopleService.personTableRowModel(id);
			case EvtHtmlPersonEditor -> peopleService.personEditModel(id);

		};
		return honoAppClient.route(name, vm);
	}

}
