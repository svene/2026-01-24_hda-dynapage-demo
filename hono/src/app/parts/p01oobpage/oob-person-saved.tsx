import {OOBPersonDetailsCard} from "./oob-person-details-card";
import {OOBPersonDetailsRow} from "./oob-person-details-row";
import {PersonDetailModel} from "../../../generated/types/vm-types";

/**
 * Response for the OOB variant's "Save" action:
 * - the details card becomes the primary swap into the editor's `closest tr`,
 *   replacing the editor with the read-only card that now holds the new data
 * - the still-present collapsed `row-${id}` above it is refreshed out-of-band
 */
export const OOBPersonSaved = (props: { vm: PersonDetailModel }) => (
		<>
			<OOBPersonDetailsCard vm={props.vm}/>
			<OOBPersonDetailsRow vm={props.vm} oob={true}/>
		</>
);
