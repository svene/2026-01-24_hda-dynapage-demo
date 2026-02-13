import {OOBPersonEditModel} from "../p01oobpage/oob-person-page-model-vm";
import {ComponentChildren, JSX} from "hono/jsx";

export const EvtPersonEditor = (props: { cid: string, vm: OOBPersonEditModel, children: ComponentChildren }) => (
	<tr id={`row-${props.vm.id}-edit`}>
		{props.children}
		<td colSpan={4} style="padding: 0px">
			<div class="card p-5 my-2">
				<form>
					<div class="fixed-grid">
						<div class="grid">
							<div class="cell">
								<div class="field">
									<label class="label">Firstname</label>
									<div class="control">
										<input class="input" type="text" name="firstName" value={props.vm.firstName}></input>
									</div>
								</div>
							</div>
							<div class="cell">
								<div class="field">
									<label class="label">Lastname</label>
									<div class="control">
										<input class="input" type="text" name="lastName" value={props.vm.lastName}></input>
									</div>
								</div>
							</div>
							<div class="cell">
								<div class="field">
									<label class="label">Street</label>
									<div class="control">
										<input class="input" type="text" name="streetName" value={props.vm.streetName}></input>
									</div>
								</div>
							</div>
						</div>
					</div>
					<nav class="level">
						<button
							class="level-item button"
							_={`on click halt the event then send '${EditEvents.CLOSE_REQUESTED}'(id:${props.cid})`}
						>&lt; Back
						</button>
						<button
							type="submit"
							class="level-item button is-primary"
							hx-trigger="click consume"
							hx-put={`${props.vm._submitLink}`} /* Expects backend to respond with 'person-updated'(id) event */
							hx-swap="none" /* Works with event handling of 'person-updated' */
						>Save
						</button>
					</nav>
				</form>
			</div>
		</td>
	</tr>
);

export const EditEvents = {
	CLOSE_REQUESTED: 'close-edit-requested',
	BE_UPDATED: 'person-updated',
};

type TemplateAttrs = JSX.IntrinsicElements["template"]
export const EvtPersonEditorCloseHandler = (
	{ cid, vm, ...attrs }: { cid: string, vm: OOBPersonEditModel } & TemplateAttrs
) => (
	<template
		hx-trigger={`
			${EditEvents.CLOSE_REQUESTED}[event.detail.id == ${cid}] from:closest tr
			`}
		hx-target="closest tr"
		hx-swap="outerHTML"
		{...attrs}
	></template>
);
export const EvtPersonEditorUpdatedHandler = (
	{ cid, vm, ...attrs }: { cid: string, vm: OOBPersonEditModel } & TemplateAttrs
) => (
	<template
		hx-trigger={`
			${EditEvents.BE_UPDATED}[event.detail.id === ${cid}] from:closest tr
			`}
		hx-target="closest tr"
		hx-swap="outerHTML"
		{...attrs}
	></template>
);

export class EvtPersonEditorEvents {
}
