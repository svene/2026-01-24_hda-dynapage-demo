import {Hono} from "hono";
import {EvtPersonPage} from "./evt-personpage";
import {EvtHonoWebApiConsts} from "./evt-hono-web-api-shared-consts";
import {EvtPersonRow} from "./evt-personrow";
import {EvtPersonTable} from "./evt-persontable";
import {EvtPersonEditor} from "./evt-personedit";
import {OOBPersonDetailModel, OOBPersonEditModel, OOBPersonPageModel, OOBPersonTableModel, OOBPersonTableRowModel} from "../p01oobpage/oob-person-page-model-vm";
import {EvtPersondetailsCard} from "./evt-persondetailscard";
import {EvtPersondetailsRow} from "./evt-persondetailrow";
import {OOBHonoWebApiConsts} from "../p01oobpage/oob-hono-web-api-shared-consts";
import { HonoWebApiConsts } from "../p01oobpage/hono-web-api-shared-consts";

function init(hono: Hono) {
	hono.post(EvtHonoWebApiConsts.BASE + HonoWebApiConsts.PAGE, async (c) => {
		const vm = await c.req.json() as OOBPersonPageModel;
		return c.render(<EvtPersonPage vm={vm}></EvtPersonPage>);
	});

	hono.post(EvtHonoWebApiConsts.BASE + HonoWebApiConsts.PERSON_DETAILS, async (c) => {
		const vm = await c.req.json() as OOBPersonDetailModel;
		return c.render(
			<>
				<EvtPersondetailsRow vm={vm}></EvtPersondetailsRow>
				<EvtPersondetailsCard vm={vm}></EvtPersondetailsCard>
			</>
		);
	});

	hono.post(EvtHonoWebApiConsts.BASE + HonoWebApiConsts.PERSON_DETAILS_ROW, async (c) => {
		const vm = await c.req.json() as OOBPersonDetailModel;
		return c.render(
			<EvtPersondetailsRow vm={vm}></EvtPersondetailsRow>
		);
	});

	hono.post(EvtHonoWebApiConsts.BASE + HonoWebApiConsts.PERSON_DETAILS_CARD, async (c) => {
		const vm = await c.req.json() as OOBPersonDetailModel;
		return c.render(<EvtPersondetailsCard vm={vm}></EvtPersondetailsCard>);
	});

	hono.post(EvtHonoWebApiConsts.BASE + HonoWebApiConsts.PERSON_EDIT, async (c) => {
		const vm = await c.req.json() as OOBPersonEditModel;
		return c.render(
			<EvtPersonEditor vm={vm}></EvtPersonEditor>
		);
	});

	hono.post(EvtHonoWebApiConsts.BASE + HonoWebApiConsts.PERSON_ROW, async (c) => {
		const vm = await c.req.json() as OOBPersonTableRowModel;
		return c.render(<EvtPersonRow vm={vm}></EvtPersonRow>);
	});

	hono.post(EvtHonoWebApiConsts.BASE + HonoWebApiConsts.PERSON_TABLE, async (c) => {
		const vm = await c.req.json() as OOBPersonTableModel;
		return c.render(<EvtPersonTable vm={vm}></EvtPersonTable>);
	});

}

export const evtPersonPageRouting = {
	init,
}
