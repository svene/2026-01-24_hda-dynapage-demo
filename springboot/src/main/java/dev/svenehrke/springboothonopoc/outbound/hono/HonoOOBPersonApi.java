package dev.svenehrke.springboothonopoc.outbound.hono;

import dev.svenehrke.springboothonopoc.core.HonoSharedConsts.HonoOOBUrls;
import dev.svenehrke.springboothonopoc.core.PersonDetailModel;
import dev.svenehrke.springboothonopoc.core.PersonEditModel;
import dev.svenehrke.springboothonopoc.core.PersonPageModel;
import dev.svenehrke.springboothonopoc.core.PersonTableModel;
import dev.svenehrke.springboothonopoc.core.PersonTableRowModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class HonoOOBPersonApi {
	private final HonoAppClient honoAppClient;

	public HonoOOBPersonApi(HonoAppClient honoAppClient) {
		this.honoAppClient = honoAppClient;
	}

	public ResponseEntity<String> peoplePage(PersonPageModel vm) {
		return honoAppClient.post(HonoOOBUrls.OOB_DEMO_PAGE, vm);
	}
	public ResponseEntity<String> peopleUrl(PersonTableModel vm) {
		return honoAppClient.post(HonoOOBUrls.PERSON_TABLE, vm);
	}
	public ResponseEntity<String> personEdit(PersonEditModel vm) {
		return honoAppClient.post(HonoOOBUrls.PERSON_EDIT, vm);
	}
	public ResponseEntity<String> personEditBack(PersonDetailModel vm) {
		return honoAppClient.post(HonoOOBUrls.PERSON_EDIT_BACK, vm);
	}
	public ResponseEntity<String> personDetails(PersonDetailModel vm) {
		return honoAppClient.post(HonoOOBUrls.PERSON_DETAILS, vm);
	}
	public ResponseEntity<String> personRow(PersonTableRowModel vm) {
		return honoAppClient.post(HonoOOBUrls.PERSON_ROW, vm);
	}
	public ResponseEntity<String> personDetailsBack(PersonTableRowModel vm) {
		return honoAppClient.post(HonoOOBUrls.PERSON_DETAILS_BACK, vm);
	}
}
