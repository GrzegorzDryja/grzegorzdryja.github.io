import showRepos from "../github/mod.ts";
import { getAboutMe } from "../github/service.ts";
import { render } from "https://deno.land/x/rimu@11.1.14/mod.ts";
// import checkDemoFiles from "../github/demo.ts";
import { GitHubRepo } from "../github/model.ts";

getAboutMe().then((bio) => {
  if (typeof (document) !== "undefined") {
    const placeHolder = document.getElementsByTagName("about-me");
    const fullBio = render(bio);
    const bioDomElement = document.createElement("div");
    let status = "show";   
    bioDomElement.innerHTML = fullBio.slice(0, 264) + "...";
    placeHolder[0].appendChild(bioDomElement);
      
    const button = document.createElement("a");
      button.innerHTML = status === "show" ? "[ show full bio ]" : "[ hide full bio ]";
      button.setAttribute("id", status);
    bioDomElement.appendChild(button);
  
    document.getElementById(status).addEventListener("click", () => {
      if(status == "show") {
        bioDomElement.removeChild(button);      
        bioDomElement.innerHTML += fullBio.slice(264);
        status = "hide";
        button.innerHTML = status === "show" ? "[ show full bio ]" : "[ hide full bio ]";
        button.setAttribute("id", status);
        bioDomElement.appendChild(button);
    } else {
        bioDomElement.innerHTML = fullBio.slice(0, 263) + "...";
        status = "show";
        button.innerHTML = status === "show" ? "[ show full bio ]" : "[ hide full bio ]";
        button.setAttribute("id", status);
        bioDomElement.appendChild(button) 
      }
    })
  }
});

showRepos().then((repos) => {
  if (typeof (document) !== "undefined") {
    const reposComponent = document.createElement("div");
    const main = document.getElementsByTagName("repos");
    const p = document.createElement("p");
    p.innerHTML = "Check out a few of my repos served by the github api:";
    const reposList = document.createElement("ul");
  
    repos.forEach((repo: GitHubRepo) => {               
      const li = document.createElement("li");
      // const demo = checkDemoFiles(repo.name);
      const language = repo.language || "in develop"
      li.innerHTML = `<a href="${repo.htmlUrl}">${repo.name}</a><br />Programming language: <span>${language}</span><br />Description: <i>${repo.description}</i>`;
      reposList.appendChild(li);
    });
    reposComponent.appendChild(reposList);
    reposComponent.insertBefore(p, reposList);
    main[0].appendChild(reposComponent);
 }

})
