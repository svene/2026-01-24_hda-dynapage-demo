import {EvtPersonDetailModel} from "./evt-person-page-model-vm";

type TrAttrs = JSX.IntrinsicElements["tr"]

export const EvtPersondetailsRow = (
	{ vm, ...attrs }: { vm: EvtPersonDetailModel } & TrAttrs
) => (
		<>
			<tr
				id={`row-${vm.id}`}
				style="cursor: pointer"
				_={`on click send 'close-details-requested'(id:${vm.id}) to <body/>`}
				{...attrs}
			>
				<td style="border-style: none"></td>
				<td style="border-style: none">{vm.firstName}</td>
				<td style="border-style: none">{vm.lastName}</td>
				<td style="border-style: none">{vm.streetName}</td>
				<td style="border-style: none"><span className="icon"><i className="material-icons">arrow_drop_up</i></span></td>
			</tr>
		</>
);
