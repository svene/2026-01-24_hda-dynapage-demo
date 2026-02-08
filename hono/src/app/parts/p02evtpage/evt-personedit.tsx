import {OOBPersonEditModel} from "../p01oobpage/oob-person-page-model-vm";

export const EvtPersonEditor = (props: { vm: OOBPersonEditModel }) => (
	<tr id={`row-${props.vm.id}-edit`}>
		<template
			hx-trigger={`
			close-edit-requested[event.detail.id === ${props.vm.id}] from:body,
			person-updated[event.detail.id === ${props.vm.id}] from:body
			`}
			hx-target="closest tr"
			hx-swap="outerHTML"
			hx-get={props.vm._editBackLink}
		></template>
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
							_={`on click halt the event then send 'close-edit-requested'(id:${props.vm.id}) to <body/>`}
						>&lt; Back
						</button>
						<button
							type="submit"
							class="level-item button is-primary"
							hx-trigger="click consume"
							hx-put={`${props.vm._submitLink}`}
							hx-swap="none" /* Works with event handling of 'person-updated' */
						>Save
						</button>
					</nav>
				</form>
			</div>
		</td>
	</tr>
);
