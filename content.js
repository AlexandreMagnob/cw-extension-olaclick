class Scrapy {
  constructor() {
    this.scrapedData = [];
  }

  sleep(ms) {     return new Promise(resolve => setTimeout(resolve, ms)); }

  checkAndScrape() {
    const categoryCards = document.querySelectorAll('div.category-card');
    if (categoryCards.length > 0) {
      this.clickCategoryCards();
    } else {
      this.clickProductCards();
    }
  }

  async clickCategoryCards() {
    let categoryCards = document.querySelectorAll('div.category-card');
    for await (const categoryCard of categoryCards){
        categoryCard.click();
        await this.sleep(2)
        await this.clickProductCards();
        await this.backPage()
      }
    }
    processTypeComplement(typeComplement) {
      if (typeComplement === "Escolha 1 item") {
        return ["Apenas uma opção ", 1, 1];
      } else if (typeComplement.startsWith("Escolha até ")) {
        const maxItems = parseInt(typeComplement.match(/\d+/)[0], 10);
        return ['Mais de uma opção sem repetição', 1, maxItems];
      } else {
        return ["Apenas uma opção", 1, 1]; // Valor padrão se nenhum padrão for encontrado
      }
    }

  async clickProductCards() {
    await this.sleep(500)
    let categoryDivs = document.querySelectorAll('.category-container[data-v-c24acdb4]');
  
    for await (const categoryIndex of [...Array(categoryDivs.length).keys()]) {
      await this.sleep(500)
      let categoryDivs = document.querySelectorAll('.category-container[data-v-c24acdb4]');
      let categoryDiv = categoryDivs[categoryIndex];
      let categoryNameElement = categoryDiv.querySelector('span[data-v-c24acdb4]');
      let categoryName = categoryNameElement ? categoryNameElement.textContent : "";
  
      let productCards = categoryDiv.querySelectorAll('.item-card.col-8.category-container__products__product-list__item-card.not-small');
  
      let productData = [];
      for await (const productIndex of [...Array(productCards.length).keys()]) {
        await this.sleep(500)
        let categoryDivs = document.querySelectorAll('.category-container[data-v-c24acdb4]');
        let categoryDiv = categoryDivs[categoryIndex];
        let productCards = categoryDiv.querySelectorAll('.item-card.col-8.category-container__products__product-list__item-card.not-small');
        let productCard = productCards[productIndex];
  
        console.log(productCard.textContent); //debuging..
  
        let innerDiv = productCard.querySelector('.item-card-container.row.justify-between');
        if (innerDiv) {
          await this.sleep(500)
          innerDiv.click();
          console.log("clicou")
          // Agora, vamos adicionar um atraso antes de coletar os dados.
          await this.sleep(1000)
  
          let titleElement = document.querySelector('span.font-5');
          let priceElement = document.querySelector('span.price__now.font-3');
          let imgElement = document.querySelector('img');
          let descricaoElement = document.querySelector('span.weight-400');
          console.log("extraindo dados")
          let title = titleElement ? titleElement.textContent : "";
          let priceText = priceElement ? priceElement.textContent : "";
          let price = priceText.replace(/[^\d,.]/g, '').replace(',', '.');
          let imgSrc = imgElement ? imgElement.src : "";
          let descricao = descricaoElement ? descricaoElement.textContent : "";
  
          let complementsDict = []
          let complementExpandables = document.querySelectorAll('div.expandable');
          for await (const complementExpandable of complementExpandables) {
            let complementElements = complementExpandable.querySelectorAll('div.expandable__fixed.py-2.px-4.pointer.bg-grey-12');
            let optionsComplement = [];
  
            // Pegar o nome de cada complemento
            for await (const complementElement of complementElements) {
              let typeComplementElement = complementElement.querySelector('span.expandable__fixed__header__text__subtitle.font-1.text-grey');
              let requiredElement = complementElement.querySelector('span.expandable__fixed__header__text__required.font-0.ml-2.text-primary');
              let complementNameElement = complementElement.querySelector('span.expandable__fixed__header__text__title');
  
              let typeComplement = typeComplementElement ? typeComplementElement.textContent : "";
              let required = requiredElement ? requiredElement.textContent : "";
              let complementName = complementNameElement ? complementNameElement.textContent : "";
  
              // Pegar nome de cada opção do complemento da iteração
              let optionsElement = complementExpandable.querySelectorAll('.chooser');
              for await (const optionElement of optionsElement) {
                let optionTitleElement = optionElement.querySelector('span.weight-700.text-black.font-1.mb-1');
                let optionPriceElement = optionElement.querySelector('.price__now');
                let optionQtdElement = optionElement.querySelector('span.text-grey-3');
                let optionDescriptionElement = optionElement.querySelector('.chooser-info__description');
  
                let optionTitle = optionTitleElement ? optionTitleElement.textContent : "";
                let optionPriceText = optionPriceElement ? optionPriceElement.textContent : "0";
                let optionPrice = optionPriceText.replace(/[^\d,.]/g, '').replace(',', '.');
                let optionQtd = optionQtdElement ? optionQtdElement.textContent : "";
                let optionDescription = optionDescriptionElement ? optionDescriptionElement.textContent : "";
  
                optionsComplement.push({
                  optionTitle: optionTitle,
                  optionPrice: optionPrice,
                  optionQtd: optionQtd,
                  optionDescription: optionDescription
                });
              }
              console.log("options extraida")
  
              complementsDict.push({
                nameComplement: complementName,
                typeComplement: typeComplement,
                required: required,
                options: optionsComplement,
              })
            }
            console.log("complements extraida")
          }
  
          productData.push({
            title: title,
            price: price,
            imgSrc: imgSrc,
            descricao: descricao,
            complementsDict: complementsDict
          });
          console.log("productData extraido")
          await this.backPage();
        }
      }
      this.scrapedData.push({
        categoryName: categoryName,
        productsCategory: productData
      });
      console.log("scrapedData adicionado")
      await this.backPage();
    }
}


async backPage() {
  await this.sleep(1000);
  let back = document.querySelector('#app > div.main-container.w-100.not-small.has-search-bar > div > div.w-100.item-header-container > div.navigation-header.flex.items-center.justify-between.navigation-header--small.bg-white > div:nth-child(1) > div > div');
  if (back) {
    back.click()
}}
}

