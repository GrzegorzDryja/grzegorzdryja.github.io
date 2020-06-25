import getRepos from './service.ts';

export default async function() {
  const arr = await getRepos();
  return arr;
}
