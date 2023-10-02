// Função para clicar em category-card, acessar páginas individuais e extrair dados
function scrapeData() {
  const scrapedData = [];

  // Seletor para encontrar todos os elementos category-card
  let categoryCards = document.querySelectorAll('div.category-card');
  console.log("Tamanho das categorias" + categoryCards.length);

  // Iterar sobre os elementos category-card
  categoryCards.forEach((categoryCard) => {
    // Clique no category-card para acessar a página individual
    categoryCard.click();

    // Aguarde um período de tempo para garantir que a página individual seja carregada
    setTimeout(() => {
      // Seletor para encontrar todos os elementos product-card
      let productCards = document.querySelectorAll('.item-card.col-8.category-container__products__product-list__item-card.not-small[data-v-58044642]');
      console.log("Tamanho dos produtos" + productCards.length);

      // Iterar sobre os elementos product-card
      productCards.forEach((productCard) => {
        let innerDiv = productCard.querySelector('div.item-card-container.row.justify-between');
        if (innerDiv) {
          innerDiv.click();
        }
        // Aguarde um período de tempo para garantir que a página do produto seja carregada
        setTimeout(() => {
          // Seletor para encontrar e extrair os dados da página do produto
          let titleElement = document.querySelector('span.font-5');
          let priceNowElement = document.querySelector('span.price__now.font-3');
          let imgElement = document.querySelector('img');
          let descricaoElement = document.querySelector('span.weight-400');

          // Verifique se os elementos foram encontrados antes de acessar suas propriedades
          let title = titleElement ? titleElement.textContent : "";
          let priceNow = priceNowElement ? priceNowElement.textContent : "";
          let imgSrc = imgElement ? imgElement.src : "";
          let descricao = descricaoElement ? descricaoElement.textContent : "";

          complementExpandables = div.querySelectorAll('div.expandable');
          complementExpandables.forEach((complementExpandable) => {
            // Localização de cada elemento
            let complementElements = complementExpandable.querySelectorAll('div.expandable__fixed.py-2.px-4.pointer.bg-grey-12');

            complementElements.forEach((complementElement) => {
              let complementsDict = {}; // Dicionário para armazenar as opções referentes ao complemento atual
                
              // Encontre o próximo elemento span com a classe apropriada para obter informações adicionais
              let complementTitleElement = complementElement.querySelector('.expandable__fixed__header__text__title.font-2.text-black');
              let typeComplementElement = complementElement.querySelector('span.expandable__fixed__header__text__subtitle.font-1.text-grey')
              // Verifique se há um elemento com a classe específica diretamente dentro do complementElement
              let requiredElement = complementElement.querySelector('span.expandable__fixed__header__text__required.font-0.ml-2.text-primary')

              //Text Content dos complementos
              let titleComplement = complementTitleElement ? complementTitleElement.textContent : "";
              let typeComplement = typeComplementElement ? typeComplementElement.textContent: "";
              let required = requiredElement ? requiredElement.textContent: "";
              
              //Opções do complemento

              let optionsElement = options = complementExpandable.querySelectorAll('.chooser-info__details.no-imagine-no-spacing[data-v-7dd5c793]')
              optionsElement.forEach((optionElement) => {
                optionTitleElement = optionElement.
              }
             );
            
              let complementData = {
                titleComplement,
                typeComplement,
                required,
              };

              // Adicione o objeto ao dicionário complementsDict
              complementsDict[complementName] = complementData;
            // Adicione o dicionário complementsDict ao array de dados raspados
            scrapedData.push(complementsDict);
          })
        });

          // Crie um objeto com os dados do produto
          let productData = {
            title,
            priceNow,
            imgSrc,
            descricao,
            complementsDict
          }

          console.log(productData);
          // Adicione o objeto ao array de dados extraídos
          scrapedData.push(productData);

          window.history.go(-1);
          // Volte para a página anterior (a página da categoria) antes de continuar
        }, 3000);
        window.history.go(-1);
      });
    }, 3000); // Espere 3 segundos antes de extrair dados da página individual (ajuste conforme necessário)
  });
  // Retorne os dados extraídos como um JSON
  return scrapedData;
}

// Execute a função quando a página estiver totalmente carregada
window.addEventListener('load', () => {
  const jsonData = scrapeData();
  console.log(jsonData); // Exibe o JSON no console
});
