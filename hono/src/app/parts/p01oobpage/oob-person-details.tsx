import {OOBPersonDetailsCard} from "./oob-person-details-card";
import {OOBPersonDetailsRow} from "./oob-person-details-row";
import {PersonDetailModel} from "../../../generated/types/vm-types";

export const OOBPersonDetails = (props: { vm: PersonDetailModel }) => (
		<>
			<OOBPersonDetailsRow vm={props.vm}/>
			<OOBPersonDetailsCard vm={props.vm}/>
		</>
);
