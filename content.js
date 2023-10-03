class Scrapy {
  constructor() {
    this.scrapedData = {}; // Alterado para um objeto (dicionário)
    this.complementsDict = {};
    this.optionsComplement = {};
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
      window.history.go(-1);
    });
  }

  clickProductCards() {
    let categoryDivs = document.querySelectorAll('.category-container[data-v-c24acdb4]');

    categoryDivs.forEach((categoryDiv) => {
      let categoryTitleElement = categoryDiv.querySelector('span[data-v-c24acdb4]');
      let categoryTitle = categoryTitleElement ? categoryTitleElement.textContent : "";

      setTimeout(() => {
        let productCards = document.querySelectorAll('.item-card.col-8.category-container__products__product-list__item-card.not-small[data-v-58044642]');
        console.log("Tamanho dos produtos" + productCards.length);

        productCards.forEach((productCard) => {
          let innerDiv = productCard.querySelector('div.item-card-container.row.justify-between');
          if (innerDiv) {
            innerDiv.click();
          }

          setTimeout(() => {
            let titleElement = document.querySelector('span.font-5');
            let priceNowElement = document.querySelector('span.price__now.font-3');
            let imgElement = document.querySelector('img');
            let descricaoElement = document.querySelector('span.weight-400');

            let title = titleElement ? titleElement.textContent : "";
            let priceNow = priceNowElement ? priceNowElement.textContent : "";
            let imgSrc = imgElement ? imgElement.src : "";
            let descricao = descricaoElement ? descricaoElement.textContent : "";

            let complementExpandables = document.querySelectorAll('div.expandable');
            complementExpandables.forEach((complementExpandable) => {
              let complementElements = complementExpandable.querySelectorAll('div.expandable__fixed.py-2.px-4.pointer.bg-grey-12');

              complementElements.forEach((complementElement) => {
                let complementTitleElement = complementElement.querySelector('.expandable__fixed__header__text__title.font-2.text-black');
                let typeComplementElement = complementElement.querySelector('span.expandable__fixed__header__text__subtitle.font-1.text-grey');
                let requiredElement = complementElement.querySelector('span.expandable__fixed__header__text__required.font-0.ml-2.text-primary');

                let titleComplement = complementTitleElement ? complementTitleElement.textContent : "";
                let typeComplement = typeComplementElement ? typeComplementElement.textContent : "";
                let required = requiredElement ? requiredElement.textContent : "";

                let optionsElement = complementExpandable.querySelectorAll('.chooser-info__details.no-imagine-no-spacing[data-v-7dd5c793]')
                optionsElement.forEach((optionElement) => {
                  let optionTitleElement = optionElement.querySelector('span.weight-700.text-black.font-1.mb-1');
                  let optionPriceElement = optionElement.querySelector('div.chooser:nth-of-type(1) span.price__now');
                  let optionQtdElement = optionElement.querySelector('div.chooser:nth-of-type(1) span.mt-1');

                  let optionTitle = optionTitleElement ? optionTitleElement.textContent : "";
                  let optionPrice = optionPriceElement ? optionPriceElement.textContent : "0";
                  let optionQtd = optionQtdElement ? optionQtdElement.textContent : "";

                  this.optionsComplement.push({ optionTitle, optionPrice, optionQtd });
                });
                
                this.complementsDict[complementName] = {
                  titleComplement,
                  typeComplement,
                  required,
                  optionsComplement: this.optionsComplement,
                };
              });
            });

            let productData = {
              title,
              priceNow,
              imgSrc,
              descricao,
              complementsDict: this.complementsDict
            }

            // Armazena os dados no dicionário com a chave categoryTitle
            this.scrapedData[categoryTitle] = productData;
            console.log(this.scrapedData);
          }, 100);
        });
      }, 3000);
    });
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
