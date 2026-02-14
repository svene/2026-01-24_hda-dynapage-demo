import {EvtPersondetailsRow, EvtPersondetailsRowCloseHandler, EvtPersonDetailsRowX, XXX} from "./evt-persondetailrow";
import {EvtPersondetailsCard} from "./evt-persondetailscard";
import {OOBPersonDetailModel} from "../p01oobpage/oob-person-page-model-vm";

export const EvtPersonDetails = (props: { vm: OOBPersonDetailModel }) => (
		<>
			<EvtPersondetailsRow
				cid={props.vm.id + ''}
				vm={props.vm}
			>
				<EvtPersonDetailsRowX.CloseHandler
					cid={props.vm.id + ''}
					vm={props.vm}
					hx-get={props.vm._rowUrl}
				>
				</EvtPersonDetailsRowX.CloseHandler>
			</EvtPersondetailsRow>
			<EvtPersondetailsCard
				vm={props.vm}
			></EvtPersondetailsCard>
		</>
);
