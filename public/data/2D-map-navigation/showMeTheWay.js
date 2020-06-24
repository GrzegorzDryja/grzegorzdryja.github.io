"use strict";

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