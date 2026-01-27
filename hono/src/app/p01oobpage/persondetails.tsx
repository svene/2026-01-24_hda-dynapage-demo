import {OOBPersonDetailModel} from "./oob-person-page-model-vm";
import {PersondetailsCard} from "./persondetailscard";
import {PersondetailsRow} from "./persondetailrow";

export const PersonDetails = (props: { vm: OOBPersonDetailModel }) => (
		<>
			<PersondetailsRow vm={props.vm}/>
			<PersondetailsCard vm={props.vm}/>
		</>
);
