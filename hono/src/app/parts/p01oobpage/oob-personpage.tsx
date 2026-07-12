import {PersonPageModel} from "./oob-person-page-model-vm";
import {OOBPersonTable} from "./oob-persontable";
import {MpaLayout} from "../../root/mpalayout";
import {oobPersonRoutes} from "./oob-personpagerouting";

export const OOBPersonPage = (props: { vm: PersonPageModel }) => (
	<MpaLayout selectedMenu={oobPersonRoutes.OOBPersonPage.id}>
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
						hx-get={oobPersonRoutes.OOBPersonTable.url()}
						hx-target="#result-table"
					/>
				</div>
			</div>
			<OOBPersonTable vm={props.vm.table}></OOBPersonTable>
		</>
	</MpaLayout>
);
