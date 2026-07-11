import {Context, Hono} from "hono";
import { serveStatic } from 'hono/bun';
import {infoRouting} from "../parts/p09info/info-routing";
import {evtPersonPageRouting, evtPersonRoutes} from "../parts/p02evtpage/evt-personpagerouting";
import {oobPersonRoutes} from "../parts/p01oobpage/oob-personpagerouting";

const ROUTER_URL = '/router';

const unsupported = (name: string) => async (c: Context) => {
	return c.text(`Unsupported route: ${name ?? '(missing)'}`, 400)
}

const routes: Record<string, (c: Context) => Promise<Response>> = {
	...oobPersonRoutes,
	...evtPersonRoutes,
};

function init(hono: Hono) {
	hono.use('/static/*', serveStatic({ root: './' }))
	hono.post(ROUTER_URL, async (c) => {
		const name = c.req.query('name') || 'name-missing';

		const handler = routes[name] ?? unsupported(name);
		return handler(c);
	});
	evtPersonPageRouting.init(hono);
	infoRouting.init(hono);
}

export const AppSpringUrls = {
	oobPersonPage: '/demo/oob/page',
	evtPersonPage: '/demo/evt/page',
	infoPage: '/info',
}

export const app = {
	init,
}
