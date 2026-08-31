import {partialPersonRoutes} from "./partial-person-page-routing";
import {PersonDetailModel} from "../../../generated/types/vm-types";

export const PartialPersonDetailsRow = (props: { vm: PersonDetailModel }) => (
		<>
			{/* Collapsing back to a plain row is a two-region update (swap this row,
			  * remove the card below). The response does both with <hx-partial>
			  * wrappers, so this element only needs to fire the request -
			  * hx-swap="none" tells htmx there is no primary swap to apply here. */}
			<tr
				id={`row-${props.vm.id}`}
				style="cursor: pointer"
				hx-trigger="click"
				hx-swap="none"
				hx-get={partialPersonRoutes.PartialPersonDetailsBack.url(props.vm.id)}
			>
				<td style="border-style: none"></td>
				<td style="border-style: none">{props.vm.firstName}</td>
				<td style="border-style: none">{props.vm.lastName}</td>
				<td style="border-style: none">{props.vm.streetName}</td>
				<td style="border-style: none"><span class="icon"><i class="material-icons">arrow_drop_up</i></span></td>
			</tr>
		</>
);
