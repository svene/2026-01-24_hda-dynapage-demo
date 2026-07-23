import {EvtPersonTable} from "./evt-person-table";
import {MpaLayout} from "../../root/mpalayout";
import {evtPersonRoutes} from "./evt-person-page-routing";
import {PersonPageModel} from "../../../generated/types/vm-types";

export const EvtPersonPage = (props: { vm: PersonPageModel }) => {
	return (
		<MpaLayout selectedMenu={'EVT_PAGE_ID'}>
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
