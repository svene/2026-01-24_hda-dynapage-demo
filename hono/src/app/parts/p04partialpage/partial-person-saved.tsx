import {PartialPersonDetailsCard} from "./partial-person-details-card";
import {PartialPersonDetailsRow} from "./partial-person-details-row";
import {PersonDetailModel} from "../../../generated/types/vm-types";

/**
 * Response for the "Save" action, htmx 4 partial style.
 *
 * Two <hx-partial> wrappers, each naming its own target:
 *  - #row-${id}-edit -> becomes the read-only details card with the new data
 *  - #row-${id}      -> the collapsed row above it is refreshed with the new values
 *
 * The OOB variant does the same thing with a primary swap for the card plus
 * hx-swap-oob on the row; with partials both updates are the same kind of thing.
 */
export const PartialPersonSaved = (props: { vm: PersonDetailModel }) => (
		<>
			<hx-partial hx-target={`#row-${props.vm.id}-edit`} hx-swap="outerHTML">
				<PartialPersonDetailsCard vm={props.vm}/>
			</hx-partial>
			<hx-partial hx-target={`#row-${props.vm.id}`} hx-swap="outerHTML">
				<PartialPersonDetailsRow vm={props.vm}/>
			</hx-partial>
		</>
);
