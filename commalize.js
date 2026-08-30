//sandbox

function commalize(arg) {
	if (!Number(arg)) throw Error();
	const number = Number(arg);
    let finalArr = [];
    const numArr = number.toString().split("");
    numArr.reverse();
    //console.log(numArr);
    numArr.forEach((num, index, numArr) => {
        if (index > 1 && index % 3 === 0) finalArr.push(",");
        finalArr.push(num);
        //console.log(finalArr);        
    });
    return finalArr.reverse().join("");
}

function wordify(arg) {
	//incomplete
	const arrayfiedAmount = arg.split(",");
	arrayfiedAmount.reverse();
	let string = "";
	if (!Number(arrayfiedAmount.join("")) throw Error();
	arrayfiedAmount.forEach(resolveWords);
	function resolveWords(item, index, array) {
		const arrayfiedBlock = item.split("");
		
	}
	switch(arrayfiedAmount.length) {
		case 3: {
			string += 
			break;
		}
		case 2: {
			break;
		}
		case 1: {
			break;
		}
	}
}