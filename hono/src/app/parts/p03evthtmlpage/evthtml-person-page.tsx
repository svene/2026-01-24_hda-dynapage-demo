import {PersonPageModel} from "../../../generated/types/vm-types";
import {html} from "hono/html";
import {evtHtmlPersonRoutes} from "./evthtml-person-page-routing";
import {HtmlResult} from "../p00shared/app-types";
import {EvtHtmlPersonTable} from "./evthtml-person-table";

export const EvtHtmlPersonPage = (vm: PersonPageModel): HtmlResult =>
	html`
			<div class="field">
				<label class="label">Search</label>
				<div class="control">
					<input
							class="input"
							type="search"
							name="search"
							placeholder="Search for firstname or lastname"
							hx-trigger="input changed delay:500ms"
							hx-get="${evtHtmlPersonRoutes.EvtHtmlPersonTable.url()}"
							hx-target="#result-table"
					/>
				</div>
			</div>
			${EvtHtmlPersonTable(vm.table)}
	`;
