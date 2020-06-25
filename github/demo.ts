export default function checkDemoFiles(name: string){

    const url: string = `./data/${name}/index.html`;

        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', url, false);
        xhr.send();
         
        if (
            xhr.status == 404) {
            return ``;
        } else {
            return `<a onclick=window.open("./data/${name}/index.html")>[ demo ]</a>`;
        }
}
