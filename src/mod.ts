
import showRepos from "../github/mod.ts";
import { getAboutMe } from "../github/service.ts";
import * as rimu from "https://deno.land/x/rimu/mod.ts";
import checkDemoFiles from "../github/demo.ts";

getAboutMe().then((bio) => {    
    const markdown = document.createElement("about-me");
    const main = document.getElementsByTagName("main");
    const fullBio = rimu.render(bio);
    let status = "show";   
    markdown.innerHTML = fullBio.slice(0, 263) + "...";
    main[0].appendChild(markdown);
     
    const button = document.createElement("a");
          button.innerHTML = status === "show" ? "[ show full bio ]" : "[ hide full bio ]";
          button.setAttribute("id", status);
    markdown.appendChild(button);

    document.getElementById(status).addEventListener("click", () => {
        if(status == "show") {
            markdown.removeChild(button);      
            markdown.innerHTML += fullBio.slice(264);
            status = "hide";
            button.innerHTML = status === "show" ? "[ show full bio ]" : "[ hide full bio ]";
            button.setAttribute("id", status);
            markdown.appendChild(button);
        } else {
            markdown.innerHTML = fullBio.slice(0, 263) + "...";
            status = "show";
            button.innerHTML = status === "show" ? "[ show full bio ]" : "[ hide full bio ]";
            button.setAttribute("id", status);
            markdown.appendChild(button) 
        }
    })

    // document.getElementById("hideBioButton").addEventListener("click", () => {  
    //     markdown.removeChild(readFullBioButton);      
    //     markdown.innerHTML = fullBio.slice(0, 263);
    //     readFullBioButton.innerHTML ="[ show full bio ]";
    //     readFullBioButton.setAttribute("id", "fullBioButton");
    //     markdown.appendChild(readFullBioButton);
    // })

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
