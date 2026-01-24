package dev.svenehrke.springboothonopoc.inbound.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.view.RedirectView;

import static dev.svenehrke.springboothonopoc.inbound.web.PeopleController.URL_DEMO_OOB_PAGE;

@Controller
public class HomeController {

	@GetMapping("/")
	public RedirectView index() {
		return new RedirectView(URL_DEMO_OOB_PAGE);
	}

}
