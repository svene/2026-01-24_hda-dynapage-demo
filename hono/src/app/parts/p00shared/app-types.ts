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

