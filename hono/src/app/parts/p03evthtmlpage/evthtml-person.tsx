import {html} from "hono/html";
import {PersonDetailModel} from "../../../generated/types/vm-types";
import {eventName} from "./jtsevthtmlperson";
import {evtHtmlPersonRoutes} from "./evthtml-personpagerouting";
import {HtmlResult} from "../p00shared/app-types";

export const EvtHtmlPersonDetailRow = (vm: PersonDetailModel): HtmlResult  =>
	html`
		<tr
				id="row-${vm.id}"
				style="cursor: pointer"
				_="on click halt the event then send ${eventName('PersonDetailsRow_CloseCmd')}(id:${vm.id})"
		>
			<template
					hx-trigger="${eventName('PersonDetailsRow_CloseCmd')}[event.detail.id == ${vm.id}] from:closest tr"
					hx-target="closest tr"
					hx-swap="outerHTML"
					hx-get="${evtHtmlPersonRoutes.EvtHtmlPersonRow.url(vm.id)}"
			></template>
			<template
					hx-trigger="${eventName('PERSON_UPDATED')}[event.detail.id == ${vm.id}] from:body"
					hx-target="closest tr"
					hx-swap="outerHTML"
					hx-get="${evtHtmlPersonRoutes.EvtHtmlPersonDetailsRow.url(vm.id)}"
			></template>

			<td style="border-style: none"></td>
			<td style="border-style: none">${vm.firstName}</td>
			<td style="border-style: none">${vm.lastName}</td>
			<td style="border-style: none">${vm.streetName}</td>
			<td style="border-style: none"><span class="icon"><i class="material-icons">arrow_drop_up</i></span></td>
		</tr>
	`;

export const EvtHtmlPersonDetailsCard = (vm: PersonDetailModel): HtmlResult =>
	html`
		<tr
				id="row-${vm.id}-details"
				style="cursor: pointer"
				hx-trigger="click"
				hx-target="this"
				hx-swap="outerHTML"
				hx-get="${evtHtmlPersonRoutes.EvtHtmlPersonEditor.url(vm.id)}"
				_="on ${eventName('PersonDetailsRow_CloseCmd')}(id) from <body/> if id == ${vm.id} remove me end"
		>
		<td colSpan=5 style="padding-left: 30px">
			<div class="card p-5 my-2 mx-0">
			<div class="mb-1"><strong>Street:</strong> ${vm.streetName} ${vm.streetNo}</div>
				<div class="mb-1"><strong>City:</strong> ${vm.zipCode} ${vm.city}</div>
				<div class="mb-1"><strong>Mailbox:</strong> ${vm.mailBox}</div>
				<div class="mb-1"><strong>Phone:</strong> ${vm.phoneNumber}</div>
				<div class="mb-3"><strong>Cellphone:</strong> ${vm.cellPhone}</div>
			</div>
		</td>
		</tr>
	`;

export const TPL = (vm: PersonDetailModel) =>
	html`
	`;
