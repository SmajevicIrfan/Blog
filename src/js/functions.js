(function() {
	var activeLink = document.querySelector("li.active");
	var previousLink = activeLink.previousSibling;
	if (previousLink != undefined)
		previousLink.setAttribute("class", "header-link no-divider");
	
	var headerLinks = document.querySelectorAll("li.header-link");
	
	for (var i = 0; i < headerLinks.length; i++) {
		headerLinks[i].addEventListener("mouseover", function() {
			if (this.previousSibling != undefined)
				this.previousSibling.setAttribute("class", this.previousSibling.getAttribute("class") + " no-divider");
		});
		
		headerLinks[i].addEventListener("mouseout", function() {
			if (this.previousSibling != undefined) {
				var classes = this.previousSibling.getAttribute("class").split(" ");
				var classAttr = "";
				for (var j = 0; j < classes.length - 1; j++) {
					if (j !== 0)
						classAttr += " ";
						
					classAttr += classes[j];
				}
				
				this.previousSibling.setAttribute("class", classAttr);
			}
		});
	}
	
	var mobileNavBtn = document.querySelector("#mobile-nav-toggle");
	var mobileNav 	 = document.querySelector("#mobile-nav");
	mobileNavBtn.addEventListener("click", function() {
		if (mobileNav.getAttribute("class") == null)
			mobileNav.setAttribute("class", "is-opened");
		else
			mobileNav.removeAttribute("class");
	});
	
})();