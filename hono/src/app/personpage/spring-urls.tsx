
// TODO: think about passing these URLs in the VM from spring to hono:
const URL_DEMO_OOB_BASE = '/demo/oob';
const URL_DEMO_EVENT_BASE = '/demo/event';
export const SpringUrls = {
	OOB_demo: {
		PAGE: `${URL_DEMO_OOB_BASE}/page`,
	},
	Event_demo: {
		PAGE: `${URL_DEMO_EVENT_BASE}/page`,
	},
	Info: {
		PAGE: '/info',
	},
	Person: {
		edit: (id: number) => `/person/${id}/edit`,
		editBack: (id: number) => `/person/${id}/editback`,
		table: () => `${URL_DEMO_OOB_BASE}/persontable`,
	},
};
