import {EvtPersondetailsRow, EvtPersonDetailsRowX} from "./evt-persondetailrow";
import {EvtPersondetailsCard} from "./evt-persondetailscard";
import {OOBPersonDetailModel} from "../p01oobpage/oob-person-page-model-vm";

export const EvtPersonDetails = (props: { vm: OOBPersonDetailModel }) => (
		<>
			<EvtPersondetailsRow
				cid={props.vm.id + ''}
				vm={props.vm}
			>
			</EvtPersondetailsRow>
			<EvtPersondetailsCard
				vm={props.vm}
			></EvtPersondetailsCard>
		</>
);
