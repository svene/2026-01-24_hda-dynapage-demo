
// TODO: think about passing these URLs in the VM from spring to hono:
export const SpringUrls = {
	Person: {
		URL_DEMO_OOB_PAGE: '/demo/oob/page',
		URL_DEMO_EVENT_PAGE: '/demo/event/page',
		URL_INFO_PAGE: '/info',
		details: (id: number) => `/person/${id}/details`,
		detailsBack: (id: number) => `/person/${id}/detailsback`,
		edit: (id: number) => `/person/${id}/edit`,
		editBack: (id: number) => `/person/${id}/editback`,
		table: () => `/persontable`,
	},
};
