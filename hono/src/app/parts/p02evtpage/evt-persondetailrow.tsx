import {OOBPersonDetailModel} from "../p01oobpage/oob-person-page-model-vm";
import {EvtBackendEvents, EvtHonoWebApiConsts} from "./evt-hono-web-api-shared-consts";

export const EvtPersondetailsRow = ({vm}: { vm: OOBPersonDetailModel }) => (
		<>
			<tr
				id={`row-${vm.id}`}
				style="cursor: pointer"
				_={`on click halt the event then send '${EvtPersonDetailsRowX.CLOSE_REQUESTED}'(id:${vm.id})`}
			>
				<template
					hx-trigger={`${EvtPersonDetailsRowX.CLOSE_REQUESTED}[event.detail.id == ${vm.id}] from:closest tr`}
					hx-target="closest tr"
					hx-swap="outerHTML"
					hx-get={EvtHonoWebApiConsts.BASE + vm._rowUrl}
				></template>
				<template
					hx-trigger={`${EvtBackendEvents.PERSON_UPDATED}[event.detail.id == ${vm.id}] from:body`}
					hx-target="closest tr"
					hx-swap="outerHTML"
					hx-get={`/demo/event/person/${vm.id}/detailsrow`} /*TODO: replace hard coded URL */
				></template>
				<td style="border-style: none"></td>
				<td style="border-style: none">{vm.firstName}</td>
				<td style="border-style: none">{vm.lastName}</td>
				<td style="border-style: none">{vm.streetName}</td>
				<td style="border-style: none"><span className="icon"><i className="material-icons">arrow_drop_up</i></span></td>
			</tr>
		</>
);

export const EvtPersonDetailsRowX = {
	CLOSE_REQUESTED: 'close-details-requested',
}
export const XXX = {
	A: () => (
		<div>hallo</div>
	)
}
