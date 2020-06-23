import getRepos from './service.ts';

export default async function() {
  const arr = await getRepos();
  arr.forEach((repo: {
    name: string,
    html_url: string,
    language: string,
    description: string
  }) => {
    console.log(
      repo.name + "/" +
      repo.html_url + "/" +
      repo.language + "/" +
      repo.description);
    });

  //(await getRepos()).forEach((r: any) => console.log(r["name"]))
}
