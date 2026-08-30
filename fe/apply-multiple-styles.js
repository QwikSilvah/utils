function applyStyles(target, config = {}) {
    const entries = Object.entries(config);

    if (!entries.length) {
        return;
    }

    for (let entry of entries) {        
        target.style[entry[0]] = entry[1];
    }
}