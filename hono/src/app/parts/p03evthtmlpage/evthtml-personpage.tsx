import {PersonPageModel, PersonTableModel, PersonTableRowModel} from "../../../generated/types/vm-types";
import {html} from "hono/html";
import {evtHtmlPersonActionUrls, evtHtmlPersonRoutes} from "./evthtml-personpagerouting";
import {HtmlResult} from "../p00shared/app-types";

export const EvtHtmlPersonPage = (props: { vm: PersonPageModel }): HtmlResult =>
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
							hx-get=${evtHtmlPersonRoutes.EvtHtmlPersonTable.url()}
							hx-target="#result-table"
					/>
				</div>
			</div>
			${EvtHtmlPersonTable(props.vm.table)}
	`;
export const EvtHtmlPersonTable = (vm: PersonTableModel): HtmlResult =>
	html`
		<div id="result-table">
			<table class="table">
				<thead>
				<tr>
					<td colSpan=5>
						<form id="bulkDeleteForm" hx-delete=${evtHtmlPersonActionUrls.Delete.url()}>
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

export const EvtHtmlPersonRow = (vm: PersonTableRowModel): HtmlResult =>
	html`
		<tr
				id=${`row-${vm.id}`}
				style="cursor: pointer"
				hx-trigger="click"
				hx-target="this"
				hx-swap="outerHTML"
				hx-get=${evtHtmlPersonRoutes.EvtHtmlPersonDetails.url(vm.id)}
		>
			<td hx-trigger="click consume"> <!--consume: prevent bubbling, only checkbox needs to be clicked, not parents-->
				<input type="checkbox" name="selection" value=${vm.id} form="bulkDeleteForm"></input>
			</td>
			<td>${vm.firstName}</td>
			<td>${vm.lastName}</td>
			<td>${vm.streetName}</td>
			<td><span class="icon"><i class="material-icons">arrow_drop_down</i></span></td>
		</tr>
	`;
