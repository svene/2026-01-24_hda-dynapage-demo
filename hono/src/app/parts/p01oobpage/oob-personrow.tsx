import {OOBPersonTableRowModel} from "./oob-person-page-model-vm";
import {OOBHonoWebApiConsts} from "./oob-hono-web-api-shared-consts";
import {detailsUrl} from "../p00shared/route-builder";

export const OOBPersonRow = (props: {vm: OOBPersonTableRowModel}) => (
	<tr
		id={`row-${props.vm.id}`}
		style="cursor: pointer"
		hx-trigger="click"
		hx-target="this"
		hx-swap="outerHTML"
		hx-get={OOBHonoWebApiConsts.BASE + detailsUrl(props.vm.id)}
	>
		<td hx-trigger="click consume"> {/* consume: prevent bubbling, only checkbox needs to be clicked, not parents*/}
			<input type="checkbox" name="selection" value={props.vm.id} form="bulkDeleteForm"></input>
		</td>
		<td>{props.vm.firstName}</td>
		<td>{props.vm.lastName}</td>
		<td>{props.vm.streetName}</td>
		<td><span className="icon"><i className="material-icons">arrow_drop_down</i></span></td>
	</tr>

);
