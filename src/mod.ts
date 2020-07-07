
import showRepos from "../github/mod.ts";
import { getAboutMe } from "../github/service.ts";
import * as rimu from "https://deno.land/x/rimu/mod.ts";
import checkDemoFiles from "../github/demo.ts";

getAboutMe().then((bio) => {    
    const markdown = document.createElement("about-me");
    const main = document.getElementsByTagName("main");
    const fullBio = rimu.render(bio);   
    markdown.innerHTML = fullBio.slice(0, 263) + "...";
    main[0].appendChild(markdown);
     
    const readFullBioButton = document.createElement("a");
          readFullBioButton.innerHTML ="[ show full bio ]";
          readFullBioButton.setAttribute("id", "fullBioButton");
    markdown.appendChild(readFullBioButton);

    document.getElementById("fullBioButton").addEventListener("click", () => {  
        markdown.removeChild(readFullBioButton);      
        markdown.innerHTML += fullBio.slice(264);
        readFullBioButton.innerHTML ="[ hide full bio ]";
        readFullBioButton.setAttribute("id", "hideBioButton");
        markdown.appendChild(readFullBioButton);
        document.getElementById("hideBioButton").addEventListener("click", () => {  
            markdown.removeChild(readFullBioButton);      
            markdown.innerHTML = fullBio.slice(0, 263);
            readFullBioButton.innerHTML ="[ show full bio ]";
            readFullBioButton.setAttribute("id", "fullBioButton");
            markdown.appendChild(readFullBioButton);
        })
    })

});

showRepos().then((repos) => {
    const reposComponent = document.createElement("repos");
    const main = document.getElementsByTagName("main");
    const p = document.createElement("p");
    p.innerHTML = "Check out a few of my repos served by the github api:";
    const reposList = document.createElement("ul");

    repos.forEach((repo: any) => {               
        const li = document.createElement("li");
        const demo = checkDemoFiles(repo.name);
        const language = repo.language || "in develop"
        li.innerHTML = `<a href="${repo.html_url}">${repo.name}</a><br />Programming language: <span>${language}</span><br />Description: <i>${repo.description}</i> ${demo}`;
        reposList.appendChild(li);
    });
    reposComponent.appendChild(reposList);
    reposComponent.insertBefore(p, reposList);
    main[0].appendChild(reposComponent);
})
