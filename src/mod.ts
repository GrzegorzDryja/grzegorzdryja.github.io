
import showRepos from "../github/mod.ts";
import { getAboutMe } from "../github/service.ts";

getAboutMe().then((bio) => {    
    const md = document.createElement('about-me');
    const main = document.getElementsByTagName("main");
    md.textContent = bio;
    main[0].appendChild(md);
});

showRepos() //.then((repos) => console.log(repos)); //undefinded, 'Promise<void>

// then(() => {    
//     const gh = document.createElement('repos');
//     const main = document.getElementsByTagName("main");
//     gh.textContent = getRepos();
//     main[0].appendChild(gh);
// })
