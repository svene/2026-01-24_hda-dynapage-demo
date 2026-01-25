package dev.svenehrke.springboothonopoc.outbound.hono;

import dev.svenehrke.springboothonopoc.core.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class HonoEventPersonApi {
	private final HonoAppClient honoAppClient;

	public HonoEventPersonApi(HonoAppClient honoAppClient) {
		this.honoAppClient = honoAppClient;
	}

	public ResponseEntity<String> peoplePage(PersonPageModel vm) {
		return honoAppClient.post(HonoUrlsSharedConsts.HonoEventUrls.PAGE, vm);
	}
}
