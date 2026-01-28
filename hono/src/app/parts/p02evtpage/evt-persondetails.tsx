import {EvtPersonDetailModel} from "./evt-person-page-model-vm";
import {EvtPersondetailsRow} from "./evt-persondetailrow";
import {EvtPersondetailsCard} from "./evt-persondetailscard";

export const EvtPersonDetails = (props: { vm: EvtPersonDetailModel }) => (
		<>
			<EvtPersondetailsRow vm={props.vm}/>
			<EvtPersondetailsCard vm={props.vm}/>
		</>
);
