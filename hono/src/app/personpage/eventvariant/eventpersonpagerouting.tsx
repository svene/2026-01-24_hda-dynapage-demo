import {Hono} from "hono";
import {
	PersonPageModel,
} from "../person-page-model-vm";
import {EvtPersonPage} from "./evt-personpage";
import {HonoEvent} from "../hono-shared-consts";

function init(hono: Hono) {
	hono.post(HonoEvent.PAGE, async (c) => {
		const vm = await c.req.json() as PersonPageModel;
		return c.render(<EvtPersonPage vm={vm}></EvtPersonPage>);
	});
}

export const eventPersonPageRouting = {
	init,
}
