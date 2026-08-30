function applyOverlay(styles = {}, affectPointerEvents = false) {
    
	/*
	styles: Object; accepts properties>
		styles.height: String; css height, default "100vh";
		styles.width: String; css width, default "100vw";
		styles.position: String; css position, default "fixed";
		styles.top: String/Number; css top, default 0;
		styles.left: String/Number; css left, default 0;
		styles.opacity: Number; css opacity, default 0.5;
		styles.backgroundColor = String; css background-color, default "grey";
		styles.zIndex = Number; css z-index, default 100;
	*/
	
	//disabling buttons
	const buttons = document.querySelectorAll("button");
	buttons.forEach((button) => {
		button.disabled = true;
	});
	
    const redundantOverlays = document.querySelectorAll("[data-qs-overlay='overlay']");

    if (redundantOverlays.length) {
        for (let item of redundantOverlays)
        {
            item.remove();
        }
    }

    const applyOverlayStyles = typeof(applyStyles) === "function" ? applyStyles : ((target, config = {}) => {
            const entries = Object.entries(config);
        
            if (!entries.length) {
                return;
            }
        
            for (let entry of entries) {        
                target.style[entry[0]] = entry[1];
            }
        });    

    styles.height = styles.height || "100vh";
    styles.width = styles.width || "100vw";
    styles.position = styles.position || "fixed";
    styles.top = styles.top || 0;
    styles.left = styles.left || 0;
    styles.opacity = styles.opacity || 0.5;
    styles.backgroundColor = styles.backgroundColor || "grey";
    styles.zIndex = styles.zIndex || 5000;

    const overlay = document.createElement("div");
    overlay.setAttribute("data-qs-overlay", "overlay");

    if (affectPointerEvents) {
        document.body.style.pointerEvents = "none";
    }

    document.body.append(overlay);
    applyOverlayStyles(overlay, styles);
}

function clearOverlay() {    
    const overlay = document.querySelector("[data-qs-overlay='overlay']");
    if (overlay) {
        overlay.remove();
    }

    document.body.style.pointerEvents = "auto";
	
	//enabling buttons
	const buttons = document.querySelectorAll("button");
	buttons.forEach((button) => {
		button.disabled = false;
	});
}