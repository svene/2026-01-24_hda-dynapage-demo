import {Context} from "hono";
import {html} from "hono/html";

export type HtmlResult = ReturnType<typeof html>

export type RouteDefinition = {
	url: (...args: any[]) => string;
	render: (c: Context, vm: any) => Response | Promise<Response>;
};
export type ActionUrlDefinition = {
	url: (...args: any[]) => string;
};

// TODO: value redundancy with route-keys -> think about how this can be improved
export type PageId = "INFO_PAGE_ID" | "OOB_PAGE_ID" | "EVT_PAGE_ID" | "EVT_HTML_PAGE_ID";

