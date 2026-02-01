import {EvtPersondetailsRow} from "./evt-persondetailrow";
import {EvtPersondetailsCard} from "./evt-persondetailscard";
import {OOBPersonDetailModel} from "../p01oobpage/oob-person-page-model-vm";

export const EvtPersonDetails = (props: { vm: OOBPersonDetailModel }) => (
		<>
			<EvtPersondetailsRow vm={props.vm}/>
			<EvtPersondetailsCard vm={props.vm}/>
		</>
);
