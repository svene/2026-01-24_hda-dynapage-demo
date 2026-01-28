import {EvtPersonDetailModel} from "./evt-person-page-model-vm";
import {EvtPersondetailsCard} from "./evt-persondetailscard";

export const EvtPersonEditBack = (props: { vm: EvtPersonDetailModel }) => (
	<EvtPersondetailsCard vm={props.vm}/>
);
