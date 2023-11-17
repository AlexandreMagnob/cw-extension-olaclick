class OlaClick {
    constructor() {
      this.scrapedData = [];
      this.titleRestaurant = ""
    }
  
    sleep(ms) {     return new Promise(resolve => setTimeout(resolve, ms)); }
  

  
  
  
  
      async checkRepetition(complementExpandable) {
        const chooserDiv = complementExpandable.querySelector('.chooser-select.w-20');
        const plusButton = chooserDiv.querySelectorAll('button.btn.radius-1.font-10.no-user-select.btn-container')[1];      
        plusButton.click();
        plusButton.click();
        await this.sleep(200)
        const counter = chooserDiv.querySelector('.px-2.font-3.row-center');
        const counterValue = parseInt(counter.textContent, 10);
        if (counterValue > 1) {
          return "com repeticao";
        } else {
          return "sem repeticao";
        }
      }
  
      async processTypeComplement(typeComplement, complementExpandable) {
        const complement = typeComplement !== "" ? typeComplement : "";
        let repetition = await this.checkRepetition(complementExpandable);
        let type = "";
        let minQtd = 0;
        let maxQtd = 0;
      
        if (complement.match(/^Escolha (\d+) itens/)) {
          const itemCount = parseInt(complement.match(/^Escolha (\d+) itens/)[1], 10);
          if (itemCount !== 1) {
            type = 'Mais de uma opcao ' + repetition;
            minQtd = itemCount;
            maxQtd = itemCount;
            console.log(minQtd,maxQtd)}
        }else if(complement == "Escolha 1 item"){
          type = "Apenas uma opcao";
          minQtd = 1;
          maxQtd = 1;
        }
        else if (complement.startsWith("Escolha até ")) {
          const maxItems = parseInt(complement.match(/\d+/)[0], 10);
          type = 'Mais de uma opcao ' + repetition;
          maxQtd = maxItems;
        } else if (complement.match(/^Escolha de \d+ até \d+ itens$/)) {
          const minMaxItems = complement.match(/\d+/g);
          const minItems = parseInt(minMaxItems[0], 10);
          const maxItems = parseInt(minMaxItems[1], 10);
          type = 'Mais de uma opcao ' + repetition;
          minQtd = minItems;
          maxQtd = maxItems;
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
        const h2Element =  categoryDivs.querySelector('h2.category.text-truncate-1-line');

          if (h2Element && h2Element.textContent.trim() !== "Procurar Resultados") {
            const title = h2Element.textContent.trim();
            console.log('Título:', title);
            const productsElement = categoryDiv.querySelector('.products');
            let categoryDiv = categoryDivs[categoryIndex];
            let categoryNameElement = categoryDiv.querySelector('h2.category.text-truncate-1-line');
            let categoryName = categoryNameElement ? categoryNameElement.textContent : "";
            let productCards = categoryDiv.querySelectorAll('.product-card__body.d-flex.flex-column.justify-space-between');

          
        let productData = [];
        
        for await (const productIndex of [...Array(productCards.length).keys()]) {
          await this.sleep(1000)
          let categoryDivs = document.querySelectorAll('h2.category.text-truncate-1-line');
          let categoryDiv = categoryDivs[categoryIndex];
          let productCards = categoryDiv.querySelectorAll((".product-card__body.d-flex.flex-column.justify-space-between"));
          let productCard = productCards[productIndex];
          
          if (productCard.style.display === "none") {
            // Se o estilo for "display: none;", pule este productCard
            continue;
        }
  
            await this.sleep(500)
            productCard.scrollIntoView();
            productCard.click();
            // Agora, vamos adicionar um atraso antes de coletar os dados.
            await this.sleep(1000)
            let productModal = document.querySelector('.rounded-t-lg.rounded-b-0');
            let titleElement = productModal.querySelector('.font-weight-bold');
            let priceElement = productModal.querySelector('.font-weight-bold.mr-2');
            let imgElement = productModal.querySelector('.v-image__image').style.backgroundImage.replace(/^url\(['"](.+)['"]\)/, '$1');
            let descricaoElement = productModal.querySelector('.description.mb-0');
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
              //parei na parte em que eu pego os completemtntos
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
 