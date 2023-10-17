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

    checkRepetition(complementExpandable) {
      const plusButton = complementExpandable.querySelector('div[data-v-57f45f1e][data-testid="btn-label"]');
      
      const counter = complementExpandable.querySelector('div[data-v-c8e7a86a][data-testid="counter"]');
      plusButton.click();
      plusButton.click();
      
      const counterValue = parseInt(counter.textContent, 10);
      
      if (counterValue > 1) {
        return "com repetição";
      } else {
        return "sem repetição";
      }
    }

    processTypeComplement(typeComplement, complementExpandable) {
      let repetition = this.checkRepetition(complementExpandable)
      if (typeComplement === "Escolha 1 item") {
        return ["Apenas uma opção ", 1, 1];
      } else if (typeComplement.startsWith("Escolha até ")) {
        const maxItems = parseInt(typeComplement.match(/\d+/)[0], 10);
        return ['Mais de uma opção ' + repetition, 1, maxItems];
      } else if (typeComplement.match(/^Escolha de \d+ até \d+ itens$/)) {
        const minMaxItems = typeComplement.match(/\d+/g);
        const minItems = parseInt(minMaxItems[0], 10);
        const maxItems = parseInt(minMaxItems[1], 10);
        return ['Mais de uma opção ' + repetition, minItems, maxItems];
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
              
              let typeComplementText = typeComplementElement ? typeComplementElement.textContent : "";
              let [typeComplement, minQtd, maxQtd] = this.processTypeComplement(typeComplementText, complementExpandable)
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
  
              complementsDict.push({
                nameComplement: complementName,
                typeComplement: typeComplement,
                minQtd: minQtd,
                maxQtd: maxQtd,
                required: required,
                options: optionsComplement
              })
            }
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

async function createCSV() {
  const csvData = [];

  // Cabeçalho do CSV
  csvData.push([
    'TIPO',
    'NOME',
    'DESCRIÇÃO',
    'VALOR',
    'IMAGEM',
    'CODIGO PDV',
    'DISPONIBILIDADE DO ITEM',
    'TIPO COMPLEMENTO',
    'QTDE MINIMA',
    'QTDE MAXIMA',
    'CALCULO DOS COMPLEMENTOS',
  ]);

  const scrapedData = window.scrapy.scrapedData; // Obtém os dados diretamente da instância

  scrapedData.forEach(categoryData => {
    const categoryName = categoryData.categoryName;
    csvData.push(['Categoria', categoryName]);

    categoryData.productsCategory.forEach(productData => {
      const productName = productData.title;
      const productDescription = productData.descricao;
      const productPrice = productData.priceNow || '';
      const imgSrc = productData.imgSrc;
      const codigoPdv = ''; // Adicione o código PDV aqui, se disponível

      // Preencha os campos de código PDV e disponibilidade do item, se disponíveis
      if (codigoPdv && productData.disponibilidade) {
        const disponibilidade = productData.disponibilidade;
        csvData.push(['Produto', productName, productDescription, productPrice, imgSrc, codigoPdv, disponibilidade]);
      } else {
        csvData.push(['Produto', productName, productDescription, productPrice, imgSrc]);
      }

      productData.complementsDict.forEach(complementData => {
        const complementName = complementData.nameComplement;
        const complementType = complementData.typeComplement;
        const complementRequired = complementData.required ? 'Obrigatório' : 'Não';
        const complementMinQtd = complementData.minQtd;
        const complementMaxQtd = complementData.maxQtd;

        csvData.push(['Complemento', complementName, '', '', '', '', '', complementType, complementMinQtd, complementMaxQtd]);

        complementData.options.forEach(option => {
          const optionName = option.optionTitle;
          const optionPrice = option.optionPrice || '';
          const optionMaxQtd = option.optionQtd;

          csvData.push(['Opção', optionName, '', optionPrice, '', '', '', '', '', optionMaxQtd]);
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
