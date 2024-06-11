<script>
  document.addEventListener("DOMContentLoaded", function () {
    fetch('http://localhost:3000/colegas')
      .then(response => response.json())
      .then(data => {
        const colegasContainer = document.getElementById('colegas');
        data.forEach(colega => {
          colegasContainer.innerHTML += `
            <div class="col-md-2 py-4">
              <img src="${colega.urlFoto}" class="card-img-top" alt="imagemcolegas">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${colega.nome}</h5>
                </div>
              </div>
            </div>`;
        });
      });

    fetch('https://api.github.com/users/seu-usuario')
      .then(response => response.json())
      .then(data => {
        document.getElementById('github-username').textContent = data.login;
        document.getElementById('github-avatar').src = data.avatar_url;
        document.getElementById('github-url').href = data.html_url;
      });

    fetch('https://api.github.com/users/seu-usuario/repos')
      .then(response => response.json())
      .then(data => {
        const reposContainer = document.getElementById('repos');
        data.forEach(repo => {
          reposContainer.innerHTML += `
            <div class="col-md-3 py-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title"><a href="${repo.html_url}">${repo.name}</a></h5>
                  <p class="card-text">${repo.description}</p>
                  <img src="assets/estrelacinza.png" style="height: 20px; width: 20px;" alt="Estrela">
                  <span> ${repo.stargazers_count} </span>
                  <img src="assets/User-Account-Person-PNG-File.png" style="height: 20px; width: 20px;" alt="Visitas">
                  <span> ${repo.watchers_count} </span>
                </div>
              </div>
            </div>`;
        });
      });
  });
</script>