function desativarAlerta() {
  const alertContainer = document.querySelector('[data-testid="alert-container"]');
  if (alertContainer) {
    alertContainer.remove();
  }
}
// Chame a função desativarAlerta antes de executar outras ações
desativarAlerta();

function createCSV(scrapedData) {
  const csvData = [];

  // Cabeçalho do CSV
  csvData.push([
    'TIPO',
    'NOME',
    'DESCRIÇÃO',
    'VALOR',
    'VALOR DE CUSTO',
    'VALOR PROMOCIONAL',
    'IMAGEM',
    'CODIGO PDV',
    'DISPONIBILIDADE DO ITEM',
    'TIPO COMPLEMENTO',
    'QTDE MINIMA',
    'QTDE MAXIMA',
    'CALCULO DOS COMPLEMENTOS',
  ]);

  scrapedData.forEach(categoryData => {
    const categoryName = categoryData.categoryName;
    csvData.push(['Categoria', categoryName]);

    categoryData.productsCategory.forEach(productData => {
      const productName = productData.title;
      const productDescription = productData.descricao;
      const productPrice = productData.priceNow || ''; // Valor
      const productCostPrice = productData.costPrice || ''; // Valor de Custo
      const productPromoPrice = productData.promoPrice || ''; // Valor Promocional
      const imgSrc = productData.imgSrc;

      csvData.push(['Produto', productName, productDescription, productPrice, productCostPrice, productPromoPrice, imgSrc]);

      productData.complementsDict.forEach(complementData => {
        const complementName = complementData.nameComplement;
        const complementType = complementData.typeComplement;
        const complementRequired = complementData.required ? 'Obrigatório' : 'Não';
        const complementMinQtd = complementData.minQtd;
        const complementMaxQtd = complementData.maxQtd;

        csvData.push(['Complemento', complementName, '', '','', '', '', '', '', '', complementType, complementMinQtd, complementMaxQtd]);

        complementData.options.forEach(option => {
          const optionName = option.optionTitle;
          const optionPrice = option.optionPrice || ''; // Valor da Opção
          const optionMaxQtd = option.optionQtd;

          csvData.push(['Opção', optionName, '', optionPrice, '', '','', '', '', '', '', optionMaxQtd]);
        });
      });
    });
  });

  // Converter para CSV usando a biblioteca papaparse
  const csv = Papa.unparse(csvData);

  // Criar um Blob com o conteúdo CSV
  const blob = new Blob([csv], { type: 'text/csv' });

  // Criar um objeto URL para o Blob
  const url = URL.createObjectURL(blob);

  // Criar um link de download
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'planilha_produtos.csv'; // Nome do arquivo de download

  // Anexar o link ao documento e simular um clique nele
  document.body.appendChild(a);
  a.click();

  // Limpar e revogar o objeto URL
  URL.revokeObjectURL(url);

  // Remover o link após o download
  document.body.removeChild(a);
}


// Exporta a instância da classe Scrapy para uso em popup.js
window.scrapy = new Scrapy();
