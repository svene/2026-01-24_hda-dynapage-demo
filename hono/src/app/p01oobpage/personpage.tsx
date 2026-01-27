import {OOBPersonPageModel} from "./oob-person-page-model-vm";
import {MpaLayout} from "../../ui/components/mpalayout";
import {PersonTable} from "./persontable";
import {OOBConsts} from "./oob-consts";

export const PersonPage = (props: { vm: OOBPersonPageModel }) => (
	<MpaLayout selectedMenu={OOBConsts.PAGE_MENU_ID}>
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
			<PersonTable vm={props.vm.table}></PersonTable>
		</>
	</MpaLayout>
);
