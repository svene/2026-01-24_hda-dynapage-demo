import {Context} from "hono";
import {EvtPersonPage} from "./evt-personpage";
import {EvtPersonRow} from "./evt-personrow";
import {EvtPersonTable} from "./evt-persontable";
import {EvtPersonEditor} from "./evt-personedit";
import {PersonDetailModel, PersonEditModel, PersonPageModel, PersonTableModel, PersonTableRowModel} from "../p01oobpage/oob-person-page-model-vm";
import {EvtPersondetailsCard} from "./evt-persondetailscard";
import {EvtPersondetailsRow} from "./evt-persondetailrow";

export const evtPersonRoutes = {
	EvtPersonPage: async (c: Context) => {
		const vm = await c.req.json() as PersonPageModel;
		return c.render(<EvtPersonPage vm={vm}></EvtPersonPage>);
	},
	EvtPersonDetails: async (c: Context) => {
		const vm = await c.req.json() as PersonDetailModel;
		return c.render(
			<>
				<EvtPersondetailsRow vm={vm}></EvtPersondetailsRow>
				<EvtPersondetailsCard vm={vm}></EvtPersondetailsCard>
			</>
		);
	},
	EvtPersondetailsRow: async (c: Context) => {
		const vm = await c.req.json() as PersonDetailModel;
		return c.render(
			<EvtPersondetailsRow vm={vm}></EvtPersondetailsRow>
		);
	},
	EvtPersondetailsCard: async (c: Context) => {
		const vm = await c.req.json() as PersonDetailModel;
		return c.render(<EvtPersondetailsCard vm={vm}></EvtPersondetailsCard>);
	},
	EvtPersonEditor: async (c: Context) => {
		const vm = await c.req.json() as PersonEditModel;
		return c.render(
			<EvtPersonEditor vm={vm}></EvtPersonEditor>
		);
	},
	EvtPersonRow: async (c: Context) => {
		const vm = await c.req.json() as PersonTableRowModel;
		return c.render(<EvtPersonRow vm={vm}></EvtPersonRow>);
	},
	EvtPersonTable: async (c: Context) => {
		const vm = await c.req.json() as PersonTableModel;
		return c.render(<EvtPersonTable vm={vm}></EvtPersonTable>);
	},
}

