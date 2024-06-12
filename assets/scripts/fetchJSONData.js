async function fetchJSONData() {
  const response = await fetch('http://localhost:3000/conteudosSugeridos');
  const conteudos = await response.json();
  let conteudosHTML = '';
  conteudos.forEach(conteudo => {
      conteudosHTML += `
          <div class="carousel-item ${conteudo.id === 1 ? 'active' : ''}">
              <img src="${conteudo.urlImagem}" class="d-block w-100" alt="${conteudo.titulo}">
              <div class="carousel-caption d-none d-md-block">
                  <h5>${conteudo.titulo}</h5>
                  <p>${conteudo.descricao}</p>
                  <a href="${conteudo.urlConteudo}" class="btn btn-primary">Ver mais</a>
              </div>
          </div>`;
  });
  document.querySelector('.carousel-inner').innerHTML = conteudosHTML;
}

window.onload = function() {
  fetchJSONData();
};
