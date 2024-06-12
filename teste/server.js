const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const GITHUB_USERNAME = 'TASBRsoftw';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
const GITHUB_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
const DB_FILE_PATH = path.join(__dirname, 'db', 'db.json');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/fetchGithubData', async (req, res) => {
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
        res.json({ message: 'Dados salvos com sucesso no db.json' });
    } catch (error) {
        console.error('Erro ao buscar dados do GitHub:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do GitHub' });
    }
});

app.get('/data', (req, res) => {
    fs.readFile(DB_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo db.json:', err);
            res.status(500).json({ error: 'Erro ao ler os dados' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
