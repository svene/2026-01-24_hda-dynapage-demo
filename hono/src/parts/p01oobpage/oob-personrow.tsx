import {OOBPersonTableRowModel} from "./oob-person-page-model-vm";

export const OOBPersonRow = (props: {vm: OOBPersonTableRowModel}) => (
	<tr
		id={`row-${props.vm.id}`}
		style="cursor: pointer"
		hx-trigger="click"
		hx-target="this"
		hx-swap="outerHTML"
		hx-get={props.vm._detailsLink}
	>
		<td hx-trigger="click consume">
			<input type="checkbox" name="selection" value={props.vm.id} form="bulkDeleteForm"></input>
		</td>
		<td>{props.vm.firstName}</td>
		<td>{props.vm.lastName}</td>
		<td>{props.vm.streetName}</td>
		<td><span className="icon"><i className="material-icons">arrow_drop_down</i></span></td>
	</tr>

);
