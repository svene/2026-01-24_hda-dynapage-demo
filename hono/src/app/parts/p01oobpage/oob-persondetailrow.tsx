import {PersonDetailModel} from "./oob-person-page-model-vm";
import {OOBHonoWebApiConsts} from "./oob-hono-web-api-shared-consts";
import {detailsBackUrl} from "../p00shared/route-builder";

export const OOBPersondetailsRow = (props: { vm: PersonDetailModel }) => (
		<>
			<tr
				id={`row-${props.vm.id}`}
				style="cursor: pointer"
				hx-trigger="click"
				hx-target="this"
				hx-swap="outerHTML"
				hx-get={OOBHonoWebApiConsts.BASE + detailsBackUrl(props.vm.id)}
			>
				<td style="border-style: none"></td>
				<td style="border-style: none">{props.vm.firstName}</td>
				<td style="border-style: none">{props.vm.lastName}</td>
				<td style="border-style: none">{props.vm.streetName}</td>
				<td style="border-style: none"><span class="icon"><i class="material-icons">arrow_drop_up</i></span></td>
			</tr>
		</>
);
