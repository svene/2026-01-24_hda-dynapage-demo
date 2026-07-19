import {Context} from "hono";

export type RouteDefinition = {
	url: (...args: any[]) => string;
	render: (c: Context, vm: any) => Promise<Response>;
};
export type ActionUrlDefinition = {
	url: (...args: any[]) => string;
};
