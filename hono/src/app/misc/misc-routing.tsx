import {Hono} from "hono";
import {InfoPage} from "./infopage";
import {HonoInfo} from "../p01oobpage/spring-hono-shared-consts";

function init(hono: Hono) {
	hono.get(HonoInfo.PAGE, async (c) => {
		return c.render(<InfoPage></InfoPage>);
	});
}
export const miscRouting = {
	init,
}
