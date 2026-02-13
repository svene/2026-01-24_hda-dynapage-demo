import {Hono} from "hono";
import {EvtPersonPage} from "./evt-personpage";
import {EvtHonoWebApiConsts} from "./evt-hono-web-api-shared-consts";
import {EvtPersonRow} from "./evt-personrow";
import {EvtPersonTable} from "./evt-persontable";
import {EvtPersonDetails} from "./evt-persondetails";
import {EvtPersonEditor, EvtPersonEditorCloseHandler, EvtPersonEditorUpdatedHandler} from "./evt-personedit";
import {OOBPersonDetailModel, OOBPersonEditModel, OOBPersonPageModel, OOBPersonTableModel, OOBPersonTableRowModel} from "../p01oobpage/oob-person-page-model-vm";
import {EvtPersondetailsCard} from "./evt-persondetailscard";
import {EvtPersondetailsRow} from "./evt-persondetailrow";

function init(hono: Hono) {
	hono.post(EvtHonoWebApiConsts.PAGE, async (c) => {
		const vm = await c.req.json() as OOBPersonPageModel;
		return c.render(<EvtPersonPage vm={vm}></EvtPersonPage>);
	});

	hono.post(EvtHonoWebApiConsts.PERSON_DETAILS, async (c) => {
		const vm = await c.req.json() as OOBPersonDetailModel;
		return c.render(<EvtPersonDetails vm={vm}></EvtPersonDetails>);
	});

	hono.post(EvtHonoWebApiConsts.PERSON_DETAILS_ROW, async (c) => {
		const vm = await c.req.json() as OOBPersonDetailModel;
		// TODO: refactor duplication of attributes (see EvtPersonDetails component):
		return c.render(<EvtPersondetailsRow
			vm={vm}
			hx-trigger={`close-details-requested[event.detail.id === ${vm.id}] from:body`}
			hx-get={vm._rowUrl}
			hx-target='closest tr'
			hx-swap="outerHTML"
		></EvtPersondetailsRow>);
	});

	hono.post(EvtHonoWebApiConsts.PERSON_DETAILS_CARD, async (c) => {
		const vm = await c.req.json() as OOBPersonDetailModel;
		return c.render(<EvtPersondetailsCard vm={vm}></EvtPersondetailsCard>);
	});

	hono.post(EvtHonoWebApiConsts.PERSON_EDIT, async (c) => {
		const vm = await c.req.json() as OOBPersonEditModel;
		const cid = vm.id + '';
		return c.render(
			<EvtPersonEditor cid={cid} vm={vm}>
				<EvtPersonEditorCloseHandler
					cid={cid}
					vm={vm}
					hx-get={vm._editBackLink}
				></EvtPersonEditorCloseHandler>
				<EvtPersonEditorUpdatedHandler
					cid={cid}
					vm={vm}
					hx-get={vm._editBackLink}
				></EvtPersonEditorUpdatedHandler>
			</EvtPersonEditor>
		);
	});

	hono.post(EvtHonoWebApiConsts.PERSON_ROW, async (c) => {
		const vm = await c.req.json() as OOBPersonTableRowModel;
		return c.render(<EvtPersonRow vm={vm}></EvtPersonRow>);
	});

	hono.post(EvtHonoWebApiConsts.PERSON_TABLE, async (c) => {
		const vm = await c.req.json() as OOBPersonTableModel;
		return c.render(<EvtPersonTable vm={vm}></EvtPersonTable>);
	});

}

export const evtPersonPageRouting = {
	init,
}
