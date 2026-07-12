import {EvtPersonTable} from "./evt-persontable";
import {MpaLayout} from "../../root/mpalayout";
import {PersonPageModel} from "../p01oobpage/oob-person-page-model-vm";
import {evtPersonRoutes} from "./evt-personpagerouting";

export const EvtPersonPage = (props: { vm: PersonPageModel }) => {
	return (
		<MpaLayout selectedMenu={evtPersonRoutes.EvtPersonPage.id}>
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
							hx-get={evtPersonRoutes.EvtPersonTable.url()}
							hx-target="#result-table"
						/>
					</div>
				</div>
				<EvtPersonTable vm={props.vm.table}></EvtPersonTable>
			</>
		</MpaLayout>
	);
};
