import {Context} from "hono";
import {InfoPage} from "./infopage";
import {RouteDefinition} from "../p00shared/app-types";

export const infoRoutes = {
	InfoPage: {
		url: () => `/info`,
		render: async (c: Context) => {
			return c.render(<InfoPage></InfoPage>);
		},
		id: 'info',
	},
} satisfies Record<string, RouteDefinition>;

export type InfoRouteKey = keyof typeof infoRoutes;
