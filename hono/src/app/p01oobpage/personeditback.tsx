import {OOBPersonDetailModel} from "./oob-person-page-model-vm";
import {PersondetailsCard} from "./persondetailscard";

export const PersonEditBack = (props: { vm: OOBPersonDetailModel }) => (
	<PersondetailsCard vm={props.vm}/>
);
