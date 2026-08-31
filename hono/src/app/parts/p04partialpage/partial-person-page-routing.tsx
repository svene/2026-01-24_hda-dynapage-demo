import {Context} from "hono";
import {PartialPersonEditor} from "./partial-person-edit";
import {PartialPersonDetails} from "./partial-person-details";
import {PartialPersonDetailsBack} from "./partial-person-details-back";
import {PartialPersonTable} from "./partial-person-table";
import {PartialPersonPage} from "./partial-person-page";
import {PartialPersonRow} from "./partial-person-row";
import {PartialPersonDetailsCard} from "./partial-person-details-card";
import {PartialPersonSaved} from "./partial-person-saved";
import {RouteDefinition, ActionUrlDefinition} from "../p00shared/app-types";
import {JTSPartialPersonRouteName} from "../../../generated/types/vm-types";

const nameIdUrl = (name: JTSPartialPersonRouteName, id: number) => `/demo/partial/uiroute/${name}?id=${id}`; // SPRING-HONO
const nameUrl = (name: JTSPartialPersonRouteName) => `/demo/partial/uiroute/${name}`; // SPRING-HONO

type PartialPersonRoutesMap = Record<JTSPartialPersonRouteName, RouteDefinition>;
export const partialPersonRoutes = {
	PartialPersonPage: { // SPRING-HONO
		url: () => nameUrl('PartialPersonPage'), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<PartialPersonPage vm={vm}></PartialPersonPage>);
		}
	},
	PartialPersonDetails: { // SPRING-HONO
		url: (id: number) => nameIdUrl('PartialPersonDetails', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<PartialPersonDetails vm={vm}></PartialPersonDetails>);
		}
	},
	PartialPersonEditor: { // SPRING-HONO
		url: (id: number) => nameIdUrl('PartialPersonEditor', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<PartialPersonEditor vm={vm}></PartialPersonEditor>);
		}
	},
	PartialPersonRow: { // SPRING-HONO
		url: (id: number) => nameIdUrl('PartialPersonRow', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<PartialPersonRow vm={vm}></PartialPersonRow>);
		}
	},
	PartialPersonDetailsBack: { // SPRING-HONO
		url: (id: number) => nameIdUrl('PartialPersonDetailsBack', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<PartialPersonDetailsBack vm={vm}></PartialPersonDetailsBack>);
		}
	},
	PartialPersonTable: { // SPRING-HONO
		url: () => nameUrl('PartialPersonTable'), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<PartialPersonTable vm={vm}></PartialPersonTable>);
		}
	},
	PartialPersonDetailsCard: { // SPRING-HONO
		url: (id: number) => nameIdUrl('PartialPersonDetailsCard', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<PartialPersonDetailsCard vm={vm}></PartialPersonDetailsCard>);
		}
	},
	PartialPersonSaved: { // SPRING-HONO
		url: (id: number) => nameIdUrl('PartialPersonSaved', id), // SPRING-HONO
		render: async (c: Context, vm: any) => {
			return c.render(<PartialPersonSaved vm={vm}></PartialPersonSaved>);
		}
	},
} satisfies PartialPersonRoutesMap;

export const partialPersonActionUrls = {
	UpdatePerson: { // SPRING-HONO
		url: (id: number) => `/demo/partial/person/${id}`, // SPRING-HONO
	},
	Delete: { // SPRING-HONO
		url: () => `/demo/partial/delete`, // SPRING-HONO
	},
} satisfies Record<string, ActionUrlDefinition>;
