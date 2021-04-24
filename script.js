class GitHubRepo {
    name;
    htmlUrl;
    language;
    description;
    constructor({ name , htmlUrl , language , description  }){
        this.name = name;
        this.htmlUrl = htmlUrl;
        this.language = language;
        this.description = description;
    }
    toString() {
        return `${this.name} ${this.htmlUrl} ${this.language} ${this.description}`;
    }
}
const REPOS_URL = 'https://api.github.com/users/grzegorzdryja/repos';
const RAW_URL = 'https://raw.githubusercontent.com/GrzegorzDryja/grzegorzdryja.github.io/master/data/';
const FORBIDDEN_ROPOS = [
    'test'
];
const convert = ({ name: name1 , htmlUrl: htmlUrl1 , language: language1 , description: description1  })=>new GitHubRepo({
        name: name1,
        htmlUrl: htmlUrl1,
        language: language1,
        description: description1
    })
;
function getRepos() {
    return fetch(REPOS_URL).then((response)=>{
        if (response.ok) {
            return response.json();
        }
        throw Error('Response not 200 / something went wrong dowloading repos');
    }).then((arr)=>arr.filter((repo)=>!FORBIDDEN_ROPOS.includes(repo.name)
        ).map(convert)
    ).catch((err)=>console.warn(err)
    );
}
async function getRawFIleContent(pathToFile) {
    try {
        const response = await fetch(`${RAW_URL}${pathToFile}`);
        if (response.ok) {
            return await response.text();
        }
        throw Error('Response not 200/ bio file is not found');
    } catch (err) {
        console.log(err);
        return '';
    }
}
function getAboutMe() {
    return getRawFIleContent('about-me.md');
}
async function __default() {
    const arr = await getRepos();
    return arr;
}
// function render1(source, opts = {
// }) {
//     updateOptions(opts);
//     return render(source);
// }
// init();
getAboutMe().then((bio)=>{
    if (typeof document !== "undefined") {
        const placeHolder = document.getElementsByTagName("about-me");
        const fullBio = bio;
        const bioDomElement = document.createElement("div");
        let status = "show";
        bioDomElement.innerHTML = fullBio.slice(0, 264) + "...";
        placeHolder[0].appendChild(bioDomElement);
        const button = document.createElement("a");
        button.innerHTML = status === "show" ? "[ show full bio ]" : "[ hide full bio ]";
        button.setAttribute("id", status);
        bioDomElement.appendChild(button);
        document.getElementById(status).addEventListener("click", ()=>{
            if (status == "show") {
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
                bioDomElement.appendChild(button);
            }
        });
    }
});
__default().then((repos)=>{
    if (typeof document !== "undefined") {
        const reposComponent = document.createElement("div");
        const main = document.getElementsByTagName("repos");
        const p = document.createElement("p");
        p.innerHTML = "Check out a few of my repos served by the github api:";
        const reposList = document.createElement("ul");
        repos.forEach((repo)=>{
            const li = document.createElement("li");
            const language1 = repo.language || "in develop";
            li.innerHTML = `<a href="${repo.htmlUrl}">${repo.name}</a><br />Programming language: <span>${language1}</span><br />Description: <i>${repo.description}</i>`;
            reposList.appendChild(li);
        });
        reposComponent.appendChild(reposList);
        reposComponent.insertBefore(p, reposList);
        main[0].appendChild(reposComponent);
    }
});
