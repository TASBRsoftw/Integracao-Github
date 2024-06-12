const fs = require('fs');

async function fetchRepositories() {
    const { default: fetch } = await import('node-fetch');
    const GITHUB_USERNAME = 'TASBRsoftw';
    const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

    try {
        const response = await fetch(API_URL);
        const repositories = await response.json();

        if (!Array.isArray(repositories)) {
            throw new Error('Resposta inesperada da API do GitHub');
        }

        const repoData = repositories.map(repo => ({
            id: repo.id,
            name: repo.name,
            html_url: repo.html_url,
            description: repo.description,
            language: repo.language,
            stargazers_count: repo.stargazers_count,
            watchers_count: repo.watchers_count,
            forks_count: repo.forks_count
        }));

        // Atualiza o db.json
        const db = JSON.parse(fs.readFileSync('../db/db.json', 'utf-8'));
        db.repositories = repoData;
        fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));

        console.log('db.json foi atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao buscar repositórios do GitHub:', error);
    }
}

fetchRepositories();
