import {Hono} from "hono";
import {InfoPage} from "./infopage";
import {InfoHonoWebApiConsts} from "./info-hono-web-api-shared-consts";

function init(hono: Hono) {
	hono.get(InfoHonoWebApiConsts.PAGE, async (c) => {
		return c.render(<InfoPage></InfoPage>);
	});
}
export const infoRouting = {
	init,
}
