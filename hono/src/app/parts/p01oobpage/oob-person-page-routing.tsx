import {Context} from "hono";
import {OOBPersonEditor} from "./oob-person-edit";
import {OOBPersonDetails} from "./oob-person-details";
import {OobPersonDetailsBack} from "./oob-person-details-back";
import {OOBPersonTable} from "./oob-person-table";
import {OobPersonPage} from "./oob-person-page";
import {OOBPersonRow} from "./oob-person-row";
import {OOBPersonDetailsCard} from "./oob-person-details-card";
import {RouteDefinition, ActionUrlDefinition} from "../p00shared/app-types";
import {JTSOobPersonRouteName} from "../../../generated/types/vm-types";

const nameIdUrl = (name: JTSOobPersonRouteName, id: number) => `/demo/oob/route/${name}?id=${id}`; // SPRING-HONO
const nameUrl = (name: JTSOobPersonRouteName) => `/demo/oob/route/${name}`; // SPRING-HONO

type OOBPersonRoutesMap = Record<JTSOobPersonRouteName, RouteDefinition>;
export const oobPersonRoutes = {
	OOBPersonPage: { // SPRING-HONO
		url: () => nameUrl('OOBPersonPage'), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<OobPersonPage vm={vm}></OobPersonPage>);
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
			return c.render(<OobPersonDetailsBack vm={vm}></OobPersonDetailsBack>);
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

export const oobPersonActionUrls = {
	UpdatePerson: { // SPRING-HONO
		url: (id: number) => `/demo/oob/person/${id}`, // SPRING-HONO
	},
	Delete: { // SPRING-HONO
		url: () => `/demo/oob/delete`, // SPRING-HONO
	},
} satisfies Record<string, ActionUrlDefinition>;

