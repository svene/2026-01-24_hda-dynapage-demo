import {EvtPersonDetailModel} from "./evt-person-page-model-vm";
import {ComponentChildren} from "hono/jsx";

export const EvtPersondetailsRow = (props: {
	vm: EvtPersonDetailModel,
	children: ComponentChildren
}) => (
		<>
			<tr
				id={`row-${props.vm.id}`}
				style="cursor: pointer"
				hx-trigger="click"
				hx-swap="none"
				hx-get={props.vm._backLink}
			>
				<td style="border-style: none">
					{/* ugly: workaround for multiple trigger/action pairs: */}
					{props.children}
				</td>
				<td style="border-style: none">{props.vm.firstName}</td>
				<td style="border-style: none">{props.vm.lastName}</td>
				<td style="border-style: none">{props.vm.streetName}</td>
				<td style="border-style: none"><span className="icon"><i className="material-icons">arrow_drop_up</i></span></td>
			</tr>
		</>
);
