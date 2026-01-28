package dev.svenehrke.springboothonopoc.outbound.hono;

import dev.svenehrke.springboothonopoc.core.*;
import dev.svenehrke.springboothonopoc.core.EvtSpringSharedConsts.EvtSpringConsts;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class HonoEventPersonApi {
	private final HonoAppClient honoAppClient;

	public HonoEventPersonApi(HonoAppClient honoAppClient) {
		this.honoAppClient = honoAppClient;
	}

	public ResponseEntity<String> peoplePage(OOBPersonPageModel vm) {
		return honoAppClient.post(EvtSpringConsts.PAGE, vm);
	}
}
