class ScrapyJotaja {
    constructor() {
      this.scrapedData = [];
      this.titleRestaurant = ""
    }
  
    sleep(ms) {     return new Promise(resolve => setTimeout(resolve, ms)); }
  
    
   
  
  
      async checkRepetition(complementExpandable) {
        const chooserDiv = complementExpandable.querySelector('.inputItem_container__o31iB');
        const plusButton = chooserDiv.querySelector('#mais');      
        plusButton.click(); 
        await this.sleep(500)
        plusButton.click();
        await this.sleep(1000)
        const counter = chooserDiv.querySelector('input[type="text"]');
        const counterValue = parseInt(counter.value, 10);
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
      
        if (complement.match(/^Selecione (\d+) item/)) {
          const itemCount = parseInt(complement.match(/^Selecione (\d+) item/)[1], 10);
          if (itemCount !== 1) {
            type = 'Mais de uma opcao ' + repetition;
            minQtd = itemCount;
            maxQtd = itemCount;
            console.log(minQtd,maxQtd)}
        }else if(complement == "Selecione 1 item"){
          type = "Apenas uma opcao";
          minQtd = 1;
          maxQtd = 1;
        }
        else if (complement.startsWith("Selecione até ")) {
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
      let categoryDivs = document.querySelectorAll('.listaProdutos_boxListaProdutos__9fIq6');
    
      for await (const categoryIndex of [...Array(categoryDivs.length).keys()]) {
        await this.sleep(500)
        let categoryDivs = document.querySelectorAll('.listaProdutos_boxListaProdutos__9fIq6');
        let categoryDiv = categoryDivs[categoryIndex];
        let categoryNameElement = categoryDiv.querySelector('h2');
        let categoryName = categoryNameElement ? categoryNameElement.textContent : "";
        let productCards = categoryDiv.querySelectorAll(".listaProdutos_itemInlineDiv__Lpfvs");
    
        let productData = [];
        for await (const productIndex of [...Array(productCards.length).keys()]) {
          await this.sleep(1000)
          let categoryDivs = document.querySelectorAll('.category-container');
          let categoryDiv = categoryDivs[categoryIndex];
          let productCards = categoryDiv.querySelectorAll((".listaProdutos_itemInlineDiv__Lpfvs"));
          let productCard = productCards[productIndex];
          let productTitle = ""
          let productPrice = ""
          let imgSrc = ""
          let productDescricao = ""

          
        let titleElement = productCard.querySelector('h3');
        let priceElement = productCard.querySelector('.ItemInline_preco__uJ1fw');
        let imgElement = productCard.querySelector('img[data-nimg]');
        let descricaoElement = productCard.querySelector('p');
        productTitle = titleElement ? titleElement.textContent : "";
        priceText = priceElement ? priceElement.textContent : "";
        productPrice = priceText.replace(/[^\d,.]/g, '').replace('.', ',')
        imgSrc = imgElement ? imgElement.src : "";
        productDescricao = descricaoElement ? descricaoElement.textContent : "";
        
          let productClickEvent = productCard.querySelector('.ItemInline_itemProdInline__Jdi4l');

          if (productClickEvent) {  
            await this.sleep(500);
            productClickEvent.click();

            await this.sleep(1000)
            
            let complementsDict = []
            let formElement = document.querySelector("form")
            let complementExpandables = formElement.querySelectorAll('div:has(> .opcionais_itemOpcional__ZLk8q)');
            for await (const complementExpandable of complementExpandables) {
              let complementElements = complementExpandable.querySelectorAll('.opcionais_itemOpcional__ZLk8q');
              let optionsComplement = [];
    
              // Pegar o nome de cada complemento
              for await (const complementElement of complementElements) {
                let typeComplementElement = complementElement.querySelector('h4');
                let complementNameElement = complementElement.querySelector('h2');
                
                let typeComplementText = typeComplementElement ? typeComplementElement.textContent : "";

                let [typeComplement, minQtd, maxQtd] = await this.processTypeComplement(typeComplementText, complementExpandable)
                let required = "";
                let complementName = complementNameElement ? complementNameElement.textContent : "";
                // Pegar nome de cada opção do complemento da iteração
                let optionsElement = complementExpandable.querySelectorAll('label');

                for await (const optionElement of optionsElement) {
                  let optionTitleElement = optionElement.querySelector('h3');
                  let optionPriceElement = optionElement.querySelector('div > div > div');
                  //let optionQtdElement = optionElement.querySelector('span.text-grey-3');
                
                  let optionTitle = optionTitleElement ? optionTitleElement.textContent : "";
                  let optionPriceText = optionPriceElement ? optionPriceElement.textContent : "0";
                  let optionPrice = optionPriceText.replace(/[^\d,.]/g, '').replace(',', '.');
                  //let optionQtd = optionQtdElement ? optionQtdElement.textContent : "";
                  let optionDescription = "";
    
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
  
  
  async backPage() {
    await this.sleep(1000);
    let back = document.querySelector('button[ariel-label="Voltar"]')
    if (back) {
      back.click()
  }}
  }
  
  
  // Chame a função desativarAlerta antes de executar outras ações
  desativarAlerta();