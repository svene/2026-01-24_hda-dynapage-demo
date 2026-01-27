import {Hono} from "hono";
import { serveStatic } from 'hono/bun';
import {infoRouting} from "./p09info/info-routing";
import {evtPersonPageRouting} from "./p02evtpage/evt-personpagerouting";
import {OOBConsts} from "./p01oobpage/oob-consts";
import {oobPersonPageRouting} from "./p01oobpage/oob-personpagerouting";

function init(hono: Hono) {
	hono.use('/static/*', serveStatic({ root: './' }))
	hono.get('/', (c) => {
		return c.redirect(OOBConsts.PAGE);
	});
	oobPersonPageRouting.init(hono);
	evtPersonPageRouting.init(hono);
	infoRouting.init(hono);
}

export const app = {
	init,
}
