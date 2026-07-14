import {OOBPersondetailsCard} from "./oob-persondetailscard";
import {OOBPersondetailsRow} from "./oob-persondetailrow";
import {PersonDetailModel} from "../../../generated/types/vm-types";

export const OOBPersonDetails = (props: { vm: PersonDetailModel }) => (
		<>
			<OOBPersondetailsRow vm={props.vm}/>
			<OOBPersondetailsCard vm={props.vm}/>
		</>
);
