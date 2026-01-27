import {Hono} from "hono";
import {EvtPersonPage} from "./evt-personpage";
import {OOBPersonPageModel} from "../p01oobpage/oob-person-page-model-vm";
import {EvtConsts} from "./evt-consts";

function init(hono: Hono) {
	hono.post(EvtConsts.PAGE, async (c) => {
		const vm = await c.req.json() as OOBPersonPageModel;
		return c.render(<EvtPersonPage vm={vm}></EvtPersonPage>);
	});
}

export const evtPersonpagerouting = {
	init,
}
