import {evtPersonRoutes} from "./evt-person-page-routing";
import {PersonDetailModel} from "../../../generated/types/vm-types";
import {eventName} from "./jts-evt-person";

export const EvtPersonDetailsRow = ({vm}: { vm: PersonDetailModel }) => (
		<>
			<tr
				id={`row-${vm.id}`}
				style="cursor: pointer"
				_={`on click halt the event then send ${eventName('PersonDetailsRow_CloseCmd')}(id:${vm.id})`}
			>
				<template
					hx-trigger={`${eventName('PersonDetailsRow_CloseCmd')}[event.detail.id == ${vm.id}] from:closest tr`}
					hx-target="closest tr"
					hx-swap="outerHTML"
					hx-get={evtPersonRoutes.EvtPersonRow.url(vm.id)}
				></template>
				<template
					hx-trigger={`${eventName('PERSON_UPDATED')}[event.detail.id == ${vm.id}] from:body`}
					hx-target="closest tr"
					hx-swap="outerHTML"
					hx-get={evtPersonRoutes.EvtPersonDetailsRow.url(vm.id)}
				></template>
				<td style="border-style: none"></td>
				<td style="border-style: none">{vm.firstName}</td>
				<td style="border-style: none">{vm.lastName}</td>
				<td style="border-style: none">{vm.streetName}</td>
				<td style="border-style: none"><span class="icon"><i class="material-icons">arrow_drop_up</i></span></td>
			</tr>
		</>
);
