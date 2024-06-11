document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const repoName = urlParams.get('name');
  
    const repoData = await fetchGitHubData(repoName);
  
    document.getElementById('repo-title').textContent = repoData.name;
    document.getElementById('repo-description').textContent = repoData.description;
    document.getElementById('repo-link').href = repoData.html_url;
    document.getElementById('repo-stars').textContent = repoData.stargazers_count;
    document.getElementById('repo-visits').textContent = repoData.watchers_count;
  });
  