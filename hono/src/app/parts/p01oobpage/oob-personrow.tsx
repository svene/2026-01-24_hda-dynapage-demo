import {oobPersonRoutes} from "./oob-personpagerouting";
import {PersonTableRowModel} from "../../../generated/types/vm-types";

export const OOBPersonRow = (props: {vm: PersonTableRowModel}) => (
	<tr
		id={`row-${props.vm.id}`}
		style="cursor: pointer"
		hx-trigger="click"
		hx-target="this"
		hx-swap="outerHTML"
		hx-get={ oobPersonRoutes.OOBPersonDetails.url(props.vm.id)}
	>
		<td hx-trigger="click consume"> {/* consume: prevent bubbling, only checkbox needs to be clicked, not parents*/}
			<input type="checkbox" name="selection" value={props.vm.id} form="bulkDeleteForm"></input>
		</td>
		<td>{props.vm.firstName}</td>
		<td>{props.vm.lastName}</td>
		<td>{props.vm.streetName}</td>
		<td><span class="icon"><i class="material-icons">arrow_drop_down</i></span></td>
	</tr>

);
