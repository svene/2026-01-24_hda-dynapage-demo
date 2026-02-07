import {EvtPersondetailsRow} from "./evt-persondetailrow";
import {EvtPersondetailsCard} from "./evt-persondetailscard";
import {OOBPersonDetailModel} from "../p01oobpage/oob-person-page-model-vm";

export const EvtPersonDetails = (props: { vm: OOBPersonDetailModel }) => (
		<>
			<EvtPersondetailsRow
				vm={props.vm}
				hx-trigger={`close-details-requested[event.detail.id === ${props.vm.id}] from:body`}
				hx-get={props.vm._rowUrl}
				hx-target='closest tr'
				hx-swap="outerHTML"
			>
			</EvtPersondetailsRow>
			<EvtPersondetailsCard vm={props.vm}/>
		</>
);
