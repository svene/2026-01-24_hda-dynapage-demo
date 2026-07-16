import {Context} from "hono";
import {EvtPersonPage} from "./evt-personpage";
import {EvtPersonRow} from "./evt-personrow";
import {EvtPersonTable} from "./evt-persontable";
import {EvtPersonEditor} from "./evt-personedit";
import {EvtPersondetailsCard} from "./evt-persondetailscard";
import {EvtPersondetailsRow} from "./evt-persondetailrow";
import {RouteDefinition, ActionUrlDefinition} from "../p00shared/app-types";
import {PersonDetailModel, PersonEditModel, PersonPageModel, PersonTableModel, PersonTableRowModel} from "../../../generated/types/vm-types";

export const evtPersonRoutes = {
	EvtPersonPage: { // SPRING-HONO
		url: () => `/demo/event/page`, // SPRING-HONO
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonPageModel;
			return c.render(<EvtPersonPage vm={vm}></EvtPersonPage>);
		},
	},
	EvtPersonDetails: { // SPRING-HONO
		url: (id: number) => `/demo/event/person/${id}/details`, // SPRING-HONO
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
	EvtPersondetailsRow: { // SPRING-HONO
		url: (id: number) => `/demo/event/person/${id}/detailsrow`, // SPRING-HONO
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonDetailModel;
			return c.render(
				<EvtPersondetailsRow vm={vm}></EvtPersondetailsRow>
			);
		}
	},
	EvtPersondetailsCard: { // SPRING-HONO
		url: (id: number) => `/demo/event/person/${id}/detailscard`, // SPRING-HONO
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonDetailModel;
			return c.render(<EvtPersondetailsCard vm={vm}></EvtPersondetailsCard>);
		}
	},
	EvtPersonEditor: { // SPRING-HONO
		url: (id: number) => `/demo/event/person/${id}/edit`, // SPRING-HONO
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonEditModel;
			return c.render(
				<EvtPersonEditor vm={vm}></EvtPersonEditor>
			);
		}
	},
	EvtPersonRow: { // SPRING-HONO
		url: (id: number) => `/demo/event/person/${id}/row`, // SPRING-HONO
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonTableRowModel;
			return c.render(<EvtPersonRow vm={vm}></EvtPersonRow>);
		}
	},
	EvtPersonTable: { // SPRING-HONO
		url: () => `/demo/event/persontable`, // SPRING-HONO
		render: async (c: Context) => {
			const vm = await c.req.json() as PersonTableModel;
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

// SPRING-HONO: EvtPeopleController.EvtBackendEvents
export const evtEvents = {
	PERSON_UPDATED: 'person-updated',
}

