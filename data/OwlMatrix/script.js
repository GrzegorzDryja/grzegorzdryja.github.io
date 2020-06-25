/* 
    Author: Grzegorz Dryja
*/
let n = 16;

for(var i=0;i<n;i++){

	var x = document.createElement("input");
		x.name = "box";
		x.type = "test";
		x.class = "matrix"; //Czemu to nie działa? Czyżby do imput nie można było przypisać class?
		x.maxLength= "1";
	
	var matrix = document.querySelector("div.center");	
	matrix.insertBefore(x, matrix.childNodes[0]);

	var j=i;
	if(j%Math.sqrt(n)==0){x.insertAdjacentHTML("afterend", "<br>");}
}

function isThisOwl() {
	var owlMatrix, max, row, diagonal, inRow, firstHalfArray, secondHalfArray, horizontalCheckArray;

	owlMatrix = document.getElementsByName("box");    
	max = owlMatrix.length;
	row = Math.sqrt(max);
	diagonal = [];
	inRow = [];
	firstHalfArray = [];
	secondHalfArray = [];
	horizontalCheckArray = [];

	diagonalCheck(max, owlMatrix, diagonal);
	horizontalCheck(row, owlMatrix, inRow, max, firstHalfArray, secondHalfArray, horizontalCheckArray);
	owlCheck(diagonal, inRow);
}

function isSymmetric(boxes) {
    return boxes === true;
}

//This function check if the first an the last element with appropriate increment is the same in array

function diagonalCheck(max, owlMatrix, diagonal){
   for (var i=0, j=max-1; i <= j; i++, j--){
        diagonal.push(owlMatrix[i].value === owlMatrix[j].value);
    }
}

// Those function cheks if the first box in first row is the same as first box in fourth row, and so on.
// But first it get first half array and then second. Second half array must be listed from last row.
function horizontalCheck(row, owlMatrix, inRow, max, firstHalfArray, secondHalfArray, horizontalCheckArray){

    firstHalfItems(max, owlMatrix, firstHalfArray);
    secondHalfItems(row, max, owlMatrix, secondHalfArray);
    sprawdzKolejnyOdKonca(row, max, owlMatrix, secondHalfArray);
    zbudujTabliceSprawdzajacaWierszami(max, horizontalCheckArray, firstHalfArray, secondHalfArray);
}

function firstHalfItems(max, owlMatrix, firstHalfArray){
	for(var i=0; i<max/2; i++){
		firstHalfArray.push(owlMatrix[i].value);
	}
	return firstHalfArray;	
}

function secondHalfItems(row, max, owlMatrix, secondHalfArray){
	for(var i=max-row; i<max; i++){
			secondHalfArray.push(owlMatrix[i].value);
	}
	return secondHalfArray;
}

function sprawdzKolejnyOdKonca(row, max, owlMatrix, secondHalfArray){
		max = max - row;

		for(var i=max-row; i<max; i++){
			secondHalfArray.push(owlMatrix[i].value);
	}
	return secondHalfArray;
}

function zbudujTabliceSprawdzajacaWierszami(max, horizontalCheckArray, firstHalfArray, secondHalfArray){
	for (var i=0; i<max/2; i++){
    	horizontalCheckArray.push(firstHalfArray[i] === secondHalfArray[i]);
    }

    return horizontalCheckArray;
}

function owlCheck(diagonal, inRow){
	if(diagonal.every(isSymmetric) && inRow.every(isSymmetric)){
        document.getElementById("result").innerHTML = "Yes, this is Owl Matrix!";
    }
    else{
        document.getElementById("result").innerHTML = "No, it's not.";        
    }
}
