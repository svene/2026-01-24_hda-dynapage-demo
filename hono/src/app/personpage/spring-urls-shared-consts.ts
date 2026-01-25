
// TODO: think about passing these URLs in the VM from spring to hono:
const URL_DEMO_OOB_BASE = '/demo/oob';
const URL_DEMO_EVENT_BASE = '/demo/event';
const INFO_PAGE = '/info';

export const SpringOOBUrls = {
	OOB_DEMO_PAGE: `${URL_DEMO_OOB_BASE}/page`,
	OOB_PERSON_TABLE: `${URL_DEMO_OOB_BASE}/persontable`,
};
export const SpringEventBUrls = {
	EVENT_DEMO_PAGE: `${URL_DEMO_EVENT_BASE}/page`,
};
