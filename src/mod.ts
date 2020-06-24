
// import showRepos from "../github/mod.ts";
import { getAboutMe } from "../github/service.ts";
import * as rimu from "https://deno.land/x/rimu/mod.ts";
import demo from "../repos/demo.ts";

getAboutMe().then((bio) => {    
    const md = document.createElement('about-me');
    const main = document.getElementsByTagName("main");
    md.innerHTML = rimu.render(bio);
    main[0].appendChild(md);
});

window.onload = function buttonClick() {
    const button = document.getElementById("demo");
        button.addEventListener("click", (e:Event) => demo());
};
// showRepos().then((repos) => {
//     const reposComponent = document.createElement('repos');
//     const main = document.getElementsByTagName("main");
//     const p = document.createElement("p");
//     p.innerHTML = "Check out few of my filtered github repos serverd by the github api:";
//     const reposList = document.createElement("ul");

//     repos.forEach((repo: any) => {               
//         const li = document.createElement("li");
//         const tryit = demo();
//         li.innerHTML = `<a onclick=${tryit}>${repo.name}</a><br />Programming language: ${repo.language}<br />Description: ${repo.description} [ demo ]`;
//         reposList.appendChild(li);
//     });
//     reposComponent.appendChild(reposList);
//     reposComponent.insertBefore(p, reposList);
//     main[0].appendChild(reposComponent);
// })
