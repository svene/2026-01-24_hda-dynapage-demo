import {EvtPersondetailsCard} from "./evt-persondetailscard";
import {OOBPersonDetailModel} from "../p01oobpage/oob-person-page-model-vm";

export const EvtPersonEditBack = (props: { vm: OOBPersonDetailModel }) => (
	<EvtPersondetailsCard vm={props.vm}/>
);
