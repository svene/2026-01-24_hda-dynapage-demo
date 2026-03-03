import {PersonPageModel} from "./oob-person-page-model-vm";
import {OOBPersonTable} from "./oob-persontable";
import {MpaLayout} from "../../root/mpalayout";
import {OOBHonoWebApiConsts} from "./oob-hono-web-api-shared-consts";
import {HonoWebApiConsts} from "../p00shared/hono-web-api-shared-consts";

export const OOBPersonPage = (props: { vm: PersonPageModel }) => (
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
						hx-get={OOBHonoWebApiConsts.BASE + HonoWebApiConsts.PERSON_TABLE}
						hx-target="#result-table"
					/>
				</div>
			</div>
			<OOBPersonTable vm={props.vm.table}></OOBPersonTable>
		</>
	</MpaLayout>
);
