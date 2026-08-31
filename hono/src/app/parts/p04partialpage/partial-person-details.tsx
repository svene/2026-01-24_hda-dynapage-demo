import {PartialPersonDetailsCard} from "./partial-person-details-card";
import {PartialPersonDetailsRow} from "./partial-person-details-row";
import {PersonDetailModel} from "../../../generated/types/vm-types";

export const PartialPersonDetails = (props: { vm: PersonDetailModel }) => (
		<>
			<PartialPersonDetailsRow vm={props.vm}/>
			<PartialPersonDetailsCard vm={props.vm}/>
		</>
);
