"use strict";

//Create and add intro to index.hmtl file
let p = document.getElementById("intro");
let r = document.getElementById("result");

let intro = document.createTextNode(
`Type bellow few words and hit enter.
The result of this program will highlight the longest common
substring (2 letters and more) occuring in all words.`
);

p.appendChild(intro);

//Input handling from text div
let inputDiv = document.getElementById("text");

inputDiv.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        e. preventDefault();
        let substring = longestCommonSubstring(inputDiv.innerHTML);
        inputDiv.innerHTML = highlightSubstring(inputDiv.innerHTML, substring);        
    }
});

let longestCommonSubstring = function(inputText){
    let splitedInputTextArray = inputText.split(" ");
    //Get the shortes word from text
    splitedInputTextArray.sort((a,b) => a.length - b.length); 

    //Array to work on every substring from shortes word
    let _substringsArray = [];
    //This set will contain shortes word substring every trimed form left and right
    const substrings = new Set();
    let results = [];

    //Add sliced substrings from first shortes word
    var shortWordFromLeft = function(word){ 
        let y = word.length; 
            for (let i = word.length; i >= 2; i--){            
                let x = word.slice(-y);
                _substringsArray.push(x);//Try later add here shortWordFromRight function
                --y;
            };
    };

    //Add sliced substrings of substrings shortes word array to set
    var shortWordFromRight = function(word){
            for (let i = word.length; i >= 2; i--){            
                let x = word.slice(0, i);
                substrings.add(x);
            };    
    }

    //To bring up the above
    shortWordFromLeft(splitedInputTextArray[0].toLowerCase());

    for (const i of _substringsArray) {
        shortWordFromRight(i);
    }

    //Checking if all of each other substrings got his match in every word from text
    for (const x of substrings) {
            (function(word){
                    let y = 0;
                    let z = splitedInputTextArray.length;
                    for (let i=1; i < splitedInputTextArray.length; i++){
                        if(splitedInputTextArray[i].includes(word)){
                            y++;
                        };
                        if(y>=--z && splitedInputTextArray[i].includes(word)){
                            results.push(word);
                        }
                    }
                }
            )(x);
    };
    //Make results list sorted by lenght of string and then in ABC order
    results.sort((a,b) => b.length - a.length || a.localeCompare(b));

    return results[0];
}

let highlightSubstring = function(text, substring){
    let splitedString = text.split(" "); //I know, I'm make it twice!
    let highlightText = "";

    for (const i of splitedString) {       
        let x = i.indexOf(substring);
        let y = substring.length;
        let mark = i.slice(x, y+x);  
        highlightText += `${i.slice(0, x)}<mark>${mark}</mark>${i.slice(y+x, i.length)} `;        
    }       

    return highlightText;
}
