import {OOBPersonDetailModel} from "../p01oobpage/oob-person-page-model-vm";
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
		{ cid, eventName, vm, from = 'closest tr', ...attrs }: { cid: string, eventName: string, vm: OOBPersonDetailModel } & TemplateAttrs
	) => (
		<template
			hx-trigger={`
			${eventName}[event.detail.id == ${cid}] from:${from}
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
