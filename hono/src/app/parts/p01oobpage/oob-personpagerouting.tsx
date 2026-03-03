import {Hono} from "hono";
import {OOBPersonEditor} from "./oob-personedit";
import {OOBPersonDetails} from "./oob-persondetails";
import {OOBPersonDetailsBack} from "./oob-persondetailsback";
import {OOBPersonTable} from "./oob-persontable";
import {OOBPersonPage} from "./oob-personpage";
import {PersonDetailModel, PersonEditModel, PersonPageModel, PersonTableModel, PersonTableRowModel} from "./oob-person-page-model-vm";
import {OOBPersonRow} from "./oob-personrow";
import {OOBHonoWebApiConsts} from "./oob-hono-web-api-shared-consts";
import {OOBPersondetailsCard} from "./oob-persondetailscard";
import {HonoWebApiConsts} from "../p00shared/hono-web-api-shared-consts";

function init(hono: Hono) {
	hono.post(OOBHonoWebApiConsts.BASE + HonoWebApiConsts.PAGE, async (c) => {
		const vm = await c.req.json() as PersonPageModel;
		return c.render(<OOBPersonPage vm={vm}></OOBPersonPage>);
	});
	hono.post(OOBHonoWebApiConsts.BASE + HonoWebApiConsts.PERSON_DETAILS, async (c) => {
		const vm = await c.req.json() as PersonDetailModel;
		return c.render(<OOBPersonDetails vm={vm}></OOBPersonDetails>);
	});
	hono.post(OOBHonoWebApiConsts.BASE + HonoWebApiConsts.PERSON_EDIT, async (c) => {
		const vm = await c.req.json() as PersonEditModel;
		return c.render(<OOBPersonEditor vm={vm}></OOBPersonEditor>);
	});

	hono.post(OOBHonoWebApiConsts.BASE + HonoWebApiConsts.PERSON_ROW, async (c) => {
		const vm = await c.req.json() as PersonTableRowModel;
		return c.render(<OOBPersonRow vm={vm}></OOBPersonRow>);
	});

	hono.post(OOBHonoWebApiConsts.BASE + HonoWebApiConsts.PERSON_DETAILS_BACK, async (c) => {
		const vm = await c.req.json() as PersonTableRowModel;
		return c.render(<OOBPersonDetailsBack vm={vm}></OOBPersonDetailsBack>);
	});

	hono.post(OOBHonoWebApiConsts.BASE + HonoWebApiConsts.PERSON_TABLE, async (c) => {
		const vm = await c.req.json() as PersonTableModel;
		return c.render(<OOBPersonTable vm={vm}></OOBPersonTable>);
	});

	hono.post(OOBHonoWebApiConsts.BASE + HonoWebApiConsts.PERSON_DETAILS_CARD, async (c) => {
		const vm = await c.req.json() as PersonDetailModel;
		return c.render(<OOBPersondetailsCard vm={vm}></OOBPersondetailsCard>);
	});

}

export const oobPersonPageRouting = {
	init,
}
