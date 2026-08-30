function applySpinner (config = {}) {
	
	/*
	Requires overlay func for full page spinner functionality
	Exclude config.target for full page spinner

	target: DOM element to contain spinner, default body
	size: String; ACCEPTABLE VALUE(S)> "small", "sm"
	spinnerClass: String; Bootstrap utility classes, DEFAULT> "text-primary"
	*/
	
	//clearing redundant spinner(s)
	clearFullPageSpinner();
	
	config.target = config.target || "body";
	let spinnerSmall = config.size === "small" || config.size === "sm" ? "spinner-border-sm" : "";
	//console.log(spinnerSmall);
	const spinnerClass = config.spinnerClass ? config.spinnerClass : "text-primary";
	
	const spinnerHTML = `<div class="justify-content-center"><div class="spinner-border ${spinnerSmall} ${spinnerClass}" role="status" data-qs-spinner="spinner">
	  <span class="visually-hidden">Loading...</span>
		</div></div>`;
	
	if (config.target === "body") {
		applyOverlay();
		
		let spinnerContainer = document.createElement("div");
		spinnerContainer.innerHTML = spinnerHTML;
		
		//document.body.appendChild(spinnerContainer);
		//spinnerContainer = document.querySelector("[data-qs-spinner = 'spinner']").parentElement;
		//console.log(spinnerContainer);
		spinnerContainer.style.position = "fixed";
		spinnerContainer.style.zIndex = 10000;
		spinnerContainer.style.top = 0;
		spinnerContainer.style.left = 0;
		spinnerContainer.style.height = "100vh";
		spinnerContainer.style.width = "100vw";
		
		const spinner = spinnerContainer.querySelector("[data-qs-spinner = 'spinner']");
		
		spinner.style.marginTop = "45vh";
		spinner.style.marginLeft = "45vw";
		
		spinnerContainer.classList.add("full-page-spinner");
		
		document.body.appendChild(spinnerContainer);
		
		//return;
	}
	else {
		config.target.innerHTML = spinnerHTML;
	}	
}

function clearFullPageSpinner() {
	const redundantSpinners = document.querySelectorAll(".full-page-spinner");
	if (redundantSpinners.length) {
		for (let spinner of redundantSpinners) {
			spinner.remove();
		}
	}
	if (clearOverlay) clearOverlay();
}
