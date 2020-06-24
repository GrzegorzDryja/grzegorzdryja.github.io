import getRepos from './service.ts';

export default async function() {
  const arr = await getRepos();
  arr.forEach((repo: {
    name: string,
    html_url: string,
    language: string,
    description: string
  }) => {
    const gh = document.createElement('repos');
    const main = document.getElementsByTagName("main");
    gh.textContent = repo.name + "/" + repo.html_url + "/" + repo.language + "/" + repo.description;
    main[0].appendChild(gh);
  });

  //(await getRepos()).forEach((r: any) => console.log(r["name"]))
}
