import {PartialPersonTable} from "./partial-person-table";
import {MpaLayout} from "../../root/mpalayout";
import {partialPersonRoutes} from "./partial-person-page-routing";
import {PersonPageModel} from "../../../generated/types/vm-types";

export const PartialPersonPage = (props: { vm: PersonPageModel }) => (
	<MpaLayout selectedMenu={'PARTIAL_PAGE_ID'}>
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
						hx-get={partialPersonRoutes.PartialPersonTable.url()}
						hx-target="#result-table"
					/>
				</div>
			</div>
			<PartialPersonTable vm={props.vm.table}></PartialPersonTable>
		</>
	</MpaLayout>
);
