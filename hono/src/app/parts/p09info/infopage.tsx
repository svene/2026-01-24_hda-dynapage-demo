import { MpaLayout } from "../../root/mpalayout";
import {HonoInfo} from "./info-hono-web-api-shared-consts";

export const InfoPage = () => (
	<MpaLayout selectedMenu={HonoInfo.PAGE_MENU_ID}>
		<div class="p-1">
			<div class="content">
				<p>This Application demonstrates the SpringBoot to Hono Architecture</p>
			</div>

		</div>
	</MpaLayout>
);
