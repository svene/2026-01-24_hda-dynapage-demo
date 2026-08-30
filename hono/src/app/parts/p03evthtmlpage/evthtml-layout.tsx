import {oobPersonRoutes} from "../p01oobpage/oob-person-page-routing";
import {evtPersonRoutes} from "../p02evtpage/evt-person-page-routing";
import {infoRoutes} from "../p09info/info-routing";
import {evtHtmlPersonRoutes} from "./evthtml-person-page-routing";
import {HtmlResult, PageId} from "../p00shared/app-types";
import {html} from "hono/html";

export const EvtHtmlLayout = (selectedMenu: PageId, content: HtmlResult): HtmlResult => (
	html`
	<html lang="en" x-data="$store.darkMode" x-bind:data-theme="theme">
	<head>
		<meta charSet="UTF-8"/>
		<title>People Admin Application</title>
		<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎯</text></svg>"/>
		<script src="/static/js/htmx.org/4.0.0/htmx.js"></script>
		<script src="/static/js/hyperscript.org/0.9.93/_hyperscript.js"></script>
		<script defer src="/static/js/mpa.js"></script>
		<script defer src="/static/js/alpinejs/3.16.3/cdn.min.js"></script>
		<link rel="stylesheet" href="/static/css/bulma.min.css"/>
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
		<script>
			//htmx.logAll();
		</script>
	</head>

	<body hx-ext="path-params">
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
						class="navbar-item ${selectedMenu === 'OOB_PAGE_ID' ? 'is-selected' : ''}"
						href="${oobPersonRoutes.OOBPersonPage.url()}"
					>OOB Variant</a>
					<a
						class="navbar-item ${selectedMenu === 'EVT_PAGE_ID' ? 'is-selected' : ''}"
						href="${evtPersonRoutes.EvtPersonPage.url()}"
					>Events Variant</a>
					<a
						class="navbar-item ${selectedMenu === 'EVT_HTML_PAGE_ID' ? 'is-selected' : ''}"
						href="${evtHtmlPersonRoutes.EvtHtmlPersonPage.url()}"
					>Events HTML Variant</a>
					<a
						class="navbar-item ${selectedMenu === 'INFO_PAGE_ID' ? 'is-selected' : ''}"
						href="${infoRoutes.InfoPage.url()}"
					>Info</a>
				</div>
			</div>
		</nav>

		<div class="p-1 mt-1" style="min-height: 500px">
			${content}
		</div>

		<hr/>

	</div>


	</body>
	</html>
`);
