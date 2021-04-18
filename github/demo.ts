export default async function checkDemoFiles(name: string){
  const url = `./data/${name}/index.html`;

  try {
    const xhr = await fetch(
        url,
        {
            method: 'HEAD',
            cache: 'no-cache'
        }
    );
    return xhr.status === 200? `<a onclick=window.open("./data/${name}/index.html")>[ demo ]</a>`:''

  } catch(error) {
    console.log(error)
    return false;
  }
}
