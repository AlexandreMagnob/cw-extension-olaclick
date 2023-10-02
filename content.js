// Função para clicar em category-card, acessar páginas individuais e extrair dados
function scrapeData() {
  const scrapeData = [];

  // Seletor para encontrar todos os elementos category-card
  let categoryCards = document.querySelectorAll('div.category-card');

  // Iterar sobre os elementos category-card
  categoryCards.forEach((categoryCard, categoryIndex) => {
    // Clique no category-card para acessar a página individual
    categoryCard.click();

    // Aguarde um período de tempo para garantir que a página individual seja carregada
    setTimeout(() => {
      // Seletor para encontrar todos os elementos product-card
      let productCards = document.querySelectorAll('.item-card.col-8.category-container__products__product-list__item-card.not-small[data-v-58044642]');

      // Iterar sobre os elementos product-card
      productCards.forEach((productCard, productIndex) => {
        // Clique no product-card para acessar a página do produto
        productCard.click();

        // Aguarde um período de tempo para garantir que a página do produto seja carregada
        setTimeout(() => {
          // Seletor para encontrar e extrair os dados da página do produto
          let priceNow = document.querySelector('span.price__now.font-3').textContent;
          let imgSrc = document.querySelector('img').src;
          let descricao = document.querySelector('span.weight-400').textContent;

          // Crie um objeto com os dados do produto
          let productData = {
            priceNow,
            imgSrc,
            descricao,
          };

          // Adicione o objeto ao array de dados extraídos
          scrapedData.push(productData);

          window.history.back();
          // Volte para a página anterior (a página da categoria) antes de continuar
        }, 3000); // Espere 3 segundos antes de extrair dados da página do produto (ajuste conforme necessário)
      });
    }, 3000); // Espere 3 segundos antes de extrair dados da página individual (ajuste conforme necessário)
  });
  // Retorne os dados extraídos como um JSON
  return JSON.stringify(scrapedData);
}

// Execute a função quando a página estiver totalmente carregada
window.addEventListener('load', () => {
  const jsonData = scrapeData();
  console.log(jsonData); // Exibe o JSON no console
});