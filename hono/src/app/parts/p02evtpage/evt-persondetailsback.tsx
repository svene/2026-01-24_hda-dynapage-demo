import {EvtPersonTableRowModel} from "./evt-person-page-model-vm";
import {EvtPersonRow} from "./evt-personrow";

export const EvtPersonDetailsBack = (props: { vm: EvtPersonTableRowModel }) => (
		<>
{/*
			<hx-partial hx-target="closest tr" hx-swap="outerHTML">
				<PersonRow vm={vm}/>
			</hx-partial>

			<hx-partial hx-target="next tr" hx-swap="outerHTML">
			</hx-partial>
*/}
			<EvtPersonRow vm={props.vm}/>
			<div id={`row-${props.vm.id}-details`} hx-swap-oob="outerHTML">
			</div>

		</>
);
