
// TODO: think about passing these URLs in the VM from spring to hono:
const URL_DEMO_OOB_BASE = '/demo/oob';
const URL_DEMO_EVENT_BASE = '/demo/event';
export const SpringUrls = {
	Person: {
		URL_DEMO_OOB_PAGE: `${URL_DEMO_OOB_BASE}/page`,
		URL_DEMO_EVENT_PAGE: `${URL_DEMO_EVENT_BASE}/page`,
		URL_INFO_PAGE: '/info',
		details: (id: number) => `/person/${id}/details`,
		detailsBack: (id: number) => `/person/${id}/detailsback`,
		edit: (id: number) => `/person/${id}/edit`,
		editBack: (id: number) => `/person/${id}/editback`,
		table: () => `${URL_DEMO_OOB_BASE}/persontable`,
	},
};
