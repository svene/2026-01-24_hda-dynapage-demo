import {MpaLayout} from "../../ui/components/mpalayout";
import {HonoInfo} from "../p01oobpage/spring-hono-shared-consts";

export const InfoPage = () => (
	<MpaLayout selectedMenu={HonoInfo.PAGE_MENU_ID}>
		<div class="p-1">
			<div class="content">
				<p>This Application demonstrates the SpringBoot to Hono Architecture</p>
			</div>

		</div>
	</MpaLayout>
);
