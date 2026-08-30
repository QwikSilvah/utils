function setFixedElement(element, config = {}) {
	
	/*
	TIP: use window resize event listener for responsive
    eg. setFixedElement(element, config);
        window.addEventListener("resize", () => setFixedElement(element, config));
	
	width: Number; percentage width of container to occupy, defaults to 100
	display: String; CSS display for element, defaults to "block"
	*/

    const width = parseInt(config.width) || 100; //allowing for arguments like "100%"
    const display = config.display || "block";
	//const resize = config.resize || true;

    if (element) {
      const parentWidth = element.parentElement.clientWidth;
      element.style.width = `${(parentWidth * width) / 100}px`;
      element.style.position = "fixed";
      element.style.display = display;
    }

    if (display === "flex") {
      element.style.justifyContent = element.style.alignItems = "center";
    }
}