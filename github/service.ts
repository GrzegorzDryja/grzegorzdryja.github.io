import { GitHubRepo } from './model.ts';

const REPOS_URL = 'https://api.github.com/users/grzegorzdryja/repos';
const RAW_URL = 'https://raw.githubusercontent.com/GrzegorzDryja/grzegorzdryja.github.io/deno-markdown/data/';
const FORBIDDEN_ROPOS = ['Strefanoid', 'Kalkulator', 'Console-Calculator', 'BallparkOrders'];

const convert = (
  { name, html_url, language, description }:
  { name: string, html_url: string, language: string, description: string }
) => new GitHubRepo({
  name,
  html_url,
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
      .filter((repo: any) => !FORBIDDEN_ROPOS.includes(repo.name))
      .map(convert))
    .catch((err) => console.warn(err));
}

async function getRawFIleContent(pathToFile: string) {
  try {
    const response = await fetch(`${RAW_URL}${pathToFile}`);
    if (response.ok) {
      return await response.text();
    }
    throw Error('Response not 200 posts');
  } catch (err) {
    console.log(err);
    return '';
  }
}

export async function getAboutMe() {
  return getRawFIleContent('about-me.md');
}
