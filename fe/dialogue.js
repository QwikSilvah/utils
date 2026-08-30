//Ensure bootstrap 5 or later

function showAlert(config={}) {

    /*
    target: RECOMMENDED; DOM element to contain alert
	htmlClassName: String; html class to facilitate DOM manipulation
    alertClass: RECOMMENDED; String; BootStrap utility class eg. "alert-primary", accepts "primary"
    content: String; innerHTML to render
    closeButton: Boolean; show close button, defaults to true
    width: String; CSS width of alert eg. 100%, defaults to 100%
    fade: Boolean or duration in milliseconds to fade alert box, defaults to true || 5000
    position: String; CSS positioning of alert div, defaults to "fixed"
    top: String/Number; CSS positioning of alert div from top
    bottom: String/Number; CSS positioning of alert div from bottom //needs review
    zIndex: String; CSS z-index of alert div, defaults to 5
	textAlign: String; CSS value, eg. "center", defaults to "left"	
    */
	
	//setting some defaults
	config.fade = config.fade || true;
	
    const [alertClass, content, width, fade,
        position, top, bottom, zIndex] = 
        [config.alertClass, config.content, config.width, config.fade, 
            config.position, config.top, config.bottom, config.zIndex];
    const closeButton = config.closeButton || true;            

    let arbitraryTarget;
	arbitraryTarget = document.createElement("div");
	
    const target = /*config.target || */arbitraryTarget;
    target.style.position = position || "fixed";
    target.style.zIndex = zIndex || 5;
    target.style.top = top || 0;
    if (bottom) {
        target.style.bottom = bottom;
    }

    target.classList.add("alert", "alert-bar");
    if (alertClass) {
        if (alertClass.includes("alert-")) target.classList.add(alertClass);
        else target.classList.add("alert-" + alertClass);
    }
    if (content) {
        target.innerHTML = content;
    }
    if (closeButton) {
        target.classList.add("alert-dismissible");
        target.innerHTML += ` <button class="btn-close" data-bs-dismiss="alert"></button>`;
    }
    //setting styles
    /*applyStyles(target.querySelector(".btn-close"), {
        position: "relative",
        padding: 0,
        float: "right"
    });*/
    target.style.width = width || "100%";
    target.style.marginBottom = "0px";
    target.style.display = "block";
	config.textAlign ? target.style.textAlign = config.textAlign : "";

    //setting duration
    if (fade) {
        const displayDuration = parseInt(fade) || 5000;
        window.setTimeout(() => {
            target.remove();
        }, displayDuration);
    }
	const mainDOMtarget = config.target || document.body;
	mainDOMtarget.prepend(target);
}        

