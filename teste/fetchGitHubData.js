const axios = require('axios');
const fs = require('fs');

const GITHUB_USERNAME = 'TASBRsoftw';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
const GITHUB_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
const DB_FILE_PATH = './db.json';

async function fetchGithubData() {
    try {
        const userResponse = await axios.get(GITHUB_API_URL);
        const reposResponse = await axios.get(GITHUB_REPOS_URL);

        const userData = userResponse.data;
        const reposData = reposResponse.data;

        const dbData = {
            user: userData,
            repositories: reposData
        };

        fs.writeFileSync(DB_FILE_PATH, JSON.stringify(dbData, null, 2));
        console.log('Dados salvos com sucesso no db.json');
    } catch (error) {
        console.error('Erro ao buscar dados do GitHub:', error);
    }
}

fetchGithubData();
