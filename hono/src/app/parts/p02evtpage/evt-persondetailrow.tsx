import {OOBPersonDetailModel} from "../p01oobpage/oob-person-page-model-vm";
import {EvtBackendEvents} from "./evt-hono-web-api-shared-consts";
import {JSX, PropsWithChildren} from "hono/jsx";

type TrAttrs = JSX.IntrinsicElements["tr"]
type TemplateAttrs = JSX.IntrinsicElements["template"]

type CmpProps = PropsWithChildren<{
	cid: string;
	vm: OOBPersonDetailModel;
}> & TrAttrs;

export const EvtPersondetailsRow = ({ cid, vm, children, ...attrs }: CmpProps) => (
		<>
			<tr
				id={`row-${vm.id}`}
				style="cursor: pointer"
				_={`on click halt the event then send '${EvtPersonDetailsRowX.CLOSE_REQUESTED}'(id:${cid})`}
				{...attrs}
			>
				{children}
				{/* refresh this component after update in backend happened: */}
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

export const EvtPersonDetailsRowX = {
	CLOSE_REQUESTED: 'close-details-requested',
	RowEventHandler: (
		{ cid, eventName, vm, ...attrs }: { cid: string, eventName: string, vm: OOBPersonDetailModel } & TemplateAttrs
	) => (
		<template
			hx-trigger={`
			${eventName}[event.detail.id == ${cid}] from:closest tr
			`}
			hx-target="closest tr"
			hx-swap="outerHTML"
			{...attrs}
		></template>
	)
}
export const XXX = {
	A: () => (
		<div>hallo</div>
	)
}
