import {Context, Hono} from "hono";
import {OOBPersonEditor} from "./oob-personedit";
import {OOBPersonDetails} from "./oob-persondetails";
import {OOBPersonDetailsBack} from "./oob-persondetailsback";
import {OOBPersonTable} from "./oob-persontable";
import {OOBPersonPage} from "./oob-personpage";
import {PersonDetailModel, PersonEditModel, PersonPageModel, PersonTableModel, PersonTableRowModel} from "./oob-person-page-model-vm";
import {OOBPersonRow} from "./oob-personrow";
import {OOBPersondetailsCard} from "./oob-persondetailscard";

export const oobPersonRoutes = {
	OOBPersonPage: async (c: Context) => {
		const vm = await c.req.json() as PersonPageModel;
		return c.render(<OOBPersonPage vm={vm}></OOBPersonPage>);
	},
	OOBPersonDetails: async (c: Context) => {
		const vm = await c.req.json() as PersonDetailModel;
		return c.render(<OOBPersonDetails vm={vm}></OOBPersonDetails>);
	},
	OOBPersonEditor: async (c: Context) => {
		const vm = await c.req.json() as PersonEditModel;
		return c.render(<OOBPersonEditor vm={vm}></OOBPersonEditor>);
	},
	OOBPersonRow: async (c: Context) => {
		const vm = await c.req.json() as PersonTableRowModel;
		return c.render(<OOBPersonRow vm={vm}></OOBPersonRow>);
	},
	OOBPersonDetailsBack: async (c: Context) => {
		const vm = await c.req.json() as PersonTableRowModel;
		return c.render(<OOBPersonDetailsBack vm={vm}></OOBPersonDetailsBack>);
	},
	OOBPersonTable: async (c: Context) => {
		const vm = await c.req.json() as PersonTableModel;
		return c.render(<OOBPersonTable vm={vm}></OOBPersonTable>);
	},
	OOBPersondetailsCard: async (c: Context) => {
		const vm = await c.req.json() as PersonDetailModel;
		return c.render(<OOBPersondetailsCard vm={vm}></OOBPersondetailsCard>);
	},
}
