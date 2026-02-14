import {OOBPersonDetailModel, OOBPersonEditModel} from "../p01oobpage/oob-person-page-model-vm";
import {EvtBackendEvents} from "./evt-hono-web-api-shared-consts";
import {JSX} from "hono/jsx";

type TrAttrs = JSX.IntrinsicElements["tr"]
type TemplateAttrs = JSX.IntrinsicElements["template"]

export const EvtPersondetailsRow = (
	{ vm, children, ...attrs }: { vm: OOBPersonDetailModel } & TrAttrs
) => (
		<>
			<tr
				id={`row-${vm.id}`}
				style="cursor: pointer"
				_={`on click send '${Events.CLOSE_REQUESTED}'(id:${vm.id}) to <body/>`}
				{...attrs}
			>
				<template
					hx-trigger={`${EvtBackendEvents.PERSON_UPDATED}[event.detail.id === ${vm.id}] from:body`}
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

const Events = {
	CLOSE_REQUESTED: 'close-details-requested',
};
export const EvtCloseHandler = (
	{ cid, vm, ...attrs }: { cid: string, vm: OOBPersonEditModel } & TemplateAttrs
) => (
	<template
		hx-trigger={`
			${Events.CLOSE_REQUESTED}[event.detail.id == ${cid}] from:closest tr
			`}
		hx-target="closest tr"
		hx-swap="outerHTML"
		{...attrs}
	></template>
);
