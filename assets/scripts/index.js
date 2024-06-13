document.addEventListener('DOMContentLoaded', () => {
    const username = 'TASBRsoftw'; // Substitua pelo seu nome de usuário do GitHub

    // Função para obter dados do JSON Server
    async function fetchData(url) {
        const response = await fetch(url);
        return response.json();
    }

    // Função para obter dados do GitHub
    async function fetchGitHubData(endpoint) {
        const response = await fetch(`https://api.github.com/${endpoint}`);
        return response.json();
    }

    // Preencher dados do perfil
    fetchGitHubData(`users/${username}`).then(data => {
        document.getElementById('perfil-imagem').src = data.avatar_url;
        document.getElementById('perfil-nome').textContent = data.name;
        document.getElementById('perfil-descricao').textContent = data.bio;
        document.getElementById('perfil-localizacao').textContent = data.location;
        document.getElementById('perfil-link').href = data.html_url;
        document.getElementById('perfil-link').textContent = data.html_url;
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
                    <img src="${conteudo.imagemCapa}" class="d-block w-100" style = "height: 800px; width: auto" alt="${conteudo.titulo}">
                    <div class="carousel-caption d-none d-md-block">
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
                            <a href="${colega.perfilGitHub}" class="btn btn-primary">Ver no GitHub</a>
                        </div>
                    </div>
                </div>
            `;
            colegasDiv.insertAdjacentHTML('beforeend', colegaCard);
        });
    });
});