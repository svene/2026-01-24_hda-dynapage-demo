import {Hono} from "hono";
import { serveStatic } from 'hono/bun';
import {greeting} from "./misc/greeting";
import {miscRouting} from "./misc/misc-routing";
import {personPageRouting} from "./p01oobpage/personpagerouting";
import {evtPersonpagerouting} from "./p02evtpage/evt-personpagerouting";
import {OOBConsts} from "./p01oobpage/oob-consts";

function init(hono: Hono) {
	hono.use('/static/*', serveStatic({ root: './' }))
	hono.get('/', (c) => {
		return c.redirect(OOBConsts.PAGE);
	});
	personPageRouting.init(hono);
	evtPersonpagerouting.init(hono);
	miscRouting.init(hono);
	greeting.init(hono);
}

export const app = {
	init,
}
