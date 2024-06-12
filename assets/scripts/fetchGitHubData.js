async function fetchGitHubProfile() {
  const response = await fetch('https://api.github.com/users/TASBRsoftw');
  const data = await response.json();
  document.getElementById('github-avatar').src = data.avatar_url;
  document.getElementById('github-name').textContent = data.name;
  document.getElementById('github-bio').textContent = data.bio;
}

async function fetchGitHubRepos() {
  const response = await fetch('https://api.github.com/users/TASBRsoftw/repos');
  const repos = await response.json();
  let reposHTML = '';
  repos.forEach(repo => {
      reposHTML += `
          <div class="col-md-3 py-4">
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title"><a href="${repo.html_url}">${repo.name}</a></h5>
                      <p class="card-text">${repo.description || 'Sem descrição'}</p>
                      <img src="assets/estrelacinza.png" style="height: 20px; width: 20px;" alt="Estrela">
                      <span> ${repo.stargazers_count} </span>
                      <img src="assets/User-Account-Person-PNG-File.png" style="height: 20px; width: 20px;" alt="Visitas">
                      <span> ${repo.watchers_count} </span>
                  </div>
              </div>
          </div>`;
  });
  document.getElementById('repos-container').innerHTML = reposHTML;
}

async function fetchGitHubFollowers() {
  const response = await fetch('https://api.github.com/users/TASBRsoftw/followers');
  const followers = await response.json();
  let followersHTML = '';
  followers.forEach(follower => {
      followersHTML += `
          <div class="col-md-2 py-4">
              <img src="${follower.avatar_url}" class="card-img-top" alt="imagemcolegas">
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">${follower.login}</h5>
                      <a href="${follower.html_url}" class="btn btn-primary">Perfil</a>
                  </div>
              </div>
          </div>`;
  });
  document.getElementById('colegas-trabalho').innerHTML = followersHTML;
}

window.onload = function() {
  fetchGitHubProfile();
  fetchGitHubRepos();
  fetchGitHubFollowers();
};