function showModal(config={}) {

    /*
    type: String; dialogue type, valid inputs = "confirm", defaults to alert modal with only confirm, ok, etc button
	htmlClassName: String; html class to facilitate DOM manipulation
    accept: String; accept button innerText eg. "Yes", "Confirm", defaults to "Ok"
    reject: String; reject button innerText eg. "No", "Cancel", defaults to "Close"
    header: String; header innerHTML
    content: String; content innerHTML
    styling: Object;
        styling.header: Object;
            styling.header.background: String; BootStrap utility class eg. "bg-primary", accepts "primary"
            styling.header.color: String; CSS text-color
        styling.footer: String; BootStrap utility class eg. "bg-primary", accepts "primary", defaults to header styles
    rejectCallback: Function; function to call on reject    
    acceptCallback: Function; function to call on accept
    theme: String; eg. "light" or "dark", defaults to page defaults
    stripHeader: (NON-FUNCTIONAL) Boolean; removes modal header div, defaults to true;
    marginTop: String; CSS marginTop of modal, defaults to 30vh
    fullscreenModal: Boolean; show fullscreen modal, defaults to false; //needs review
    forceResponse: Boolean; ensures modal interaction before close, defaults to false
    dismissOnConfirm: Boolean; false can be used to keep modal (eg. to employ spinners) until modal is ready to be dismissed, 
                        defaults to true; //needs review
    */
	
	//setting some defaults
	config.acceptCallback = config.acceptCallback || defaultAcceptCallback;
	function defaultAcceptCallback() {
		//console.log(defaultAcceptCallback);
		return;
	}

    config.dismissOnConfirm = typeof(config.dismissOnConfirm) === "undefined" ? true : false;

    const [type, accept, reject, header, content, 
        styling, rejectCallback, acceptCallback, theme, stripHeader, htmlClassName] =
        [config.type, config.accept, config.reject, config.header, config.content, 
            config.styling, config.rejectCallback, config.acceptCallback, config.theme, config.stripHeader, config.htmlClassName];
    
    const styles = styling //|| {}
    //styles.footer = styles.footer || "light"
    const strip = stripHeader === false ? false : true;
    const marginTop = config.marginTop || "30vh";
    const forceResponse = config.forceResponse || false;

    clearModalHTML();

    //Modal Markup
    const modalMarkup = 
        `
            <button type="button" class="lasso-modal btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
                Open modal
            </button>    

            <!-- The Modal -->
            <div class="modal fade" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">

                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 class="modal-title">Modal Heading</h4>
                            <button type="button" class="dismiss-button btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <!-- Modal body -->
                        <div class="modal-body">
                            Modal body..
                        </div>

                        <!-- Modal footer -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        `;

    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");
	if (htmlClassName) modalContainer.classList.add(htmlClassName);
    if (theme === "light") {
        modalContainer.setAttribute("data-bs-theme", "light");
    }
    if (theme === "dark") {
        modalContainer.setAttribute("data-bs-theme", "dark");
    }
    
    modalContainer.innerHTML = modalMarkup;
    modalContainer.querySelector(".lasso-modal").style.display = "none";
    modalContainer.querySelector(".lasso-modal").style.textAlign = "center"; 
    modalContainer.querySelector("#myModal .modal-dialog").style.marginTop = marginTop;
	
	if (config.fullscreenModal) {
		modalContainer.querySelector("#myModal .modal-dialog").classList.add("modal-fullscreen");
	}

    if (forceResponse) {
        modalContainer.querySelector(".dismiss-button").remove();
        modalContainer.querySelector("#myModal").setAttribute("data-bs-keyboard", "false");
        modalContainer.querySelector("#myModal").setAttribute("data-bs-backdrop", "static");
    }
    
    document.body.append(modalContainer);
    
    if (strip) {
        //document.querySelector(".modal-container .modal-header").remove();
    }

    const modalActivateButton = document.querySelector(".lasso-modal");

    //return console.log(document.querySelector(".modal .modal-title"));

    //header
    if (document.querySelector(".modal .modal-title")) {
        document.querySelector(".modal .modal-title").innerHTML =
        `${header ? header : ""}`;
    }           

    //content
    document.querySelector(".modal .modal-body").innerHTML =
        `${content ? content : ""}`;        

    //footer
    const modalFooter = document.querySelector(".modal .modal-footer");
    modalFooter.innerHTML = "";
         
    if (type && type.toLowerCase() === "confirm") {
        modalFooter.innerHTML =
            `<button type="button" class="disassociate btn btn-secondary" data-bs-dismiss="modal">${reject ? reject : "Close"}</button>`;        
    }

    modalFooter.innerHTML +=
        `<button ${config.dismissOnConfirm ? 'type="button" class="corroborate btn btn-primary" data-bs-dismiss="modal"' : ''}>${accept ? accept : "Ok"
        }</button >`;

    if (styles) {
        const headerElement = document.querySelector(".modal .modal-header");
        const contentElement = document.querySelector(".modal .modal-body");
        const footerElement = document.querySelector(".modal .modal-footer");
        const elementArray = [headerElement, contentElement, footerElement];

        let confirmElement;
        if (document.querySelector(".corroborate")) {
            confirmElement = document.querySelector(".corroborate");
        }
        else confirmElement = document.querySelector(".disassociate");

        for (let element of elementArray) {
            for (let item of element.classList) {
                if (item.includes("bg-")) {
                    element.classList.remove(item);
                }
            }
        }

        if (styles.header) {
            if (styles.header.background) {
                const headerClass = styles.header.background.includes("bg-") ? styles.header.background : "bg-" + styles.header.background;
                headerElement.classList.add(headerClass);
            }

            if (styles.header.color) {
                headerElement.style.color = styles.header.color;
            }
        }

        if (styles.content) {
            if (styles.content.background) {
                const contentClass = styles.content.background.includes("bg-") ? styles.content.background : "bg-" + styles.content.background;
                contentElement.classList.add(contentClass);
            }

            //insert content text style option

            if (styles.footer) {
                const footerClass = styles.footer.includes("bg-") ? styles.footer : "bg-" + styles.footer;
                footerElement.classList.add(footerClass);
            }
        }

        if (!styles.confirm) {
            styles.confirm = styles.header.background;
        }
        if (confirmElement && styles.confirm) {
            const confirmClass = styles.confirm.includes("btn-") ? styles.confirm : "btn-" + styles.confirm;

            for (let item of confirmElement.classList) {
                if (item.includes("btn-")) {
                    confirmElement.classList.remove(item);
                }
            }

            confirmElement.classList.add(confirmClass);
        }
    }

    modalActivateButton.click();

    //const button //review

    if (rejectCallback && document.querySelector(".disassociate")) {
        document.querySelector(".disassociate").addEventListener("click", activateCallback, false);
		function activateCallback() {
			//rejectCallback();
			clearModalHTML();
			rejectCallback()
		}
    }

    if (acceptCallback && document.querySelector(".corroborate")) {
        document.querySelector(".corroborate").addEventListener("click", activateCallback, false);
		function activateCallback() {
			//acceptCallback();
			clearModalHTML();
			acceptCallback();
		}
    }
}

/*function clearAlertHTML() {
	const alerts = document.querySelectorAll(".alert-bar");
	for (let alert of alerts) {
		alert.remove();
	}
}*/

function clearModalHTML() {
	const [oldModalContainers, modalBackdrops] = 
        [document.querySelectorAll(".modal-container"), document.querySelectorAll(".modal-backdrop")];

    if (oldModalContainers.length) {
        for (container of oldModalContainers) container.remove();
    }

    if (modalBackdrops.length) {
        for (backdrop of modalBackdrops) backdrop.remove();
    }
}
