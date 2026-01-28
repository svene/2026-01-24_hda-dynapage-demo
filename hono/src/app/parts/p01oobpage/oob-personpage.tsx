import {OOBPersonPageModel} from "./oob-person-page-model-vm";
import {OOBPersonTable} from "./oob-persontable";
import {MpaLayout} from "../../root/mpalayout";
import {OOBHonoWebApiConsts} from "./oob-hono-web-api-shared-consts";

export const OOBPersonPage = (props: { vm: OOBPersonPageModel }) => (
	<MpaLayout selectedMenu={OOBHonoWebApiConsts.PAGE_MENU_ID}>
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
