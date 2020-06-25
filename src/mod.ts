
import showRepos from "../github/mod.ts";
import { getAboutMe } from "../github/service.ts";
import * as rimu from "https://deno.land/x/rimu/mod.ts";
import demo from "../repos/demo.ts";

getAboutMe().then((bio) => {    
    const md = document.createElement('about-me');
    const main = document.getElementsByTagName("main");
    md.innerHTML = rimu.render(bio);
    main[0].appendChild(md);
});

showRepos().then((repos) => {
    const reposComponent = document.createElement('repos');
    const main = document.getElementsByTagName("main");
    const p = document.createElement("p");
    p.innerHTML = "Check out few of my repos served by the github api:";
    const reposList = document.createElement("ul");

    repos.forEach((repo: any) => {               
        const li = document.createElement("li");
        li.innerHTML = `<a href="${repo.html_url}">${repo.name}</a><br />Programming language: ${repo.language}<br />Description: ${repo.description} <a onclick=window.open("./data/${repo.name}/index.html")>[ demo ]</a>`;
        reposList.appendChild(li);
    });
    reposComponent.appendChild(reposList);
    reposComponent.insertBefore(p, reposList);
    main[0].appendChild(reposComponent);
})
