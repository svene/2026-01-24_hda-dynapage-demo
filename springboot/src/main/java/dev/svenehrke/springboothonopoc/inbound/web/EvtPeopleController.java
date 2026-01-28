package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.core.EvtSpringSharedConsts.EvtSpringConsts;
import dev.svenehrke.springboothonopoc.core.OOBPersonPageModel;
import dev.svenehrke.springboothonopoc.core.PeopleService;
import dev.svenehrke.springboothonopoc.outbound.hono.HonoEventPersonApi;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * General Forwarding Pattern (Spring -> Hono):
 * - Step 1: Gather data from DB or services
 * - Step 2: Forward HTTP request to HONO
 */
@Controller
public class EvtPeopleController {

	private final PeopleService peopleService;
	private final HonoEventPersonApi honoApi;

	public EvtPeopleController(
		PeopleService peopleService,
		HonoEventPersonApi honoApi
	) {
		this.peopleService = peopleService;
		this.honoApi = honoApi;
	}

	@GetMapping(EvtSpringConsts.PAGE)
	public ResponseEntity<String> peoplePage() {
		var vm = new OOBPersonPageModel(peopleService.personTableModel(), EvtSpringConsts.PERSON_TABLE);
		return honoApi.peoplePage(vm);
	}


}
