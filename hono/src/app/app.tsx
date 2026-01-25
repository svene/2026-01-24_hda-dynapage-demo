import {Hono} from "hono";
import { serveStatic } from 'hono/bun';
import {greeting} from "./misc/greeting";
import {personPageRouting} from "./personpage/personpagerouting";
import {miscRouting} from "./misc/misc-routing";
import {eventPersonPageRouting} from "./personpage/eventvariant/eventpersonpagerouting";
import {HonoOOB} from "./personpage/hono-shared-consts";

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
