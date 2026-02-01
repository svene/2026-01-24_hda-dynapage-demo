package dev.svenehrke.springboothonopoc.outbound.hono;

import dev.svenehrke.springboothonopoc.core.OobHonoWebApiSharedConsts.OOBHonoWebApiConsts;
import dev.svenehrke.springboothonopoc.core.OOBPersonDetailModel;
import dev.svenehrke.springboothonopoc.core.OOBPersonEditModel;
import dev.svenehrke.springboothonopoc.core.OOBPersonPageModel;
import dev.svenehrke.springboothonopoc.core.OOBPersonTableModel;
import dev.svenehrke.springboothonopoc.core.OOBPersonTableRowModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class HonoOOBPersonApi {
	private final HonoAppClient honoAppClient;

	public HonoOOBPersonApi(HonoAppClient honoAppClient) {
		this.honoAppClient = honoAppClient;
	}

	public ResponseEntity<String> peoplePage(OOBPersonPageModel vm) {
		return honoAppClient.post(OOBHonoWebApiConsts.PAGE, vm);
	}
	public ResponseEntity<String> personTable(OOBPersonTableModel vm) {
		return honoAppClient.post(OOBHonoWebApiConsts.PERSON_TABLE, vm);
	}
	public ResponseEntity<String> personEdit(OOBPersonEditModel vm) {
		return honoAppClient.post(OOBHonoWebApiConsts.PERSON_EDIT, vm);
	}
	public ResponseEntity<String> personEditBack(OOBPersonDetailModel vm) {
		return honoAppClient.post(OOBHonoWebApiConsts.PERSON_EDIT_BACK, vm);
	}
	public ResponseEntity<String> personDetails(OOBPersonDetailModel vm) {
		return honoAppClient.post(OOBHonoWebApiConsts.PERSON_DETAILS, vm);
	}
	public ResponseEntity<String> personDetailsBack(OOBPersonTableRowModel vm) {
		return honoAppClient.post(OOBHonoWebApiConsts.PERSON_DETAILS_BACK, vm);
	}
	public ResponseEntity<String> personRow(OOBPersonTableRowModel vm) {
		return honoAppClient.post(OOBHonoWebApiConsts.PERSON_ROW, vm);
	}
}
