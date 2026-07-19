import {Context, Hono} from "hono";
import { serveStatic } from 'hono/bun';
import {infoRoutes} from "../parts/p09info/info-routing";
import {evtPersonRoutes} from "../parts/p02evtpage/evt-personpagerouting";
import {oobPersonRoutes} from "../parts/p01oobpage/oob-personpagerouting";
import {RouteDefinition} from "../parts/p00shared/app-types";

const ROUTER_URL = '/router';

const unsupported = (name: string) => {
	return {
		render: async (c: Context) => {
			return c.text(`Unsupported route: ${name ?? '(missing)'}`, 400)
		}
	}
}

const routeDefinitions: Record<string, RouteDefinition> = {
	...infoRoutes,
	...oobPersonRoutes,
	...evtPersonRoutes,
};

function init(hono: Hono) {
	hono.use('/static/*', serveStatic({ root: './' }))
	hono.post(ROUTER_URL, async (c) => {
		const name = c.req.query('name') || 'name-missing';

		const routeDefinition = routeDefinitions[name] ?? unsupported(name);
		const vm = await c.req.json();
		return routeDefinition.render(c, vm);
	});
}

export const app = {
	init,
}
