import {Hono} from "hono";
import {InfoPage} from "./infopage";
import {INFO_PAGE} from "../personpage/hono-urls-shared-consts";

function init(hono: Hono) {
	hono.get(INFO_PAGE, async (c) => {
		return c.render(<InfoPage></InfoPage>);
	});
}
export const miscRouting = {
	init,
}
