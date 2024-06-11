<script>
  const urlParams = new URLSearchParams(window.location.search);
  const repoId = urlParams.get('id');

  fetch(`http://localhost:3000/repositorios/${repoId}`)
    .then(response => response.json())
    .then(repo => {
      document.getElementById('repo-title').textContent = repo.nome;
      document.getElementById('repo-description').textContent = repo.descricao;
      document.getElementById('repo-link').href = repo.urlRepo;
      document.getElementById('repo-stars').textContent = repo.estrelas;
      document.getElementById('repo-visits').textContent = repo.visitas;
    });
</script>
