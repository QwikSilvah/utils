function updateLocalStorage(parameter, value) {
    if (!window.localStorage.storage) {
		//window.localStorage.storage = {};
	}
    const storage = JSON.parse(window.localStorage.storage);
    storage[parameter] = value;
    window.localStorage.setItem("storage", JSON.stringify(storage));
}
  
function readLocalStorage(parameter) {
    return JSON.parse(window.localStorage.storage)[parameter];
}

function updateSessionStorage(parameter, value) {
    const storage = JSON.parse(window.sessionStorage.storage);
    storage[parameter] = value;
    window.sessionStorage.setItem("storage", JSON.stringify(storage));
}
  
function readSessionStorage(parameter) {
    return JSON.parse(window.sessionStorage.storage)[parameter];
}