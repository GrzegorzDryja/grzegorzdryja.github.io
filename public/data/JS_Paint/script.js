var canvas;
var lastInterval;
var isdown = false;
var brushColor ="#000000";

window.addEventListener("load", function(){
    canvas = document.getElementById("board");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});    
function clearCanvas(){
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);    
};
/* moja pierwsza działajaca funkcjonalność :)
Zrobić to na funkcji switch, element pobieram jako DIV z grupy, a brushColor dziedziczy po kolorze pyrzpisanym z mainCSS
 */
function pickColor1(){
document.getElementById("colorPicker1").addEventListener("click", function (){
    brushColor = "#44AA22";
    return brushColor;
});
}
function pickColor2(){
document.getElementById("colorPicker2").addEventListener("click", function (){
    brushColor = "#00AAEE";
    return brushColor;
});
}
function mouseDown(event){
        isdown=true;
    }
function mouseUp(event){
        isdown=false;
    }
function mouseMove(event){
        if (isdown){
            var ctx=canvas.getContext("2d");
            var canvasBounds = canvas.getBoundingClientRect();
            var x = event.clientX-canvasBounds.left;
            var y = event.clientY-canvasBounds.top;
            ctx.fillStyle = brushColor;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2*Math.PI);
            ctx.fill();
        }
}
 