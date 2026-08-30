function debounce(func, timeout = 1000){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

/*
if (typeof(module) !== "undefined" && module.exports) {
    module.exports = {
       debounce
    }
}
*/