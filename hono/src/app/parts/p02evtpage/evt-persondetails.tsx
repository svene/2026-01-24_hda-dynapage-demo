import {EvtPersondetailsRow, EvtPersonDetailsRowX} from "./evt-persondetailrow";
import {EvtPersondetailsCard} from "./evt-persondetailscard";
import {OOBPersonDetailModel} from "../p01oobpage/oob-person-page-model-vm";
import {EvtBackendEvents} from "./evt-hono-web-api-shared-consts";

export const EvtPersonDetails = (props: { vm: OOBPersonDetailModel }) => (
		<>
			<EvtPersondetailsRow
				cid={props.vm.id + ''}
				vm={props.vm}
			>
				<EvtPersonDetailsRowX.RowEventHandler
					cid={props.vm.id + ''}
					eventName={EvtPersonDetailsRowX.CLOSE_REQUESTED}
					vm={props.vm}
					hx-get={props.vm._rowUrl}
				>
				</EvtPersonDetailsRowX.RowEventHandler>
				{/* refresh this component after update in backend happened: */}
				<EvtPersonDetailsRowX.RowEventHandler
					cid={props.vm.id + ''}
					eventName={EvtBackendEvents.PERSON_UPDATED}
					from='body'
					vm={props.vm}
					hx-get={`/demo/event/person/${props.vm.id}/detailsrow`} /*TODO: replace hard coded URL */
				>
				</EvtPersonDetailsRowX.RowEventHandler>
			</EvtPersondetailsRow>
			<EvtPersondetailsCard
				vm={props.vm}
			></EvtPersondetailsCard>
		</>
);
