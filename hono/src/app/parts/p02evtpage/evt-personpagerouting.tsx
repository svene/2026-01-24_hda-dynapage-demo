import {Context} from "hono";
import {EvtPersonPage} from "./evt-personpage";
import {EvtPersonRow} from "./evt-personrow";
import {EvtPersonTable} from "./evt-persontable";
import {EvtPersonEditor} from "./evt-personedit";
import {PersonDetailModel, PersonEditModel, PersonPageModel, PersonTableModel, PersonTableRowModel} from "../p01oobpage/oob-person-page-model-vm";
import {EvtPersondetailsCard} from "./evt-persondetailscard";
import {EvtPersondetailsRow} from "./evt-persondetailrow";
import {RouteDefinition, RouteUrlDefinition} from "../p00shared/app-types";

export const evtPersonRoutes = {
	EvtPersonPage: {
		url: () => `/demo/event/page`,
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonPageModel;
			return c.render(<EvtPersonPage vm={vm}></EvtPersonPage>);
		},
		id: 'event',
	},
	EvtPersonDetails: {
		url: (id: number) => `/demo/event/person/${id}/details`,
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonDetailModel;
			return c.render(
				<>
					<EvtPersondetailsRow vm={vm}></EvtPersondetailsRow>
					<EvtPersondetailsCard vm={vm}></EvtPersondetailsCard>
				</>
			);
		}
	},
	EvtPersondetailsRow: {
		url: (id: number) => `/demo/event/person/${id}/detailsrow`,
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonDetailModel;
			return c.render(
				<EvtPersondetailsRow vm={vm}></EvtPersondetailsRow>
			);
		}
	},
	EvtPersondetailsCard: {
		url: (id: number) => `/demo/event/person/${id}/detailscard`,
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonDetailModel;
			return c.render(<EvtPersondetailsCard vm={vm}></EvtPersondetailsCard>);
		}
	},
	EvtPersonEditor: {
		url: (id: number) => `/demo/event/person/${id}/edit`,
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonEditModel;
			return c.render(
				<EvtPersonEditor vm={vm}></EvtPersonEditor>
			);
		}
	},
	EvtPersonRow: { // TODO: check why unused
		url: (id: number) => `/demo/event/person/${id}/row`,
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonTableRowModel;
			return c.render(<EvtPersonRow vm={vm}></EvtPersonRow>);
		}
	},
	EvtPersonTable: {
		url: () => `/demo/event/persontable`,
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonTableModel;
			return c.render(<EvtPersonTable vm={vm}></EvtPersonTable>);
		}
	},
} satisfies Record<string, RouteDefinition>;

export type EvtPersonRouteKey = keyof typeof evtPersonRoutes;

export const evtPersonUrls = {
	UpdatePerson: {
		url: (id: number) => `/demo/event/person/${id}`,
	},
	Delete: {
		url: () => `/demo/event/delete`,
	},
} satisfies Record<string, RouteUrlDefinition>;

export const evtEvents = {
	PERSON_UPDATED: 'person-updated',
}
