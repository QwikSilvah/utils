function insertDropdown(listItems = [], config = {}) {
    /*20260104

    modify the following css mutatis mutandis to hide dropdown arrow
    .options-cell span::after {
	    content: none;
    }

    listItems: Array; [
        {className: String,
        {text: String}
        } //for each item in the menu
    ]

    parent: HTML block element; selected using query selectors, default document body
    width: String; CSS value for dropdown width, default 100
    tag: String; HTML tag to contain individual dropdown items, default div
    trigger: String; HTML or Text to show or hide dropdown menu, default See More
    */

    const parent = config.parent || document.body;
    const width = config.width || "100%";
    const tag = config.tag || "div";
    const trigger = config.trigger || "See More...";

    let innerHTML = ``;

    for (let item of listItems) {
        const customClass = item.className || "";
        const openingTag = `<${tag} class='dropdown-item ${customClass}'>`;
        const closingTag = `</${tag}>`;
        const html = openingTag + item.text + closingTag;
        innerHTML += html;
    }
    
    //legacy method
    //const innerHTML = config.innerHTML || "Dropdown list goes here";
    //Add className "dropdown-item" to list/div items when defining innerHTML;
    
    //Author prefers div for most use cases
    
    parent.classList.add("dropdown");
    parent.style.display = "flex";

    const dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("dropdown-menu");
    dropdownMenu.style.width = width;

    const dropdownTrigger = document.createElement("span");
    dropdownTrigger.classList.add("dropdown-toggle");
    dropdownTrigger.setAttribute("data-bs-toggle", "dropdown");
    dropdownTrigger.innerHTML = trigger;
    
    parent.append(dropdownTrigger);
    parent.append(dropdownMenu);

    dropdownMenu.innerHTML = innerHTML;
}

