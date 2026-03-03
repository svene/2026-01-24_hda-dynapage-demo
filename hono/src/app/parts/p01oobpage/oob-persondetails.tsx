import {PersonDetailModel} from "./oob-person-page-model-vm";
import {OOBPersondetailsCard} from "./oob-persondetailscard";
import {OOBPersondetailsRow} from "./oob-persondetailrow";

export const OOBPersonDetails = (props: { vm: PersonDetailModel }) => (
		<>
			<OOBPersondetailsRow vm={props.vm}/>
			<OOBPersondetailsCard vm={props.vm}/>
		</>
);
