import {Hono} from "hono";
import {InfoPage} from "./infopage";
import {HonoInfo} from "./spring-hono-shared-consts";

function init(hono: Hono) {
	hono.get(HonoInfo.PAGE, async (c) => {
		return c.render(<InfoPage></InfoPage>);
	});
}
export const infoRouting = {
	init,
}
