import {PersonPageModel} from "../person-page-model-vm";
import {MpaLayout} from "../../../ui/components/mpalayout";
import {PersonTable} from "../persontable";
import {HonoEvent} from "../hono-shared-consts";

export const EvtPersonPage = (props: { vm: PersonPageModel }) => (
	<MpaLayout selectedMenu={HonoEvent.PAGE_MENU_ID}>
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
