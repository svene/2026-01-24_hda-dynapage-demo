import type {Child} from 'hono/jsx'
import {EvtHonoWebApiConsts} from "../parts/p02evtpage/evt-hono-web-api-shared-consts";
import {OOBHonoWebApiConsts} from "../parts/p01oobpage/oob-hono-web-api-shared-consts";
import {InfoHonoWebApiConsts} from "../parts/p09info/info-hono-web-api-shared-consts";
import {HonoWebApiConsts} from "../parts/p00shared/hono-web-api-shared-consts";

export const MpaLayout = (props: {selectedMenu: string, children: Child }) => (
	<html lang="en" x-data="$store.darkMode" x-bind:data-theme="theme">
	<head>
		<meta charSet="UTF-8"/>
		<title>People Admin Application</title>
		<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎯</text></svg>"/>
		<script src="/static/js/htmx.org/2.0.8/htmx.js"></script>
		<script src="/static/js/htmx.org/extensions/path-params.js"></script>
		<script src="/static/js/hyperscript.org/0.9.14/_hyperscript.js"></script>
		<script defer src="/static/js/mpa.js"></script>
		<script defer src="/static/js/alpinejs/3.15.4/cdn.min.js"></script>
		<link rel="stylesheet" href="/static/css/bulma.min.css"/>
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
		<script>
			//htmx.logAll();
		</script>
	</head>

	<body
		hx-ext="path-params"
		hx-on:close-details-requested="console.log('close-details-requested evt received in body. id: ', event?.detail?.id)"
	>
	<section class="hero is-link">
		<div class="hero-body">
			<nav class="level">
				<div class="level-left">
					<p class="title">People Admin Application</p>
				</div>
				<div class="level-right">
					<button x-on:click="$store.darkMode.toggle()">
						<span class="icon"><i class="material-icons" x-text="icon"></i></span>
					</button>
				</div>
			</nav>
		</div>
	</section>

	<div class="container mt-1">
		<nav class="navbar" role="navigation" aria-label="main navigation">
			<div class="navbar-menu">
				<div class="navbar-start">
					<a
						class={`navbar-item ${props.selectedMenu === OOBHonoWebApiConsts.PAGE_MENU_ID ? 'is-selected' : ''}`}
						href={OOBHonoWebApiConsts.BASE + HonoWebApiConsts.PAGE}
					>OOB Variant</a>
					<a
						class={`navbar-item ${props.selectedMenu === EvtHonoWebApiConsts.PAGE_MENU_ID ? 'is-selected' : ''}`}
						href={EvtHonoWebApiConsts.BASE + HonoWebApiConsts.PAGE}
					>Events Variant</a>
					<a
						class={`navbar-item ${props.selectedMenu === InfoHonoWebApiConsts.PAGE_MENU_ID ? 'is-selected' : ''}`}
						href={InfoHonoWebApiConsts.PAGE}
					>Info</a>
				</div>
			</div>
		</nav>

		<div class="p-1 mt-1" style="min-height: 500px">
			{props.children}
		</div>

		<hr/>

	</div>


	</body>
	</html>
);

