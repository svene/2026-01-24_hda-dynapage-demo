import {Hono} from "hono";
import {EvtPersonPage} from "./evt-personpage";
import {HonoEvent} from "../p01oobpage/hono-shared-consts";
import {PersonPageModel} from "../p01oobpage/person-page-model-vm";

function init(hono: Hono) {
	hono.post(HonoEvent.PAGE, async (c) => {
		const vm = await c.req.json() as PersonPageModel;
		return c.render(<EvtPersonPage vm={vm}></EvtPersonPage>);
	});
}

export const eventPersonPageRouting = {
	init,
}
