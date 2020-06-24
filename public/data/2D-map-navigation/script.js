"use strict";

(() => {
	const n = 50;
	const map = document.querySelector("#map");

	for(let i=0; i<n; i++){
		let x = document.createElement("div");
			x.name = "box";
			x.className = "row";

		let y = document.createElement("div");
			y.name = "box";
			y.className = "square";	

		const map = document.querySelector("#map");
			map.appendChild(x);

			for( let j = 0; j < n; j++){	
				x.appendChild(y.cloneNode(true));
			}
	}
	//For handling clicks on all of squares
	const squares = document.querySelectorAll(".square"); //I do the same at navigation script

	(() => {
		let start = -1, end = -1; //Shold comment that, it's not obviues what the minus is for?
		
		for(let i=0; i<squares.length; i++){			
			squares[i].addEventListener("click", () => {
				if(start < 0){
					squares[i].id = "start";
					start = i;					
				}else if(end < 0) {
					squares[i].id = "end";
					end = i;
					navigate(start, end)
				}
			})
		}
	})();

})();

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

function showMeTheWay(route) {
    const squares = document.querySelectorAll(".square"); //Do it in all js files, so you have to come up with something more effective :D
    route.pop();

        // route.forEach(i => {
        //     setTimeout(() => {squares[i].id = "way"}, 500)
        // });

        for(let i=0; i<route.length; i++){
            setTimeout(() => {
                squares[route[i]].id = "way";
            }, i*50)            
        };
}
