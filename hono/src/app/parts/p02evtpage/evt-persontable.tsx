import {EvtPersonRow} from "./evt-personrow";
import {EvtHonoWebApiConsts} from "./evt-hono-web-api-shared-consts";
import {OOBPersonTableModel} from "../p01oobpage/oob-person-page-model-vm";

export const EvtPersonTable = (props: { vm: OOBPersonTableModel }) => (
	<div id="result-table">
		<table className="table">
			<thead>
			<tr>
				<td colSpan={5}>
					<form id="bulkDeleteForm" hx-delete={EvtHonoWebApiConsts.DELETE}>
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
			{props.vm.people.map((it) => (<EvtPersonRow vm={it}/>))}
			</tbody>
		</table>
		<div>{props.vm.people.length} of total {props.vm.total}</div>

	</div>
);
