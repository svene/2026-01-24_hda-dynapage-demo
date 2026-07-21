package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.app.Evt;
import dev.svenehrke.springboothonopoc.core.PeopleService;
import dev.svenehrke.springboothonopoc.core.PersonEditModel;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * General Forwarding Pattern (Spring -> Hono):
 * - Step 1: Gather data from DB or services
 * - Step 2: Forward HTTP request to HONO
 */
@Controller
@RequestMapping(JTSEvtHtmlPerson.URLs.EvtHtml_BASE_URL)
public class EvtHtmlPeopleActionController {

	private final PeopleService peopleService;

	public EvtHtmlPeopleActionController(@Evt PeopleService peopleService) {
		this.peopleService = peopleService;
	}

	@DeleteMapping("/delete")
	public void deleteRows(@RequestParam List<Integer> selection, HttpServletResponse response) {
		peopleService.deleteByIds(selection);
		response.setHeader(
			HTMXConsts.HX_REDIRECT, JTSEvtHtmlPerson.URLs.EvtHtml_PAGE_URL
		);
	}

	@PutMapping("/person/{id}")
	public void updatePerson(@PathVariable int id, PersonEditModel personEditModel, HttpServletResponse response) {
		peopleService.updatePerson(id, personEditModel);
		response.setHeader(HTMXConsts.HX_TRIGGER, """
			{"%s": {"id": %d}}\
			""".formatted(JTSEvtHtmlPersonEventName.PERSON_UPDATED.name(), id));
	}

}
