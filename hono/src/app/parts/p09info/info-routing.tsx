import {Context} from "hono";
import {InfoPage} from "./infopage";
import {RouteDefinition} from "../p00shared/app-types";

export const infoRoutes = {
	InfoPage: { // SPRING-HONO
		url: () => `/info`, // SPRING-HONO
		render: async (c: Context) => {
			return c.render(<InfoPage></InfoPage>);
		},
	},
} satisfies Record<string, RouteDefinition>;
type InfoRouteKey = keyof typeof infoRoutes;

export const INFO_PAGE_ID = 'InfoPage' satisfies InfoRouteKey;
