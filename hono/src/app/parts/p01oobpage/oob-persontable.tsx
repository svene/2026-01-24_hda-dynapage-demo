import {PersonTableModel} from "./oob-person-page-model-vm";
import {OOBPersonRow} from "./oob-personrow";
import {oobPersonUrls} from "./oob-personpagerouting";

export const OOBPersonTable = (props: { vm: PersonTableModel }) => (
	<div id="result-table">
		<table class="table">
			<thead>
			<tr>
				<td colSpan={5}>
					<form
						id="bulkDeleteForm"
						hx-delete={oobPersonUrls.Delete.url()}
						hx-target="#result-table"
					>
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
			{props.vm.people.map((it) => (<OOBPersonRow vm={it}/>))}
			</tbody>
		</table>
		<div>{props.vm.people.length} of total {props.vm.total}</div>

	</div>
);
