import { GitHubRepo } from './model.ts';

const REPOS_URL = 'https://api.github.com/users/grzegorzdryja/repos';
const RAW_URL = 'https://raw.githubusercontent.com/GrzegorzDryja/grzegorzdryja.github.io/master/data/';
const FORBIDDEN_ROPOS = ['test'];

const convert = (
  { name, htmlUrl, language, description }:
  { name: string, htmlUrl: string, language: string, description: string }
) => new GitHubRepo({
  name,
  htmlUrl,
  language,
  description
});

export default function getRepos() {
  return fetch(REPOS_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw Error('Response not 200 / something went wrong dowloading repos');
    })
    .then((arr) => arr
      .filter((repo: GitHubRepo) => !FORBIDDEN_ROPOS.includes(repo.name))
      .map(convert)) 
    .catch((err) => console.warn(err));
}

async function getRawFIleContent(pathToFile: string) {
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

export function getAboutMe() {
  return getRawFIleContent('about-me.md');
}
