//console.time("t");
function generateRandomNumber(min=1, max=10) {
        //console.log(`Generating random number between ${min} and ${max} inclusive...`);
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }
	
/*
function generateAlphanumericString(neededLength=32, options = {}) {
      
    options: 
    
    excludeNumbers: Boolean
    excludeSpecialCharacters: Boolean
    exclude: String or Array, list of specific characters to exclude
    

    let randomString = "";
    //let charStringLength;    
    
    //const capitalLetters = ["A", "B", "C", "D", "E", "F", "G", "H" ,"I", "J", "K" , "L" , "M", "N", "O", 
    //"P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    
	const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //console.log(capitalLetters);
    const alphabet = capitalLetters + capitalLetters.toLowerCase();
    //console.log(alphabet.length);
    
    let charString = alphabet;
    
    if (!options.excludeNumbers) {
        const numbers = [];
        for (let i=1; i<10; i++) {
            numbers.push(i);            
        }
        numbers.push(0);
        charString += numbers.join("");
    }

    if (!options.excludeSpecialCharacters) {
        charString += "_-"; //base 64
    }
    //console.log(alphanumeric);
    //console.log(alphanumeric.length);

     if (options.exclude) {
        const charArray = charString.split("");
        console.log(charArray);
        console.log(options.exclude);
        for (let char of charArray) {
            if (options.exclude.includes(char)) {
                console.log(char);
                const charIndex = charArray.indexOf(char);
                charArray.splice(charIndex, 1);
            }
        }
        charString = charArray.join("");
    }

    console.log(charString);

    const maxIndex = charString.length-1;

    for (let i=0; i<neededLength; i++) {
        randomString += charString[generateRandomNumber(0,maxIndex)];
    }

   
    //testing presence of all possible characters
    //const alphanumericArray = alphanumeric.split();
    let absentLetters = [];
    for (const character of charString) {
        if (!randomString.includes(character)) {
            absentLetters.push(character);
        }
    }
    console.log(absentLetters.length < 1, 
	absentLetters, 
	`${absentLetters.length} missing character${absentLetters.length !== 1? "s" : ""}`);

    return randomString;
}

//generateAlphanumericString(200);
//console.timeEnd("t");

//module.exports = { generateRandomNumber, generateAlphanumericString };

*/

/*function generateAlphanumericString(neededLength = 32, options = {}) {
    const caps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const special = "_-";

    let charString = "";

    if (!options.excludeUpperCase) charString += caps;
    if (!options.excludeLowerCase) charString += lower;
    if (!options.excludeNumbers) charString += nums;
    if (!options.excludeSpecialCharacters) charString += special;

    if (options.exclude) {
        const excludeSet = new Set(options.exclude);
        charString = charString
            .split("")
            .filter(c => !excludeSet.has(c))
            .join("");
    }

    if (charString.length === 0) return "";

    
    //const result = new Array(neededLength);
    //for (let i = 0; i < neededLength; i++) {
    //    const randomIndex = Math.floor(Math.random() * charString.length);
    //    result[i] = charString[randomIndex];
    //}

    //return result.join("");
    

    const randomValues = new Uint32Array(neededLength);
    crypto.getRandomValues(randomValues);

    let result = "";
    for (let i = 0; i < neededLength; i++) {
        result += charString[randomValues[i] % charString.length];
    }

    return result;
}
*/

function generateAlphanumericString(requiredLength = 32, options = {}) {

    /*OPTIONS
    excludeUpperCase: Boolean,
    excludeLowerCase: Boolean,
    excludeNumbers: Boolean,
    excludeSpecialCharacters: Boolean,
    exclude: String of specific characters to exclude eg. "0oOIl1"
    */

    const caps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const special = "_-";

    let charString = "";
    if (!options.excludeUpperCase) charString += caps;
    if (!options.excludeLowerCase) charString += lower;
    if (!options.excludeNumbers) charString += nums;
    if (!options.excludeSpecialCharacters) charString += special;

    if (options.exclude) {
        const excludeSet = new Set(options.exclude);
        charString = Array.from(charString).filter(c => !excludeSet.has(c)).join("");
    }

    if (charString.length === 0) return "";

    // 1. Determine the best available crypto source
    // In 2026, globalThis.crypto works in Node 19+ and modern browsers.
    const cryptoSource = typeof globalThis !== 'undefined' && globalThis.crypto 
                         ? globalThis.crypto 
                         : (typeof window !== 'undefined' ? window.crypto : null);

    const result = new Array(requiredLength);

    if (cryptoSource && cryptoSource.getRandomValues) {
        // Secure path (Production/Modern Node & Browser)
        const randomValues = new Uint32Array(requiredLength);
        cryptoSource.getRandomValues(randomValues);
        for (let i = 0; i < requiredLength; i++) {
            result[i] = charString[randomValues[i] % charString.length];
        }
    } else {
        // Fallback path (Dev/Insecure contexts/Legacy Node)
        console.warn("Secure crypto not found; falling back to Math.random()");
        for (let i = 0; i < requiredLength; i++) {
            const randomIndex = Math.floor(Math.random() * charString.length);
            result[i] = charString[randomIndex];
        }
    }

    return result.join("");
}

if (typeof(module) !== "undefined" && module.exports) {
    module.exports = {
        generateRandomNumber,
        generateAlphanumericString
    }
}

