import {Hono} from "hono";
import {PersonEditor} from "./personedit";
import {PersonDetails} from "./persondetails";
import {PersonDetailsBack} from "./persondetailsback";
import {PersonTable} from "./persontable";
import {PersonPage} from "./personpage";
import {PersonDetailModel, PersonEditModel, PersonPageModel, PersonTableModel, PersonTableRowModel} from "./person-page-model-vm";
import {PersonRow} from "./personrow";
import {PersonEditBack} from "./personeditback";
import {HonoOOB} from "./hono-shared-consts";

function init(hono: Hono) {
	hono.post(HonoOOB.PAGE, async (c) => {
		const vm = await c.req.json() as PersonPageModel;
		return c.render(<PersonPage vm={vm}></PersonPage>);
	});
	hono.post(HonoOOB.PERSON_DETAILS, async (c) => {
		const vm = await c.req.json() as PersonDetailModel;
		return c.render(<PersonDetails vm={vm}></PersonDetails>);
	});
	hono.post(HonoOOB.PERSON_EDIT, async (c) => {
		const vm = await c.req.json() as PersonEditModel;
		return c.render(<PersonEditor vm={vm}></PersonEditor>);
	});

	hono.post(HonoOOB.PERSON_ROW, async (c) => {
		const vm = await c.req.json() as PersonTableRowModel;
		return c.render(<PersonRow vm={vm}></PersonRow>);
	});

	hono.post(HonoOOB.PERSON_DETAILS_BACK, async (c) => {
		const vm = await c.req.json() as PersonTableRowModel;
		return c.render(<PersonDetailsBack vm={vm}></PersonDetailsBack>);
	});

	hono.post(HonoOOB.PERSON_TABLE, async (c) => {
		const vm = await c.req.json() as PersonTableModel;
		return c.render(<PersonTable vm={vm}></PersonTable>);
	});

	hono.post(HonoOOB.PERSON_EDIT_BACK, async (c) => {
		const vm = await c.req.json() as PersonDetailModel;
		return c.render(<PersonEditBack vm={vm}></PersonEditBack>);
	});

}

export const personPageRouting = {
	init,
}
