
import main from "../github/mod.ts";
import { getAboutMe } from "../github/service.ts";

main();

getAboutMe().then((bio) => {    
    const md = document.createElement('about-me');
    const main = document.getElementsByTagName("main");
    md.textContent = bio;
    main[0].appendChild(md);
})
