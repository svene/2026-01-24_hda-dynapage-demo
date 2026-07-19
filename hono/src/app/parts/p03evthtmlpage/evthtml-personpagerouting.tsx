import {Context} from "hono";
import {RouteDefinition} from "../p00shared/app-types";
import {JTSEvtHtmlPersonRouteName} from "../../../generated/types/vm-types";
import {EvtHtmlPersonPage} from "./evthtml-personpage";

const nameIdUrl = (name: JTSEvtHtmlPersonRouteName, id: number) => `/demo/eventhtml/component/${name}?id=${id}`; // SPRING-HONO
const nameUrl = (name: JTSEvtHtmlPersonRouteName) => `/demo/eventhtml/component/${name}`; // SPRING-HONO

export const evtHtmlPersonRoutes = {
	EvtHtmlPersonPage: { // SPRING-HONO
		url: () => nameUrl('EvtHtmlPersonPage'), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<EvtHtmlPersonPage vm={vm}></EvtHtmlPersonPage>);
		},
	},
/*
	EvtPersonDetails: { // SPRING-HONO
		url: (id: number) => nameIdUrl('EvtPersonDetails', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(
				<>
					<EvtPersonDetailsRow vm={vm}></EvtPersonDetailsRow>
					<EvtPersonDetailsCard vm={vm}></EvtPersonDetailsCard>
				</>
			);
		}
	},
	EvtPersonDetailsRow: { // SPRING-HONO
		url: (id: number) => nameIdUrl('EvtPersonDetailsRow', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(
				<EvtPersonDetailsRow vm={vm}></EvtPersonDetailsRow>
			);
		}
	},
	EvtPersonDetailsCard: { // SPRING-HONO
		url: (id: number) => nameIdUrl('EvtPersonDetailsCard', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<EvtPersonDetailsCard vm={vm}></EvtPersonDetailsCard>);
		}
	},
	EvtPersonEditor: { // SPRING-HONO
		url: (id: number) => nameIdUrl('EvtPersonEditor', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(
				<EvtPersonEditor vm={vm}></EvtPersonEditor>
			);
		}
	},
	EvtPersonRow: { // SPRING-HONO
		url: (id: number) => nameIdUrl('EvtPersonRow', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<EvtPersonRow vm={vm}></EvtPersonRow>);
		}
	},
	EvtPersonTable: { // SPRING-HONO
		url: () => nameUrl('EvtPersonTable'), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<EvtPersonTable vm={vm}></EvtPersonTable>);
		}
	},
*/
} satisfies Record<string, RouteDefinition>;
export type EvtHtmlPersonRouteKey = keyof typeof evtHtmlPersonRoutes;

/*

export const evtPersonActionUrls = {
	UpdatePerson: { // SPRING-HONO
		url: (id: number) => `/demo/event/person/${id}`, // SPRING-HONO
	},
	Delete: { // SPRING-HONO
		url: () => `/demo/event/delete`, // SPRING-HONO
	},
} satisfies Record<string, ActionUrlDefinition>;
*/

export const EVT_HTML_PAGE_ID = 'EvtHtmlPersonPage' satisfies EvtHtmlPersonRouteKey;

