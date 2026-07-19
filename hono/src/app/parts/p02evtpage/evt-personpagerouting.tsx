import {Context} from "hono";
import {EvtPersonPage} from "./evt-personpage";
import {EvtPersonRow} from "./evt-personrow";
import {EvtPersonTable} from "./evt-persontable";
import {EvtPersonEditor} from "./evt-personedit";
import {EvtPersonDetailsCard} from "./evt-person-details-card";
import {EvtPersonDetailsRow} from "./evt-persondetailrow";
import {RouteDefinition, ActionUrlDefinition} from "../p00shared/app-types";
import {JTSEvtPersonRouteName} from "../../../generated/types/vm-types";

const nameIdUrl = (name: JTSEvtPersonRouteName, id: number) => `/demo/event/component/${name}?id=${id}`; // SPRING-HONO
const nameUrl = (name: JTSEvtPersonRouteName) => `/demo/event/component/${name}`; // SPRING-HONO

export const evtPersonRoutes = {
	EvtPersonPage: { // SPRING-HONO
		url: () => nameUrl('EvtPersonPage'), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<EvtPersonPage vm={vm}></EvtPersonPage>);
		},
	},
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
} satisfies Record<string, RouteDefinition>;
export type EvtPersonRouteKey = keyof typeof evtPersonRoutes;

export const EVT_PAGE_ID = 'EvtPersonPage' satisfies EvtPersonRouteKey;

export const evtPersonActionUrls = {
	UpdatePerson: { // SPRING-HONO
		url: (id: number) => `/demo/event/person/${id}`, // SPRING-HONO
	},
	Delete: { // SPRING-HONO
		url: () => `/demo/event/delete`, // SPRING-HONO
	},
} satisfies Record<string, ActionUrlDefinition>;
