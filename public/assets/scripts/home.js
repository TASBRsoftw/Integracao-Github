document.addEventListener('DOMContentLoaded', function() {
    const username = 'TASBRsoftw';  // Substitua pelo nome de usuário real

    function fetchGitHubData(endpoint) {
        return fetch(`https://api.github.com/${endpoint}`)
            .then(response => response.json());
    }

    function fetchData(url) {
        return fetch(url)
            .then(response => response.json());
    }

    // Configurar evento de clique para os botões de redes sociais
    function setupSocialButton(buttonId, url) {
        const button = document.getElementById(buttonId);
        button.setAttribute('data-url', url);
        button.addEventListener('click', function() {
            window.open(url, '_blank');
        });
    }

    // Preencher dados do perfil
    fetchGitHubData(`users/${username}`).then(user => {
        document.getElementById('perfil-imagem').src = user.avatar_url;
        document.getElementById('usuario-nome').textContent = user.name || user.login;
        document.getElementById('perfil-nome').textContent = user.login;
        document.getElementById('perfil-descricao').textContent = user.bio || 'Sem biografia';
        document.getElementById('perfil-seguidores').textContent = user.followers;
        document.getElementById('perfil-blog').textContent = user.blog || 'Nenhum';
        document.getElementById('perfil-blog').href = user.blog || '#';
        document.getElementById('perfil-email').textContent = user.email || 'Nenhum';
        document.getElementById('perfil-twitter').textContent = user.twitter_username || 'Nenhum';
        document.getElementById('perfil-localizacao').textContent = user.location || 'Nenhum';
        document.getElementById('perfil-link').href = user.html_url;

        // Preencher botões de redes sociais
        fetchGitHubData(`users/${username}/social_accounts`).then(accounts => {
            accounts.forEach(account => {
                if (account.provider === 'linkedin') {
                    setupSocialButton('linkedin-button', account.url);
                } else if (account.provider === 'twitter') {
                    setupSocialButton('twitter-button', account.url);
                } else if (account.provider === 'instagram') {
                    setupSocialButton('instagram-button', account.url);
                }
            });
        });
    });

    // Preencher repositórios
    fetchGitHubData(`users/${username}/repos`).then(repos => {
        const repositoriosDiv = document.getElementById('repositorios');
        repos.forEach(repo => {
            const repoCard = `
                <div class="col-md-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">${repo.name}</h5>
                            <p class="card-text">${repo.description || 'Sem descrição'}</p>
                            <p class="card-text"><img src="https://th.bing.com/th/id/OIP.TF4y2BWyJ-28I__gNfct4wHaHa?rs=1&pid=ImgDetMain" style="height: 40px; width: 40px;"> ${repo.stargazers_count}</p>
                            <p class="card-text"><strong>Forks:</strong> ${repo.forks_count}</p>
                            <a href="repo.html?id=${repo.id}" class="btn btn-primary">Ver Detalhes</a>
                        </div>
                    </div>
                </div>
            `;
            repositoriosDiv.insertAdjacentHTML('beforeend', repoCard);
        });
    });

    // Preencher conteúdo sugerido
    fetchData('http://localhost:3000/conteudosSugeridos').then(conteudos => {
        const carouselIndicators = document.getElementById('carousel-indicators');
        const carouselInner = document.getElementById('carousel-inner');

        conteudos.forEach((conteudo, index) => {
            const activeClass = index === 0 ? 'active' : '';
            const indicator = `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" class="${activeClass}" aria-current="true" aria-label="Slide ${index + 1}"></button>`;
            const item = `
                <div class="carousel-item ${activeClass}">
                    <img src="${conteudo.imagemCapa}" class="d-block w-100" style="height: 800px; width: auto" alt="${conteudo.titulo}">
                    <div class="carousel-caption">
                        <h5>${conteudo.titulo}</h5>
                        <p>${conteudo.descricao}</p>
                        <a href="${conteudo.url}" class="btn btn-primary">Leia Mais</a>
                    </div>
                </div>
            `;
            carouselIndicators.insertAdjacentHTML('beforeend', indicator);
            carouselInner.insertAdjacentHTML('beforeend', item);
        });
    });

    // Preencher colegas de trabalho
    fetchData('http://localhost:3000/colegasDeTrabalho').then(colegas => {
        const colegasDiv = document.getElementById('colegas');
        colegas.forEach(colega => {
            const colegaCard = `
                <div class="col-md-4">
                    <div class="card mb-4">
                        <img src="${colega.foto}" class="card-img-top" alt="${colega.nome}">
                        <div class="card-body">
                            <h5 class="card-title">${colega.nome}</h5>
                            <p>${colega.descricao}</p>
                            <a href="${colega.perfilGitHub}" class="btn btn-primary">Ver no GitHub</a>
                        </div>
                    </div>
                </div>
            `;
            colegasDiv.insertAdjacentHTML('beforeend', colegaCard);
        });
    });
});
