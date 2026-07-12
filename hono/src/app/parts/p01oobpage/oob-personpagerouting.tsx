import {Context, Hono} from "hono";
import {OOBPersonEditor} from "./oob-personedit";
import {OOBPersonDetails} from "./oob-persondetails";
import {OOBPersonDetailsBack} from "./oob-persondetailsback";
import {OOBPersonTable} from "./oob-persontable";
import {OOBPersonPage} from "./oob-personpage";
import {PersonDetailModel, PersonEditModel, PersonPageModel, PersonTableModel, PersonTableRowModel} from "./oob-person-page-model-vm";
import {OOBPersonRow} from "./oob-personrow";
import {OOBPersondetailsCard} from "./oob-persondetailscard";
import {RouteDefinition, RouteUrlDefinition} from "../p00shared/app-types";

export const oobPersonRoutes = {
	OOBPersonPage: {
		url: () => `/demo/oob/page`,
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonPageModel;
			return c.render(<OOBPersonPage vm={vm}></OOBPersonPage>);
		},
		id: 'oob',
	},
	OOBPersonDetails: {
		url: (id: number) => `/demo/oob/person/${id}/details`,
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonDetailModel;
			return c.render(<OOBPersonDetails vm={vm}></OOBPersonDetails>);
		}
	},
	OOBPersonEditor: {
		url: (id: number) => `/demo/oob/person/${id}/edit`,
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonEditModel;
			return c.render(<OOBPersonEditor vm={vm}></OOBPersonEditor>);
		}
	},
	OOBPersonRow: {
		url: (id: number) => `/demo/oob/person/${id}/row`,
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonTableRowModel;
			return c.render(<OOBPersonRow vm={vm}></OOBPersonRow>);
		}
	},
	OOBPersonDetailsBack: {
		url: (id: number) => `/demo/oob/person/${id}/detailsback`,
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonTableRowModel;
			return c.render(<OOBPersonDetailsBack vm={vm}></OOBPersonDetailsBack>);
		}
	},
	OOBPersonTable: {
		url: () => `/demo/oob/persontable`,
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonTableModel;
			return c.render(<OOBPersonTable vm={vm}></OOBPersonTable>);
		}
	},
	OOBPersondetailsCard: {
		url: (id: number) => `/demo/oob/person/${id}/detailscard`,
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonDetailModel;
			return c.render(<OOBPersondetailsCard vm={vm}></OOBPersondetailsCard>);
		}
	},
} satisfies Record<string, RouteDefinition>;

export type OOBPersonRouteKey = keyof typeof oobPersonRoutes;

export const oobPersonUrls = {
	UpdatePerson: {
		url: (id: number) => `/demo/event/person/${id}`,
	},
	Delete: {
		url: () => `/demo/oob/delete`,
	},
} satisfies Record<string, RouteUrlDefinition>;
