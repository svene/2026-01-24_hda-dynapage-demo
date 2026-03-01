import {EvtHonoWebApiConsts} from "./evt-hono-web-api-shared-consts";
import {EvtPersonTable} from "./evt-persontable";
import {MpaLayout} from "../../root/mpalayout";
import {OOBPersonPageModel} from "../p01oobpage/oob-person-page-model-vm";

export const EvtPersonPage = (props: { vm: OOBPersonPageModel }) => {
	return (
		<MpaLayout selectedMenu={EvtHonoWebApiConsts.PAGE_MENU_ID}>
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
							hx-get={EvtHonoWebApiConsts.BASE + props.vm._tableLink}
							hx-target="#result-table"
						/>
					</div>
				</div>
				<EvtPersonTable vm={props.vm.table}></EvtPersonTable>
			</>
		</MpaLayout>
	);
};
