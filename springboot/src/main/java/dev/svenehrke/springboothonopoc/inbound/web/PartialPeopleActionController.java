package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.app.Partial;
import dev.svenehrke.springboothonopoc.core.*;
import dev.svenehrke.springboothonopoc.outbound.hono.HonoAppClient;
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
@RequestMapping(JTSPartialPerson.URLs.PARTIAL_BASE_URL)
public class PartialPeopleActionController {

	private final PeopleService peopleService;
	private final HonoAppClient honoAppClient;

	public PartialPeopleActionController(
		@Partial PeopleService peopleService,
		HonoAppClient honoAppClient

	) {
		this.peopleService = peopleService;
		this.honoAppClient = honoAppClient;
	}

	@DeleteMapping("/delete")
	public ResponseEntity<String> deleteRows(@RequestParam List<Integer> selection) {
		peopleService.deleteByIds(selection);
		return honoAppClient.uiroute(JTSPartialPersonRouteName.PartialPersonTable.name(), peopleService.peopleForSearch(""));
	}

	@PutMapping("/person/{id}") // SPRING-HONO
	public ResponseEntity<String> updatePerson(
		@PathVariable int id,
		PersonEditModel personEditModel
	) {
		peopleService.updatePerson(id, personEditModel);
		return honoAppClient.uiroute(
			JTSPartialPersonRouteName.PartialPersonSaved.name(),
			peopleService.personDetailModel(id)
		);
	}

}
