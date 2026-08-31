import {oobPersonRoutes} from "./oob-person-page-routing";
import {PersonDetailModel} from "../../../generated/types/vm-types";

export const OOBPersonDetailsRow = (props: { vm: PersonDetailModel, oob?: boolean }) => (
		<>
			{/* Implementation note: setting hx-swap-oob to undefined will make hono/jsx omit the attribute entirely */}
			<tr
				id={`row-${props.vm.id}`}
				hx-swap-oob={props.oob ? "outerHTML" : undefined}
				style="cursor: pointer"
				hx-trigger="click"
				hx-target="this"
				hx-swap="outerHTML"
				hx-get={oobPersonRoutes.OOBPersonDetailsBack.url(props.vm.id)}
			>
				<td style="border-style: none"></td>
				<td style="border-style: none">{props.vm.firstName}</td>
				<td style="border-style: none">{props.vm.lastName}</td>
				<td style="border-style: none">{props.vm.streetName}</td>
				<td style="border-style: none"><span class="icon"><i class="material-icons">arrow_drop_up</i></span></td>
			</tr>
		</>
);
