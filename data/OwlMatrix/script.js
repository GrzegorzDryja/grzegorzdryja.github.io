/* 
  Author: Grzegorz Dryja
*/
const n = 16;

(() => { //Create matrix of n
	for(let i=0;i<n;i++){
		let x = document.createElement("input");
			x.name = "box";
			x.type = "test";
			x.classList.add("matrix");
			x.maxLength= "1";
		
		let matrix = document.querySelector("div.center");	
			matrix.insertBefore(x, matrix.childNodes[0]);
	
		let j=i;
		if(j%Math.sqrt(n)==0){
			x.insertAdjacentHTML("afterend", "<br>");
		}
	}
})()

function getInput(){
	const nodeList = document.getElementsByName("box");
	let owl = [];
	nodeList.forEach(element => {
		owl.push(element.value)		
	});
return owl;
}

function isThisOwl(array){
	const m = Math.sqrt(n);
	//This check does all items from beginning and end are equals
	const diagonal = () => {
		for (let i=0, j=array.length-1; i <= j; i++, j--){				 
			if(array[i] != array[j]){
				console.log(array[i] != array[j])
				return false;
			 } 
		}
	return true;
	}
	//This build and array of rows to check if first row is symetric to last and soo on
	const horizontal = () => {
		const rows = []

		for(let i=0; i < n;){
			rows.push(array.slice(i, i+=m))
		}

		for (let i=0, j=rows.length-1; i <= j; i++, j--){
			if(!(JSON.stringify(rows[i]) === JSON.stringify(rows[j]))){
				return false;
			} 
		}
	return true;
	}	
return diagonal() && horizontal();
}

function setOutput(isIt){
	if(isIt){
		document.getElementById("result").innerHTML = "Yes, this is Owl Matrix!";
	} else {
		document.getElementById("result").innerHTML = "No, it's not.";
	}
}

function run(){
	const owl = getInput();
	const isIt = isThisOwl(owl);
	setOutput(isIt)
}
