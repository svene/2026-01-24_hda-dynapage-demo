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
				onClick={`document.body.dispatchEvent(new CustomEvent('close-details-requested', {detail: {"id": ${props.vm.id}}}))`}

				{...{
					'xx-on:click': `$dispatch('close-details-requested', {"id": "${props.vm.id}"})`
				}}
			>
				<td style="border-style: none">
					{/* Ugly: workaround for multiple trigger/action pairs:*/}
					{/* Since HTMX does not support multiple trigger/action pairs*/}
					{/* this <td> serves as a workaround on which further trigger/actions can be placed on.*/}
					{/* In addition this component should be unaware what happens when the click of <tr> happens*/}
					{/* but it should support the replacement of itself with something else (the standard row for this app)*/}
					{props.children}
				</td>
				<td style="border-style: none">{props.vm.firstName}</td>
				<td style="border-style: none">{props.vm.lastName}</td>
				<td style="border-style: none">{props.vm.streetName}</td>
				<td style="border-style: none"><span className="icon"><i className="material-icons">arrow_drop_up</i></span></td>
			</tr>
		</>
);
