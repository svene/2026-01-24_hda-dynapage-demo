import {EvtPersondetailsRow} from "./evt-persondetailrow";
import {EvtPersondetailsCard} from "./evt-persondetailscard";
import {OOBPersonDetailModel} from "../p01oobpage/oob-person-page-model-vm";

export const EvtPersonDetails = (props: { vm: OOBPersonDetailModel }) => (
		<>
			<EvtPersondetailsRow vm={props.vm}>
				{/* Inject behavior for 'close-details-requested' event from outside (here) into EvtPersondetailsRow component.*/}
				{/* Use <template> since it is not rendered by the browser and therefore does not have undesired impact on layout.*/}
				<template
					hx-trigger={`close-details-requested[event.detail.id === ${props.vm.id}] from:body`}
					hx-get="/demo/event/person/{id}/row"
					hx-vals='js:{id: event.detail.id}'
					hx-target='closest tr'
					hx-swap="outerHTML"
				></template>
			</EvtPersondetailsRow>
			<EvtPersondetailsCard vm={props.vm}/>
		</>
);
