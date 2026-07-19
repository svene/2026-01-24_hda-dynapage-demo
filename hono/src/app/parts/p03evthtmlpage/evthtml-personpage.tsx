// import {EvtPersonTable} from "./evt-persontable";
import {MpaLayout} from "../../root/mpalayout";
import {PersonPageModel} from "../../../generated/types/vm-types";
import {EVT_HTML_PAGE_ID, evtHtmlPersonRoutes} from "./evthtml-personpagerouting";

export const EvtHtmlPersonPage = (props: { vm: PersonPageModel }) => {
	return (
		<MpaLayout selectedMenu={EVT_HTML_PAGE_ID}>
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
							hx-get={''/*evtHtmlPersonRoutes.EvtPersonTable.url()*/}
							hx-target="#result-table"
						/>
					</div>
				</div>
				{/*<EvtPersonTable vm={props.vm.table}></EvtPersonTable>*/}
			</>
		</MpaLayout>
	);
};
