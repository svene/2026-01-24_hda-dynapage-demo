import {Hono} from "hono";
import {OOBPersonEditor} from "./oob-personedit";
import {OOBPersonDetails} from "./oob-persondetails";
import {OOBPersonDetailsBack} from "./oob-persondetailsback";
import {OOBPersonTable} from "./oob-persontable";
import {OOBPersonPage} from "./oob-personpage";
import {OOBPersonDetailModel, OOBPersonEditModel, OOBPersonPageModel, OOBPersonTableModel, OOBPersonTableRowModel} from "./oob-person-page-model-vm";
import {OOBPersonRow} from "./oob-personrow";
import {OOBHonoWebApiConsts} from "./oob-hono-web-api-shared-consts";
import {OOBPersondetailsCard} from "./oob-persondetailscard";

function init(hono: Hono) {
	hono.post(OOBHonoWebApiConsts.PAGE, async (c) => {
		const vm = await c.req.json() as OOBPersonPageModel;
		return c.render(<OOBPersonPage vm={vm}></OOBPersonPage>);
	});
	hono.post(OOBHonoWebApiConsts.PERSON_DETAILS, async (c) => {
		const vm = await c.req.json() as OOBPersonDetailModel;
		return c.render(<OOBPersonDetails vm={vm}></OOBPersonDetails>);
	});
	hono.post(OOBHonoWebApiConsts.PERSON_EDIT, async (c) => {
		const vm = await c.req.json() as OOBPersonEditModel;
		return c.render(<OOBPersonEditor vm={vm}></OOBPersonEditor>);
	});

	hono.post(OOBHonoWebApiConsts.PERSON_ROW, async (c) => {
		const vm = await c.req.json() as OOBPersonTableRowModel;
		return c.render(<OOBPersonRow vm={vm}></OOBPersonRow>);
	});

	hono.post(OOBHonoWebApiConsts.PERSON_DETAILS_BACK, async (c) => {
		const vm = await c.req.json() as OOBPersonTableRowModel;
		return c.render(<OOBPersonDetailsBack vm={vm}></OOBPersonDetailsBack>);
	});

	hono.post(OOBHonoWebApiConsts.PERSON_TABLE, async (c) => {
		const vm = await c.req.json() as OOBPersonTableModel;
		return c.render(<OOBPersonTable vm={vm}></OOBPersonTable>);
	});

	hono.post(OOBHonoWebApiConsts.PERSON_DETAILS_CARD, async (c) => {
		const vm = await c.req.json() as OOBPersonDetailModel;
		return c.render(<OOBPersondetailsCard vm={vm}></OOBPersondetailsCard>);
	});

}

export const oobPersonPageRouting = {
	init,
}
