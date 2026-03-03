import {Hono} from "hono";
import {EvtPersonPage} from "./evt-personpage";
import {EvtHonoWebApiConsts} from "./evt-hono-web-api-shared-consts";
import {EvtPersonRow} from "./evt-personrow";
import {EvtPersonTable} from "./evt-persontable";
import {EvtPersonEditor} from "./evt-personedit";
import {PersonDetailModel, PersonEditModel, PersonPageModel, PersonTableModel, PersonTableRowModel} from "../p01oobpage/oob-person-page-model-vm";
import {EvtPersondetailsCard} from "./evt-persondetailscard";
import {EvtPersondetailsRow} from "./evt-persondetailrow";
import {HonoWebApiConsts} from "../p00shared/hono-web-api-shared-consts";

function init(hono: Hono) {
	hono.post(EvtHonoWebApiConsts.BASE + HonoWebApiConsts.PAGE, async (c) => {
		const vm = await c.req.json() as PersonPageModel;
		return c.render(<EvtPersonPage vm={vm}></EvtPersonPage>);
	});

	hono.post(EvtHonoWebApiConsts.BASE + HonoWebApiConsts.PERSON_DETAILS, async (c) => {
		const vm = await c.req.json() as PersonDetailModel;
		return c.render(
			<>
				<EvtPersondetailsRow vm={vm}></EvtPersondetailsRow>
				<EvtPersondetailsCard vm={vm}></EvtPersondetailsCard>
			</>
		);
	});

	hono.post(EvtHonoWebApiConsts.BASE + HonoWebApiConsts.PERSON_DETAILS_ROW, async (c) => {
		const vm = await c.req.json() as PersonDetailModel;
		return c.render(
			<EvtPersondetailsRow vm={vm}></EvtPersondetailsRow>
		);
	});

	hono.post(EvtHonoWebApiConsts.BASE + HonoWebApiConsts.PERSON_DETAILS_CARD, async (c) => {
		const vm = await c.req.json() as PersonDetailModel;
		return c.render(<EvtPersondetailsCard vm={vm}></EvtPersondetailsCard>);
	});

	hono.post(EvtHonoWebApiConsts.BASE + HonoWebApiConsts.PERSON_EDIT, async (c) => {
		const vm = await c.req.json() as PersonEditModel;
		return c.render(
			<EvtPersonEditor vm={vm}></EvtPersonEditor>
		);
	});

	hono.post(EvtHonoWebApiConsts.BASE + HonoWebApiConsts.PERSON_ROW, async (c) => {
		const vm = await c.req.json() as PersonTableRowModel;
		return c.render(<EvtPersonRow vm={vm}></EvtPersonRow>);
	});

	hono.post(EvtHonoWebApiConsts.BASE + HonoWebApiConsts.PERSON_TABLE, async (c) => {
		const vm = await c.req.json() as PersonTableModel;
		return c.render(<EvtPersonTable vm={vm}></EvtPersonTable>);
	});

}

export const evtPersonPageRouting = {
	init,
}
