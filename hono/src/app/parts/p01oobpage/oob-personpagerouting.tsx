import {Context} from "hono";
import {OOBPersonEditor} from "./oob-personedit";
import {OOBPersonDetails} from "./oob-persondetails";
import {OOBPersonDetailsBack} from "./oob-persondetailsback";
import {OOBPersonTable} from "./oob-persontable";
import {OOBPersonPage} from "./oob-personpage";
import {OOBPersonRow} from "./oob-personrow";
import {OOBPersondetailsCard} from "./oob-persondetailscard";
import {RouteDefinition, RouteUrlDefinition} from "../p00shared/app-types";
import {PersonDetailModel, PersonEditModel, PersonPageModel, PersonTableModel, PersonTableRowModel} from "../../../generated/types/vm-types";

export const oobPersonRoutes = {
	OOBPersonPage: {
		url: () => `/demo/oob/page`, // SPRING-HONO
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonPageModel;
			return c.render(<OOBPersonPage vm={vm}></OOBPersonPage>);
		}
	},
	OOBPersonDetails: {
		url: (id: number) => `/demo/oob/person/${id}/details`, // SPRING-HONO
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonDetailModel;
			return c.render(<OOBPersonDetails vm={vm}></OOBPersonDetails>);
		}
	},
	OOBPersonEditor: {
		url: (id: number) => `/demo/oob/person/${id}/edit`, // SPRING-HONO
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonEditModel;
			return c.render(<OOBPersonEditor vm={vm}></OOBPersonEditor>);
		}
	},
	OOBPersonRow: {
		url: (id: number) => `/demo/oob/person/${id}/row`, // SPRING-HONO
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonTableRowModel;
			return c.render(<OOBPersonRow vm={vm}></OOBPersonRow>);
		}
	},
	OOBPersonDetailsBack: {
		url: (id: number) => `/demo/oob/person/${id}/detailsback`, // SPRING-HONO
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonTableRowModel;
			return c.render(<OOBPersonDetailsBack vm={vm}></OOBPersonDetailsBack>);
		}
	},
	OOBPersonTable: {
		url: () => `/demo/oob/persontable`, // SPRING-HONO
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonTableModel;
			return c.render(<OOBPersonTable vm={vm}></OOBPersonTable>);
		}
	},
	OOBPersondetailsCard: {
		url: (id: number) => `/demo/oob/person/${id}/detailscard`, // SPRING-HONO
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonDetailModel;
			return c.render(<OOBPersondetailsCard vm={vm}></OOBPersondetailsCard>);
		}
	},
} satisfies Record<string, RouteDefinition>;
export type OOBPersonRouteKey = keyof typeof oobPersonRoutes;

export const OOB_PAGE_ID = 'OOBPersonPage' satisfies OOBPersonRouteKey;

export const oobPersonUrls = {
	UpdatePerson: {
		url: (id: number) => `/demo/event/person/${id}`, // SPRING-HONO
	},
	Delete: {
		url: () => `/demo/oob/delete`, // SPRING-HONO
	},
} satisfies Record<string, RouteUrlDefinition>;

