class ScrapyOlaClick {
    constructor() {
      this.scrapedData = [];
      this.titleRestaurant = ""
    }
  
    sleep(ms) {     return new Promise(resolve => setTimeout(resolve, ms)); }
  

  
  
  
  
    async  checkRepetition(complementExpandable) {
      let button = complementExpandable.querySelector('.topping-incrementable__btn');
      if (button) {
        return "com repeticao";
      } else {
        return "sem repeticao";
      }
    }
  async  processTypeComplement(typeComplement, complementExpandable) {
      const complement = typeComplement !== "" ? typeComplement : "";
      let repetition = await this.checkRepetition(complementExpandable);
      let type = "";
      let minQtd = 0;
      let maxQtd = 0;

      if (complement.match(/^Selecione (\d+) opções/)) {
        const itemCount = parseInt(complement.match(/^Selecione (\d+) opções/)[1], 10);
        if (itemCount !== 1) {
          type = 'Mais de uma opcao ' + repetition;
          minQtd = itemCount;
          maxQtd = itemCount;
          console.log(minQtd,maxQtd)}
      }else if(complement == "Selecione 1 opção"){
        type = "Apenas uma opcao";
        minQtd = 1;
        maxQtd = 1;
      }
      else if (complement.startsWith("Selecione até " )) {
        const maxItems = parseInt(complement.match(/\d+/)[0], 10);
        type = 'Apenas uma opção ' + repetition;
        minQtd = 0
        maxQtd = maxItems;
      } else if (complement.match(/^Escolha de \d+ até \d+ opções$/)) {
        const minMaxItems = complement.match(/\d+/g);
        const minItems = parseInt(minMaxItems[0], 10);
        const maxItems = parseInt(minMaxItems[1], 10);
        type = 'Mais de uma opcao ' + repetition;
        minQtd = minItems;
        maxQtd = maxItems;
      }else if (complement.startsWith("Selecione o mínimo " )) {
        const minItems = parseInt(complement.match(/\d+/)[0], 10);
        type = 'Mais de uma opcao ' + repetition;
        minQtd = minItems
      } 
      return [type, minQtd, maxQtd];
    }
      
    
    async clickProductCards() {
      console.log("executando..")
      await this.sleep(1000)
      let categoryDivs = document.querySelectorAll('[data-v-294cdcdc]');

      for await (const categoryIndex of [...Array(categoryDivs.length).keys()]) {
        await this.sleep(500)
        let categoryDivs = document.querySelectorAll('[data-v-294cdcdc]');
        let categoryDiv = categoryDivs[categoryIndex];
        let h2Element =  categoryDiv.querySelector('h2.category.text-truncate-1-line');

          if (h2Element && h2Element.textContent.trim() !== "Procurar Resultados") {
            let title = h2Element.textContent.trim();
            console.log('Título:', title);
            let categoryNameElement = categoryDiv.querySelector('h2.category.text-truncate-1-line');
            let categoryName = categoryNameElement ? categoryNameElement.textContent : "";
            let productCards = categoryDiv.querySelectorAll('.product-card__body.d-flex.flex-column.justify-space-between');

          
        let productData = [];
        
        for await (const productIndex of [...Array(productCards.length).keys()]) {
          await this.sleep(1000)
          let categoryDivs = document.querySelectorAll('[data-v-294cdcdc]');
          let categoryDiv = categoryDivs[categoryIndex];
          let productCards = categoryDiv.querySelectorAll(".product-card__body.d-flex.flex-column.justify-space-between");
          let productCard = productCards[productIndex];
          
  
            await this.sleep(500)
            productCard.click();
            // Agora, vamos adicionar um atraso antes de coletar os dados.
            await this.sleep(1000)
            let productModal = document.querySelector('.rounded-t-lg.rounded-b-0');
            let titleElement = productModal.querySelector('.font-weight-bold');
            console.log("Titulo", titleElement)
            let priceElement = productModal.querySelector('.font-weight-bold.mr-2');
            console.log("Preço", priceElement)
            let imgElement = productModal.querySelector('.v-image__image').style.backgroundImage.replace(/^url\(['"](.+)['"]\)/, '$1');
            let descricaoElement = productModal.querySelector('.description.mb-0');
            console.log("Descrição", descricaoElement)
            let productTitle = titleElement ? titleElement.textContent : "";
            let priceText = priceElement ? priceElement.textContent : "";
            let productPrice = priceText.replace(/[^\d,.]/g, '').replace('.', ',')
            let imgSrc = imgElement ? imgElement.src : "";
            let productDescricao = descricaoElement ? descricaoElement.textContent : "";
    
            let complementsDict = []
            let complementExpandables = document.querySelectorAll('div.v-expansion-panel');
            for await (const complementExpandable of complementExpandables) {
              let complementElements = complementExpandable.querySelectorAll('.v-expansion-panel-header.product-expansion-panel__header');
              let optionsComplement = [];
              // Pegar o nome de cada complemento
              for await (const complementElement of complementElements) {
                let typeComplementElement = complementElement.querySelector('.product-expansion-header__category-validation');
                console.log("TypeComplement", typeComplementElement)
                let requiredElement = complementElement.querySelector('span.btn-required.v-chip');
                let complementNameElement = complementElement.querySelector('div.product-expansion-header__category-title');
                console.log("Nome do complemento", complementNameElement)
                
                let typeComplementText = typeComplementElement ? typeComplementElement.textContent : "";
                let [typeComplement, minQtd, maxQtd] = await this.processTypeComplement(typeComplementText, complementExpandable)
                let required = requiredElement ? requiredElement.textContent : "";
                let complementName = complementNameElement ? complementNameElement.textContent : "";
                // Pegar nome de cada opção do complemento da iteração

                let optionsElement = complementExpandable.querySelectorAll('.v-radio, .v-input');

                for await (const optionElement of optionsElement) {
                  let optionTitle = "";
                  let optionPrice = "0";
                  let optionDescription = "";

                if (optionElement.classList.contains('.v-radio')) {
                  // Se a classe for 'radio', trata como um rádio.
                  let optionTitleElement = optionElement.querySelector('.product-price-radio__labe');
                  let optionPriceElement = optionElement.querySelector('.product-price-radio__price');
                  
                  optionTitle = optionTitleElement.textContent.trim();
                  let optionPriceText = optionPriceElement ? optionPriceElement.textContent : "0";
                  optionPrice = optionPriceText.replace(/[^\d,.]/g, '').replace(',', '.');

                  
                  console.log({optionPrice, optionTitle})
                  
                }else if (optionElement.classList.contains('.v-input')) {
                  // Se a classe for 'checkbox', trata como um checkbox.
                  // let optionLabelElement = optionElement.querySelector('label');
                  
                  // if (optionLabelElement) {
                  //   let optionLabelContent = optionLabelElement.textContent.trim();
                  //   optionTitle = optionLabelContent.split('+')[0].trim();
                  //   let optionPriceText = optionLabelContent.split('+')[1];
                  //   optionPrice = optionPriceText.replace(/[^\d,.]/g, '').replace(',', '.');

                  //   console.log({optionPrice, optionTitle})
                  // } PAREI AQ
                }

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
        this.scrapedData.push({
          categoryName: categoryName,
          productsCategory: productData
        });
        await this.backPage();
      }
      //alert("Finalizado!")
          }
        
    
  }
  
  
      async backPage() {
        console.log("Voltou!")
        await this.sleep(1000);
        let productModal = document.querySelector('.rounded-t-lg.rounded-b-0');
        let back = productModal.querySelector('button.appbar-close-button, button.v-btn.v-btn--icon').click()
        if (back) {
          back.click()
      }
        await this.sleep(1000);
      }

  }
  
  
 