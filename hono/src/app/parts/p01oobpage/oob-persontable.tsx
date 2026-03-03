import {PersonTableModel} from "./oob-person-page-model-vm";
import {OOBPersonRow} from "./oob-personrow";
import {OOBHonoWebApiConsts} from "./oob-hono-web-api-shared-consts";
import {HonoWebApiConsts} from "../p00shared/hono-web-api-shared-consts";

export const OOBPersonTable = (props: { vm: PersonTableModel }) => (
	<div id="result-table">
		<table className="table">
			<thead>
			<tr>
				<td colSpan={5}>
					<form
						id="bulkDeleteForm"
						hx-delete={OOBHonoWebApiConsts.BASE + HonoWebApiConsts.DELETE}
						hx-target="#result-table"
					>
						<button type="submit" className="button">
							<span className="icon"><i className="material-icons">delete</i></span>
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
