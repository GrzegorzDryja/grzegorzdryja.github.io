"use strict";

let navigate = (start, end) => {
    const map = document.querySelectorAll(".square"); //same is made in script file
    const n=50
    const startRow = Math.floor(start/n);
    const endRow = Math.floor(end/n);
    const startColl = Math.floor(start%n);
    const endColl = Math.floor(end%n);
    const coll = endColl-startColl;
    const row = startRow-endRow;
        
        document.getElementById("result").innerHTML =
        `GPS: ${start}/${end}
        horizontal: ${coll}
        vertical: ${row}`; //Note! innerHTML makse all file parse again
        
    let route = [];

        for(let i = 0; i<Math.abs(coll); i++){
            route.push(coll>0 ? ++start : --start) //To get the right direction
        }
        for(let i = 1; i<Math.abs(row)+1; i++){
            route.push(row>0 ? start-n*i : start+n*i) //To get the right direction
        }
    showMeTheWay(route);    
}
