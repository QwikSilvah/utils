function updateLocalStorage(parameter, value) {
    const w = w || window;
    const storage = JSON.parse(w.localStorage.storage);
    storage[parameter] = value;
    w.localStorage.setItem("storage", JSON.stringify(storage));
}
  
function readLocalStorage(parameter) {
    return JSON.parse(w.localStorage.storage)[parameter];
}

module.exports = { updateLocalStorage, readLocalStorage};