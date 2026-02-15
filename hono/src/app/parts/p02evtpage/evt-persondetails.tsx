import {EvtPersondetailsRow, EvtPersonDetailsRowX} from "./evt-persondetailrow";
import {EvtPersondetailsCard} from "./evt-persondetailscard";
import {OOBPersonDetailModel} from "../p01oobpage/oob-person-page-model-vm";

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
			</EvtPersondetailsRow>
			<EvtPersondetailsCard
				vm={props.vm}
			></EvtPersondetailsCard>
		</>
);
