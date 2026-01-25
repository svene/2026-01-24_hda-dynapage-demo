package dev.svenehrke.springboothonopoc.inbound.web;

import dev.svenehrke.springboothonopoc.core.SpringUrlsSharedConsts;
import dev.svenehrke.springboothonopoc.outbound.hono.HonoAppClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Collections;

/**
 * General Forwarding Pattern (Spring -> Hono):
 * - Step 1: Gather data from DB or services
 * - Step 2: Forward HTTP request to HONO
 */
@Controller
public class InfoPageController {

	private final HonoAppClient honoAppClient;

	public InfoPageController(
		HonoAppClient honoAppClient
	) {
		this.honoAppClient = honoAppClient;
	}

	@GetMapping(SpringUrlsSharedConsts.INFO_PAGE)
	public ResponseEntity<String> people() {
		return honoAppClient.get(SpringUrlsSharedConsts.INFO_PAGE, Collections.emptyMap());
	}

}
