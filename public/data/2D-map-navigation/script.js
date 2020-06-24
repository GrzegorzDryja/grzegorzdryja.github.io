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
