class ScrapyAnotai {
    constructor() {
      this.scrapedData = [];
      this.titleRestaurant = ""
    }
  
    sleep(ms) {     return new Promise(resolve => setTimeout(resolve, ms)); }
  
    async checkAndScrape() {
      await this.sleep(500);
      this.titleRestaurant = document.querySelector('.company-header__info__company span') ? document.querySelector('.company-header__info__company span').textContent : "";
      //console.log(this.titleRestaurant)
      const categoryCards = document.querySelectorAll('div.category-card');
      if (categoryCards.length > 0) {
        await this.clickCategoryCards();
      } else {
        await this.clickProductCards();
      }
    }
  
    async clickCategoryCards() {
      let categoryGrid = document.querySelector('.category-grid');
      let categoryCards = categoryGrid.querySelectorAll('div.category-card');
  
      for await (const categoryCardIndex of [...Array(categoryCards.length).keys()]) {
          await this.sleep(500);
  
          let categoryGrid = document.querySelector('.category-grid');
          let categoryCards = categoryGrid.querySelectorAll('div.category-card');
          let categoryCard = categoryCards[categoryCardIndex];
  
          console.log({ categoryCards, categoryCard });
          // Adicione um tempo de espera antes do clique para garantir que a página esteja pronta
          await this.sleep(1000);
          // Use o método scrollIntoView para garantir que o elemento esteja visível
          categoryCard.scrollIntoView();
          // Clique no elemento
          categoryCard.click();
          console.log("clicou")
          // Aguarde um tempo suficiente após o clique antes de chamar clickProductCards
          await this.sleep(1000);
          // Chame clickProductCards
          await this.clickProductCards();
          console.log("executou!")
          // Aguarde antes de voltar à página anterior
          await this.sleep(1000);
          // Volte à página anterior
          await this.backPage();
      }
  }
  
  
  async checkRepetition(complementExpandable) {
    let button = complementExpandable.querySelector('.topping-incrementable__btn');
    if (button) {
        return { repetition: "com repeticao" };
    } else {
        return { repetition: "sem repeticao" };
    }
}

        async processTypeComplement(typeComplement, complementExpandable) {
            console.log('typeComplement:', typeComplement);
            const complement = typeComplement.trim();
            let { repetition } = checkRepetition(complementExpandable);
            console.log('repetition:', repetition);
            let type = "";
            let minQtd = 0;
            let maxQtd = 0;

            const matchSelect = complement.match(/^Selecione (\d+) opções/);
            const matchSelectMin = complement.match(/^Selecione o mínimo (\d+) opção/);
            const matchSelectUntil = complement.match(/^Selecione até (\d+) opções/);
            const matchChooseFromTo = complement.match(/^Escolha de (\d+) até (\d+) opções$/);

            if (matchSelect) {
                const itemCount = parseInt(matchSelect[1], 10);
                if (itemCount !== 1) {
                    type = "Mais de uma opção " + repetition;
                    minQtd = itemCount;
                    maxQtd = itemCount;
                    console.log('minQtd:', minQtd, 'maxQtd:', maxQtd);
                }
            } else if (complement === "Selecione 1 opção") {
                type = "Apenas uma opção ";
                minQtd = 1;
                maxQtd = 1;
            } else if (matchSelectUntil) {
            const maxItems = parseInt(matchSelectUntil[1], 10);
            if (maxItems === 1) {
                type = "Apenas uma opção " + repetition;
                minQtd = 0;
                maxQtd = maxItems;
                console.log('minQtd:', minQtd, 'maxQtd:', maxQtd);
            } else {
                type = "Mais de um opção " + repetition;
                minQtd = 0;
                maxQtd = maxItems;
                console.log('minQtd:', minQtd, 'maxQtd:', maxQtd);
            }
        } else if (matchChooseFromTo) {
                const minItems = parseInt(matchChooseFromTo[1], 10);
                const maxItems = parseInt(matchChooseFromTo[2], 10);
                type = "Mais de uma opção " + repetition;
                minQtd = minItems;
                maxQtd = maxItems;
                console.log('minQtd:', minQtd, 'maxQtd:', maxQtd);
            } else if (matchSelectMin) {
                const minItems = parseInt(matchSelectMin[1], 10);
                const maxItems = parseInt(matchSelectMin[1], 10);
                type = "Apenas uma opção " + repetition;
                minQtd = minItems;
                maxQtd = maxItems
                console.log('minQtd:', minQtd, 'maxqtd', maxQtd);
            }

           
            return [type, minQtd, maxQtd];
        }

      
  
    async clickProductCards() {
      console.log("executando..")
      await this.sleep(1000)
      let categoryDivs = document.querySelectorAll('.category-container');
    
      for await (const categoryIndex of [...Array(categoryDivs.length).keys()]) {
        await this.sleep(500)
        let categoryDivs = document.querySelectorAll('.category-container');
        let categoryDiv = categoryDivs[categoryIndex];
        let categoryNameElement = categoryDiv.querySelector('span');
        let categoryName = categoryNameElement ? categoryNameElement.textContent : "";
        let productCards = categoryDiv.querySelectorAll(".category-container__products__product-list.col-md-6.col-12.not-small");
    
        let productData = [];
        for await (const productIndex of [...Array(productCards.length).keys()]) {
          await this.sleep(1000)
          let categoryDivs = document.querySelectorAll('.category-container');
          let categoryDiv = categoryDivs[categoryIndex];
          let productCards = categoryDiv.querySelectorAll((".category-container__products__product-list.col-md-6.col-12.not-small"));
          let productCard = productCards[productIndex];
          
          if (productCard.style.display === "none") {
            // Se o estilo for "display: none;", pule este productCard
            continue;
        }
  
          let innerDiv = productCard.querySelector('.item-card-container.row.justify-between');
          if (innerDiv) {
            await this.sleep(500)
            innerDiv.scrollIntoView();
            innerDiv.click();
            // Agora, vamos adicionar um atraso antes de coletar os dados.
            await this.sleep(1000)
            let productContainer = document.querySelector('.item-header-container')
            let titleElement = productContainer.querySelector('span.font-5');
            let priceElement = productContainer.querySelector('span.price__now.font-3');
            console.log(priceElement)
            let imgElement = productContainer.querySelector('img');
            let descricaoElement = productContainer.querySelector('span.weight-400');
            let productTitle = titleElement ? titleElement.textContent : "";
            let priceText = priceElement ? priceElement.textContent : "";
            let productPrice = priceText.replace(/[^\d,.]/g, '').replace('.', ',')
            let imgSrc = imgElement ? imgElement.src : "";
            let productDescricao = descricaoElement ? descricaoElement.textContent : "";
    
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
                let [typeComplement, minQtd, maxQtd] = await this.processTypeComplement(typeComplementText, complementExpandable)
                  
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
              title: productTitle,
              price: productPrice,
              imgSrc: imgSrc,
              descricao: productDescricao,
              complementsDict: complementsDict
            });
            await this.backPage();
          }
        }
        this.scrapedData.push({
          categoryName: categoryName,
          productsCategory: productData
        });
        await this.backPage();
      }
      //alert("Finalizado!")
  }
  
  
  async backPage() {
    await this.sleep(1000);
    let back = document.querySelector('.navigation-header__back')
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
 