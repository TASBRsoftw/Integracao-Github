const GITHUB_USERNAME = 'TASBRsoftw';
const GITHUB_TOKEN = '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';

async function fetchGitHubData() {
  const headers = GITHUB_TOKEN ? {
    'Authorization': `token ${GITHUB_TOKEN}`
  } : {};

  const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers });
  const userData = await userResponse.json();

  const repoResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, { headers });
  const reposData = await repoResponse.json();

  return { userData, reposData };
}
