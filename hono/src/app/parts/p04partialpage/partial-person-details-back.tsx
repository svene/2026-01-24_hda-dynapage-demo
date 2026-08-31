import {PartialPersonRow} from "./partial-person-row";
import {PersonTableRowModel} from "../../../generated/types/vm-types";

/**
 * Collapse the expanded detail view back to a plain table row.
 *
 * htmx 4 "partial" approach: the response carries <hx-partial> wrappers, each
 * naming its own hx-target / hx-swap. Compare the OOB variant, which puts one
 * fragment in the primary swap slot and marks the other with hx-swap-oob (keyed
 * by id); here both regions are just partials with explicit targets.
 *
 *  - #row-${id}          -> replaced by the plain row
 *  - #row-${id}-details  -> deleted (the card goes away)
 */
export const PartialPersonDetailsBack = (props: { vm: PersonTableRowModel }) => (
		<>
			<hx-partial hx-target={`#row-${props.vm.id}`} hx-swap="outerHTML">
				<PartialPersonRow vm={props.vm}/>
			</hx-partial>
			<hx-partial hx-target={`#row-${props.vm.id}-details`} hx-swap="delete"></hx-partial>
		</>
);
