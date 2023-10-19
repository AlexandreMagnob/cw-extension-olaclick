class Scrapy {
  constructor() {
    this.scrapedData = [];
    this.title = null
  }

  sleep(ms) {     return new Promise(resolve => setTimeout(resolve, ms)); }

  async checkAndScrape() {
    await this.sleep(200);
    this.title = document.querySelector('.company-header__info__company span').textContent
    const categoryCards = document.querySelectorAll('div.category-card');
    console.log(categoryCards)
    if (categoryCards.length > 0) {
      await this.clickCategoryCards();
    } else {
      await this.clickProductCards();
    }
  }

  async clickCategoryCards() {
    let categoryCards = document.querySelectorAll('div.category-card');
    for await (const categoryCardIndex of [...Array(categoryCards.length).keys()]) {
        this.sleep(400)
        let categoryCards = document.querySelectorAll('div.category-card');
        let categoryCard = categoryCards[categoryCardIndex]
        categoryCard.click();
        await this.sleep(200)
        await this.clickProductCards();
        await this.backPage()
      }
    }

    checkRepetition(complementExpandable) {
      const chooserDiv = complementExpandable.querySelector('.chooser-select.w-20');
      const plusButton = chooserDiv.querySelectorAll('button.btn.radius-1.font-10.no-user-select.btn-container')[1];      
      plusButton.click();
      plusButton.click();
      
      const counter = chooserDiv.querySelector('.px-2.font-3.row-center');
      const counterValue = parseInt(counter.textContent, 10);
      if (counterValue > 1) {
        return "com repeticao";
      } else {
        return "sem repeticao";
      }
    }

    processTypeComplement(typeComplement, complementExpandable) {
      let repetition = this.checkRepetition(complementExpandable)
      if (typeComplement === "Escolha 1 item") {
        return ["Apenas uma opcao ", 1, 1];
      } else if (typeComplement.startsWith("Escolha até ")) {
        const maxItems = parseInt(typeComplement.match(/\d+/)[0], 10);
        return ['Mais de uma opcao ' + repetition, 0, maxItems];
      } else if (typeComplement.match(/^Escolha de \d+ até \d+ itens$/)) {
        const minMaxItems = typeComplement.match(/\d+/g);
        const minItems = parseInt(minMaxItems[0], 10);
        const maxItems = parseInt(minMaxItems[1], 10);
        return ['Mais de uma opcao ' + repetition, minItems, maxItems];
      }
    }

  async clickProductCards() {
    console.log("executando..")
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
          let title = titleElement ? titleElement.textContent : "";
          let priceText = priceElement ? priceElement.textContent : "";
          let price = priceText.replace(/[^\d,.]/g, '').replace('.', ',')
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
                //let optionQtdElement = optionElement.querySelector('span.text-grey-3');
                let optionDescriptionElement = optionElement.querySelector('.chooser-info__description');
  
                let optionTitle = optionTitleElement ? optionTitleElement.textContent : "";
                let optionPriceText = optionPriceElement ? optionPriceElement.textContent : "0";
                let optionPrice = optionPriceText.replace(/[^\d,.]/g, '').replace(',', '.');
                //let optionQtd = optionQtdElement ? optionQtdElement.textContent : "";
                let optionDescription = optionDescriptionElement ? optionDescriptionElement.textContent : "";
  
                optionsComplement.push({
                  optionTitle: optionTitle,
                  optionPrice: optionPrice,
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
    alert("Finalizado!")
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

// Exporta a instância da classe Scrapy para uso em popup.js
window.scrapy = new Scrapy();

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.text === 'hi') {
      await window.scrapy.checkAndScrape();
      const scrapedData = window.scrapy.scrapedData
      const title = window.scrapy.title
      await createCSV(scrapedData, title)
  }
});

console.log("Olá")