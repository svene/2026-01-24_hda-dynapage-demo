import {Hono} from "hono";
import { serveStatic } from 'hono/bun';
import {infoRouting} from "../parts/p09info/info-routing";
import {evtPersonPageRouting} from "../parts/p02evtpage/evt-personpagerouting";
import {oobPersonPageRouting} from "../parts/p01oobpage/oob-personpagerouting";
import {OOBHonoWebApiConsts} from "../parts/p01oobpage/oob-hono-web-api-shared-consts";

function init(hono: Hono) {
	hono.use('/static/*', serveStatic({ root: './' }))
	hono.get('/', (c) => {
		return c.redirect(OOBHonoWebApiConsts.PAGE);
	});
	oobPersonPageRouting.init(hono);
	evtPersonPageRouting.init(hono);
	infoRouting.init(hono);
}

export const app = {
	init,
}
