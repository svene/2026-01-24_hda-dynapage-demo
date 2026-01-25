import {Hono} from "hono";
import {
	PersonPageModel,
} from "../person-page-model-vm";
import {EvtPersonPage} from "./evt-personpage";
import {HonoEventUrls} from "../hono-urls-shared-consts";

function init(hono: Hono) {
	hono.post(HonoEventUrls.PAGE, async (c) => {
		const vm = await c.req.json() as PersonPageModel;
		return c.render(<EvtPersonPage vm={vm}></EvtPersonPage>);
	});
}

export const eventPersonPageRouting = {
	init,
}
