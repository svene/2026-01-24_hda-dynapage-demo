import {Context} from "hono";
import {ActionUrlDefinition, RouteDefinition} from "../p00shared/app-types";
import {JTSEvtHtmlPersonRouteName} from "../../../generated/types/vm-types";
import {EvtHtmlPersonPage} from "./evthtml-person-page";
import {html} from "hono/html";
import {EvtHtmlPersonEditor} from "./evthtml-person-edit";
import {EvtHtmlPersonDetailsRow} from "./evthtml-person-details-row";
import {EvtHtmlPersonDetailsCard} from "./evthtml-person-details-card";
import {EvtHtmlPersonRow} from "./evthtml-person-row";
import {EvtHtmlPersonTable} from "./evthtml-person-table";
import {EvtHtmlLayout} from "./evthtml-layout";

const nameIdUrl = (name: JTSEvtHtmlPersonRouteName, id: number) => `/demo/eventhtml/uiroute/${name}?id=${id}`; // SPRING-HONO
const nameUrl = (name: JTSEvtHtmlPersonRouteName) => `/demo/eventhtml/uiroute/${name}`; // SPRING-HONO

export const evtHtmlPersonRoutes = {
	EvtHtmlPersonPage: { // SPRING-HONO
		url: () => nameUrl('EvtHtmlPersonPage'), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.html(html`
				${EvtHtmlLayout('EVT_HTML_PAGE_ID', EvtHtmlPersonPage(vm))}
			`);
		},
	},
	EvtHtmlPersonDetails: { // SPRING-HONO
		url: (id: number) => nameIdUrl('EvtHtmlPersonDetails', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.html(html`
				${EvtHtmlPersonDetailsRow(vm)}
				${EvtHtmlPersonDetailsCard(vm)}
			`);
		}
	},
	EvtHtmlPersonDetailsRow: { // SPRING-HONO
		url: (id: number) => nameIdUrl('EvtHtmlPersonDetailsRow', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.html(EvtHtmlPersonDetailsRow(vm));
		}
	},
	EvtHtmlPersonDetailsCard: { // SPRING-HONO
		url: (id: number) => nameIdUrl('EvtHtmlPersonDetailsCard', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.html(EvtHtmlPersonDetailsCard(vm));
		}
	},
	EvtHtmlPersonEditor: { // SPRING-HONO
		url: (id: number) => nameIdUrl('EvtHtmlPersonEditor', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.html(EvtHtmlPersonEditor(vm));
		}
	},
	EvtHtmlPersonRow: { // SPRING-HONO
		url: (id: number) => nameIdUrl('EvtHtmlPersonRow', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.html(EvtHtmlPersonRow(vm));
		}
	},
	EvtHtmlPersonTable: { // SPRING-HONO
		url: () => nameUrl('EvtHtmlPersonTable'), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			console.log(vm);
			return c.html(EvtHtmlPersonTable(vm));
		}
	},
} satisfies Record<string, RouteDefinition>;
export type EvtHtmlPersonRouteKey = keyof typeof evtHtmlPersonRoutes;

export const evtHtmlPersonActionUrls = {
	UpdatePerson: { // SPRING-HONO
		url: (id: number) => `/demo/eventhtml/person/${id}`, // SPRING-HONO
	},
	Delete: { // SPRING-HONO
		url: () => `/demo/eventhtml/delete`, // SPRING-HONO
	},
} satisfies Record<string, ActionUrlDefinition>;

export const EVT_HTML_PAGE_ID = 'EvtHtmlPersonPage' satisfies EvtHtmlPersonRouteKey;

