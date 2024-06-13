async function fetchGitHubData(endpoint) {
  const response = await fetch(`https://api.github.com/${endpoint}`);
  if (!response.ok) {
      throw new Error('Erro ao buscar dados do GitHub');
  }
  return response.json();
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const repoId = urlParams.get('id');

  if (!repoId) {
      alert('ID do repositório não fornecido');
      return;
  }

  fetchGitHubData(`repositories/${repoId}`).then(repo => {
      document.getElementById('repo-name').textContent = repo.name;
      document.getElementById('repo-description').textContent = repo.description || 'Sem descrição';
      document.getElementById('repo-created-at').textContent = new Date(repo.created_at).toLocaleDateString();
      document.getElementById('repo-language').textContent = repo.language || 'Não especificada';
      document.getElementById('repo-url').href = repo.html_url;
      document.getElementById('repo-url').textContent = repo.html_url;
      document.getElementById('repo-owner').querySelector('img').src = repo.owner.avatar_url;
      document.getElementById('repo-owner-name').textContent = repo.owner.login;
      document.getElementById('repo-forks').textContent = repo.forks_count;
      document.getElementById('repo-license').textContent = repo.license ? repo.license.name : 'Nenhuma';
      document.getElementById('repo-stars').textContent = repo.stargazers_count;
      document.getElementById('repo-watchers').textContent = repo.watchers_count;

      const topicsDiv = document.getElementById('repo-topics');
      repo.topics.forEach(topic => {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'btn btn-dark bg-dark';
          button.textContent = topic;
          topicsDiv.appendChild(button);
      });
  }).catch(error => console.error(error));
});