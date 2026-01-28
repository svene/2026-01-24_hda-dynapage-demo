import {OOBPersonDetailModel} from "./oob-person-page-model-vm";
import {OOBPersondetailsCard} from "./oob-persondetailscard";

export const OOBPersonEditBack = (props: { vm: OOBPersonDetailModel }) => (
	<OOBPersondetailsCard vm={props.vm}/>
);
