import {MpaLayout} from "../../app/mpalayout";
import {OOBPersonTable} from "../p01oobpage/oob-persontable";
import {EvtConsts} from "./evt-consts";
import {EvtPersonPageModel} from "./evt-person-page-model-vm";

export const EvtPersonPage = (props: { vm: EvtPersonPageModel }) => {
	return (
		<MpaLayout selectedMenu={EvtConsts.PAGE_MENU_ID}>
			<>
				<div class="field">
					<label class="label">Search</label>
					<div class="control">
						<input
							class="input"
							type="search"
							name="search"
							placeholder="Search for firstname or lastname"
							hx-trigger="input changed delay:500ms"
							hx-get={props.vm._tableLink}
							hx-target="#result-table"
						/>
					</div>
				</div>
				<OOBPersonTable vm={props.vm.table}></OOBPersonTable>
			</>
		</MpaLayout>
	);
};
