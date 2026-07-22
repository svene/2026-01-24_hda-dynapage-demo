import {PersonTableModel} from "../../../generated/types/vm-types";
import {html} from "hono/html";
import {HtmlResult} from "../p00shared/app-types";
import {EvtHtmlPersonRow} from "./evthtml-person-row";
import {evtHtmlPersonActionUrls} from "./evthtml-person-page-routing";

export const EvtHtmlPersonTable = (vm: PersonTableModel): HtmlResult =>
	html`
		<div id="result-table">
			<table class="table">
				<thead>
				<tr>
					<td colSpan=5>
						<form id="bulkDeleteForm" hx-delete="${evtHtmlPersonActionUrls.Delete.url()}">
							<button type="submit" class="button">
								<span class="icon"><i class="material-icons">delete</i></span>
								<span>Delete</span>
							</button>
						</form>
					</td>
				</tr>
				<tr>
					<th></th>
					<th>Firstname</th>
					<th>Lastname</th>
					<th>Street</th>
					<th></th>
				</tr>
				</thead>
				<tbody>
				${vm.people.map((it) => EvtHtmlPersonRow(it))}
				</tbody>
			</table>
			<div>${vm.people.length} of total ${vm.total}</div>

		</div>
	`;

