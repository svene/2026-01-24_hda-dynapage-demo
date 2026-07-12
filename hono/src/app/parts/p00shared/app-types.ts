import {Context} from "hono";

export type RouteDefinition = {
	url: (...args: any[]) => string;
	render: (c: Context) => Promise<Response>;
	id?: string;
};
export type RouteUrlDefinition = {
	url: (...args: any[]) => string;
};
