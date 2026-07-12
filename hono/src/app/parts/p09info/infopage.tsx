import { MpaLayout } from "../../root/mpalayout";
import {infoRoutes} from "./info-routing";

export const InfoPage = () => (
	<MpaLayout selectedMenu={infoRoutes.InfoPage.id}>
		<div class="p-1">
			<div class="content">
				<p>This Application demonstrates the SpringBoot to Hono Architecture</p>
			</div>

		</div>
	</MpaLayout>
);
