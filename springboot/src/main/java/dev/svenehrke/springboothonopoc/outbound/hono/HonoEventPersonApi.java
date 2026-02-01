package dev.svenehrke.springboothonopoc.outbound.hono;

import dev.svenehrke.springboothonopoc.core.*;
import dev.svenehrke.springboothonopoc.core.EvtHonoWebApiSharedConsts.EvtHonoWebApiConsts;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class HonoEventPersonApi {
	private final HonoAppClient honoAppClient;

	public HonoEventPersonApi(HonoAppClient honoAppClient) {
		this.honoAppClient = honoAppClient;
	}

	public ResponseEntity<String> peoplePage(OOBPersonPageModel vm) {
		return honoAppClient.post(EvtHonoWebApiConsts.PAGE, vm);
	}
	public ResponseEntity<String> personDetails(OOBPersonDetailModel vm) {
		return honoAppClient.post(EvtHonoWebApiConsts.PERSON_DETAILS, vm);
	}
}
