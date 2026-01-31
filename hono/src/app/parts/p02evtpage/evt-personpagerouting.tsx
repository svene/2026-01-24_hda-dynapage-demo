import {Hono} from "hono";
import {EvtPersonPage} from "./evt-personpage";
import {EvtHonoWebApiConsts} from "./evt-hono-web-api-shared-consts";
import {EvtPersonDetailModel, EvtPersonEditModel, EvtPersonPageModel, EvtPersonTableModel, EvtPersonTableRowModel} from "./evt-person-page-model-vm";
import {EvtPersonRow} from "./evt-personrow";
import {EvtPersonTable} from "./evt-persontable";
import {EvtPersonDetails} from "./evt-persondetails";
import {EvtPersonEditor} from "./evt-personedit";
import {EvtPersonDetailsBack} from "./evt-persondetailsback";
import {EvtPersonEditBack} from "./evt-personeditback";

function init(hono: Hono) {
	hono.post(EvtHonoWebApiConsts.PAGE, async (c) => {
		const vm = await c.req.json() as EvtPersonPageModel;
		return c.render(<EvtPersonPage vm={vm}></EvtPersonPage>);
	});

	hono.post(EvtHonoWebApiConsts.PERSON_DETAILS, async (c) => {
		const vm = await c.req.json() as EvtPersonDetailModel;
		return c.render(<EvtPersonDetails vm={vm}></EvtPersonDetails>);
	});
	hono.post(EvtHonoWebApiConsts.PERSON_EDIT, async (c) => {
		const vm = await c.req.json() as EvtPersonEditModel;
		return c.render(<EvtPersonEditor vm={vm}></EvtPersonEditor>);
	});

	hono.post(EvtHonoWebApiConsts.PERSON_ROW, async (c) => {
		const vm = await c.req.json() as EvtPersonTableRowModel;
		return c.render(<EvtPersonRow vm={vm}></EvtPersonRow>);
	});

	hono.post(EvtHonoWebApiConsts.PERSON_DETAILS_BACK, async (c) => {
		const vm = await c.req.json() as EvtPersonTableRowModel;
		return c.render(<EvtPersonDetailsBack vm={vm}></EvtPersonDetailsBack>);
	});

	hono.post(EvtHonoWebApiConsts.PERSON_TABLE, async (c) => {
		const vm = await c.req.json() as EvtPersonTableModel;
		return c.render(<EvtPersonTable vm={vm}></EvtPersonTable>);
	});

	hono.post(EvtHonoWebApiConsts.PERSON_EDIT_BACK, async (c) => {
		const vm = await c.req.json() as EvtPersonDetailModel;
		return c.render(<EvtPersonEditBack vm={vm}></EvtPersonEditBack>);
	});

}

export const evtPersonPageRouting = {
	init,
}
