import {PersonTableRowModel} from "./oob-person-page-model-vm";
import {OOBPersonRow} from "./oob-personrow";

export const OOBPersonDetailsBack = (props: { vm: PersonTableRowModel }) => (
		<>
{/*
			<hx-partial hx-target="closest tr" hx-swap="outerHTML">
				<PersonRow vm={vm}/>
			</hx-partial>

			<hx-partial hx-target="next tr" hx-swap="outerHTML">
			</hx-partial>
*/}
			<OOBPersonRow vm={props.vm}/>
			<div id={`row-${props.vm.id}-details`} hx-swap-oob="outerHTML">
			</div>

		</>
);
