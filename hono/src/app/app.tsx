import {Hono} from "hono";
import { serveStatic } from 'hono/bun';
import {greeting} from "./misc/greeting";
import {miscRouting} from "./misc/misc-routing";
import {personPageRouting} from "./p01oobpage/personpagerouting";
import {HonoOOB} from "./p01oobpage/hono-shared-consts";
import {eventPersonPageRouting} from "./p02evtpage/eventpersonpagerouting";

function init(hono: Hono) {
	hono.use('/static/*', serveStatic({ root: './' }))
	hono.get('/', (c) => {
		return c.redirect(HonoOOB.PAGE);
	});
	personPageRouting.init(hono);
	eventPersonPageRouting.init(hono);
	miscRouting.init(hono);
	greeting.init(hono);
}

export const app = {
	init,
}
