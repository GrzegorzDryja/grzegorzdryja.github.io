/* 
    Author: Grzegorz Dryja
*/

window.onload = function(){

    var leftBoxInput = document.getElementById("leftBox");
    var counter = document.getElementById("counter")
    leftBoxInput.addEventListener("keyup", function(e){counter.innerHTML = this.value.length + "/256";});
}

function encryptIt(ch)
{   
    let abc = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ".split('');
    
    function isLetter(str) {
        return str.length === 1 && str.match(/[a-z,A-Z]/i);
      }

    if (isLetter(ch))
    { 
        var i = abc.indexOf(ch);        
        return(abc[abc.length-i-1]);
    }
    else
    {
       return ch;
    }
}

function clickButton(){
    var codedText = "";
    var leftText = document.getElementById("leftBox").value;      
    var leftBoxCharArr = leftText.split('');
    leftBoxCharArr.forEach(i => codedText += encryptIt(i));
    document.getElementById("rightBox").value = codedText;    
}
