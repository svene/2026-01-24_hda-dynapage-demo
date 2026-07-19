import {Context} from "hono";
import {OOBPersonEditor} from "./oob-personedit";
import {OOBPersonDetails} from "./oob-persondetails";
import {OOBPersonDetailsBack} from "./oob-persondetailsback";
import {OOBPersonTable} from "./oob-persontable";
import {OOBPersonPage} from "./oob-personpage";
import {OOBPersonRow} from "./oob-personrow";
import {OOBPersonDetailsCard} from "./o-o-b-person-details-card";
import {RouteDefinition, ActionUrlDefinition} from "../p00shared/app-types";
import {JTSOobPersonRouteName} from "../../../generated/types/vm-types";

const nameIdUrl = (name: JTSOobPersonRouteName, id: number) => `/demo/oob/component/${name}?id=${id}`; // SPRING-HONO
const nameUrl = (name: JTSOobPersonRouteName) => `/demo/oob/component/${name}`; // SPRING-HONO

type OOBPersonRoutesMap = Record<JTSOobPersonRouteName, RouteDefinition>;
export const oobPersonRoutes = {
	OOBPersonPage: { // SPRING-HONO
		url: () => nameUrl('OOBPersonPage'), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<OOBPersonPage vm={vm}></OOBPersonPage>);
		}
	},
	OOBPersonDetails: { // SPRING-HONO
		url: (id: number) => nameIdUrl('OOBPersonDetails', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<OOBPersonDetails vm={vm}></OOBPersonDetails>);
		}
	},
	OOBPersonEditor: { // SPRING-HONO
		url: (id: number) => nameIdUrl('OOBPersonEditor', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<OOBPersonEditor vm={vm}></OOBPersonEditor>);
		}
	},
	OOBPersonRow: { // SPRING-HONO
		url: (id: number) => nameIdUrl('OOBPersonRow', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<OOBPersonRow vm={vm}></OOBPersonRow>);
		}
	},
	OOBPersonDetailsBack: { // SPRING-HONO
		url: (id: number) => nameIdUrl('OOBPersonDetailsBack', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<OOBPersonDetailsBack vm={vm}></OOBPersonDetailsBack>);
		}
	},
	OOBPersonTable: { // SPRING-HONO
		url: () => nameUrl('OOBPersonTable'), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<OOBPersonTable vm={vm}></OOBPersonTable>);
		}
	},
	OOBPersonDetailsCard: { // SPRING-HONO
		url: (id: number) => nameIdUrl('OOBPersonDetailsCard', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<OOBPersonDetailsCard vm={vm}></OOBPersonDetailsCard>);
		}
	},
} satisfies OOBPersonRoutesMap;

export type OOBPersonRouteKey = keyof typeof oobPersonRoutes;
export const OOB_PAGE_ID = 'OOBPersonPage' satisfies OOBPersonRouteKey;

export const oobPersonActionUrls = {
	UpdatePerson: { // SPRING-HONO
		url: (id: number) => `/demo/oob/person/${id}`, // SPRING-HONO
	},
	Delete: { // SPRING-HONO
		url: () => `/demo/oob/delete`, // SPRING-HONO
	},
} satisfies Record<string, ActionUrlDefinition>;

