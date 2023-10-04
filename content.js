class Scrapy {
  constructor() {
    this.scrapedData = {};
    this.complementsDict = {};
  }

  checkAndScrape() {
    const categoryCards = document.querySelectorAll('div.category-card');
    if (categoryCards.length > 0) {
      this.clickCategoryCards();
    } else {
      this.clickProductCards();
    }
  }

  clickCategoryCards() {
    let categoryCards = document.querySelectorAll('div.category-card');
    console.log("Tamanho das categorias" + categoryCards.length);

    categoryCards.forEach((categoryCard) => {
      categoryCard.click();
      this.clickProductCards();
      //window.history.back();
    });
  }

  clickProductCards() {
    let categoryDivs = document.querySelectorAll('.category-container[data-v-c24acdb4]');

    categoryDivs.forEach((categoryDiv) => {
      let categoryNameElement = categoryDiv.querySelector('span[data-v-c24acdb4]');
      let categoryName = categoryNameElement ? categoryNameElement.textContent : "";
      let productData = {}

      setTimeout(() => {
        let productCards = document.querySelectorAll('.item-card.col-8.category-container__products__product-list__item-card.not-small[data-v-58044642]');
        console.log("Tamanho dos produtos" + productCards.length);

        productCards.forEach((productCard) => {
          let innerDiv = productCard.querySelector('div.item-card-container.row.justify-between');
          if (innerDiv) {
            innerDiv.click();
          }

          let titleElement = document.querySelector('span.font-5');
          let priceNowElement = document.querySelector('span.price__now.font-3');
          let imgElement = document.querySelector('img');
          let descricaoElement = document.querySelector('span.weight-400');

          let title = titleElement ? titleElement.textContent : "";
          let priceNow = priceNowElement ? priceNowElement.textContent : "";
          let imgSrc = imgElement ? imgElement.src : "";
          let descricao = descricaoElement ? descricaoElement.textContent : "";

          let complementsDict = []
          let complementExpandables = document.querySelectorAll('div.expandable');
          complementExpandables.forEach((complementExpandable) => {
            let complementElements = complementExpandable.querySelectorAll('div.expandable__fixed.py-2.px-4.pointer.bg-grey-12');
            let optionsComplement = [];

            //Pegar o nome de cada complemento
            complementElements.forEach((complementElement) => {
              let typeComplementElement = complementElement.querySelector('span.expandable__fixed__header__text__subtitle.font-1.text-grey');
              let requiredElement = complementElement.querySelector('span.expandable__fixed__header__text__required.font-0.ml-2.text-primary');
              let complementNameElement = complementElement.querySelector('div.expandable:nth-of-type(1) span.expandable__fixed__header__text__title');

              let typeComplement = typeComplementElement ? typeComplementElement.textContent : "";
              let required = requiredElement ? requiredElement.textContent : "";
              let complementName = complementNameElement ? complementNameElement.textContent : "";

              //Pegar nome de cada opção do complemento da iteracao
              let optionsElement = complementExpandable.querySelectorAll('.chooser');
              optionsElement.forEach((optionElement) => {
                let optionTitleElement = optionElement.querySelector('span.weight-700.text-black.font-1.mb-1');
                let optionPriceElement = optionElement.querySelector('div.chooser:nth-of-type(1) span.price__now');
                let optionQtdElement = optionElement.querySelector('span.text-grey-3');
                let optionDescriptionElement = optionElement.querySelector('.chooser-info__description');

                let optionTitle = optionTitleElement ? optionTitleElement.textContent : "";
                let optionPrice = optionPriceElement ? optionPriceElement.textContent : "0";
                let optionQtd = optionQtdElement ? optionQtdElement.textContent : "";
                let optionDescription = optionDescriptionElement ? optionDescriptionElement.textContent : "";

                optionsComplement.push({ 
                  optionTitle: optionTitle, 
                  optionPrice: optionPrice, 
                  optionQtd: optionQtd, 
                  optionDescription: optionDescription});
              });

              complementsDict.push({
                nameComplement: complementName,
                typeComplement: typeComplement,
                required: required,
                options: optionsComplement,
              })
            });
          });

          productData.push({
            title: title,
            priceNow: priceNow,
            imgSrc: imgSrc,
            descricao: descricao,
            complementsDict: complementsDict
          });

          this.scrapedData.push({
            categoryName: categoryName,
            productsCategory: productData
          });

        });
      }, 3000);
    });
    //window.history.back();
  }
}

// Execute a função quando a página estiver totalmente carregada
window.addEventListener('load', () => {
  const scraper = new Scrapy();
  scraper.checkAndScrape();

  // Transforma this.scrapedData em JSON e exibe no console
  const jsonData = JSON.stringify(scraper.scrapedData);
  console.log(jsonData);
});
