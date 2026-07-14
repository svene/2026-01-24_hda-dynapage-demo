package dev.svenehrke.springboothonopoc.inbound.web;

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

	@GetMapping("/info")
	public ResponseEntity<String> people() {
		return honoAppClient.route("InfoPage", Collections.emptyMap());
	}

}
