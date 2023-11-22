class ScrapyHubt {
    constructor() {
      this.scrapedData = [];
      this.titleRestaurant = ""
    }
  
  sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms)); }
  
    
  
  
  async checkRepetition(complementExpandable) {
        if(complementExpandable){
        return { repetition: "sem repeticao" };
        }
}

        async processTypeComplement(typeComplement,complementExpandable) {
            console.log('typeComplement:', typeComplement);
            let { repetition } = await this.checkRepetition(complementExpandable);
            console.log('repetition:', repetition);
            let type = "Apenas uma opção " + repetition;
            let minQtd = 1;
            let maxQtd = 1;

           
            return [type, minQtd, maxQtd];
        }

      
  
    async clickProductCards() {
      console.log("executando..")
      await this.sleep(1000)
      let categoryDivs = document.querySelectorAll('.cardapio-module');
    
      for await (const categoryIndex of [...Array(categoryDivs.length).keys()]) {
        await this.sleep(500)
        let categoryDivs = document.querySelectorAll('.cardapio-module');
        let categoryDiv = categoryDivs[categoryIndex];
        let categoryNameElement = categoryDiv.querySelector('.module-title');
        let categoryName = categoryNameElement ? categoryNameElement.textContent : "";
        let productCards = categoryDiv.querySelectorAll(".ProductModule__ItemContainer-sc-1kmcc3y-0");
    
        let productData = [];
        for await (const productIndex of [...Array(productCards.length).keys()]) {
          await this.sleep(1000)
          let categoryDivs = document.querySelectorAll('.cardapio-module');
          let categoryDiv = categoryDivs[categoryIndex];
          let productCards = categoryDiv.querySelectorAll((".ProductModule__ItemContainer-sc-1kmcc3y-0"));
          let productCard = productCards[productIndex];
          
  
            await this.sleep(500);
            productCard.scrollIntoView();
            productCard.click();
            await this.sleep(1000);

            let productModal = document.querySelector('.sc-fzplWN.hRBsWH.sc-fzpjYC.kBSpHI')
            let titleElement = productModal.querySelector('.ProductItemDialog__DialogProductTitle-j5dr03-0');
            let priceElement = "";

            if(productModal.querySelector('.price-Único')){
            priceElement = productModal.querySelector('price-description');
            }

            



            let imgElement = productModal.querySelector('.DialogHeaderImage-sc-127fjht-0.ProductItemDialog__ProductHeaderImage-j5dr03-19.jgyFGh');
            let imageUrl = imgElement ? window.getComputedStyle(imgElement).backgroundImage.replace(/^url\(["'](.+)["']\)$/, '$1') : null;
            let descricaoElement = productModal.querySelector('.ProductItemDialog__ProductDescription-j5dr03-2.bxZGzY');
            let productTitle = titleElement ? titleElement.textContent : "";
            let priceText = priceElement ? priceElement.textContent : "";
            let productPrice = priceText.replace(/[^\d,.]/g, '').replace('.', ',')
            let imgSrc = imageUrl ? imageUrl : "";
            let productDescricao = descricaoElement ? descricaoElement.textContent : "";
    
            let complementsDict = []
            
            let complementExpandables = document.querySelectorAll('.ProductItemDialog__PriceList-j5dr03-5.hLOrDr');

            for await (const complementExpandable of complementExpandables) {

              let optionsComplement = [];
                
                let typeComplementText = "Escolhe um Complemento"
                let [typeComplement, minQtd, maxQtd] = await this.processTypeComplement(typeComplementText, complementExpandable)
                  
                let required = "";
                let complementName = "";

                if(!productModal.querySelector('.price-Único')){
                 complementName =  "Escolha um complemento";
                }
                // Pegar nome de cada opção do complemento da iteração
                let optionsElement = complementExpandable.querySelectorAll('.ProductItemDialog__PriceItem-j5dr03-6.cRxigD');
                for await (const optionElement of optionsElement) {
                  let optionTitleElement = optionElement.querySelector('span.price-description');
                  let optionPriceElement = optionElement.querySelector('.price-value');
                  
    
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
                console.log("- - - - - - - - - - - - - - - - - ")
                console.log("NOME DO COMPLEMENTO: ",complementName)
                console.log("TEXTO DO TIPO DO COMPLEMENTO: ",typeComplementText.trim())
                console.log("TIPO DO COMPLEMENT: ",typeComplement)
                console.log("QUANTIDADE MIN: ",minQtd)
                console.log("QUANTIDADE MAX: ",maxQtd)
                console.log("REQUERED: ",required)
                console.log("OPÇOES: ",optionsComplement)
                console.log("- - - - - - - - - - - - - - - - - ")
                console.log("                                  ")
              
            }
    
            productData.push({
              title: productTitle,
              price: productPrice,
              imgSrc: imgSrc,
              descricao: productDescricao,
              complementsDict: complementsDict
            });
            console.log("- - - - - - - - - - - - - - - - - ")
            console.log("NOME PRODUTO: ", productTitle)
            console.log("PREÇO PRODUTO: ", productPrice)
            console.log("IMAGEM: ", imgSrc)
            console.log("DESCRIÇAO: ", productDescricao)
            console.log("- - - - - - - - - - - - - - - - - ")
            console.log("                                  ")
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
    let back = document.querySelector('.sc-AxirZ.sc-fzokOt.DAMdR')
    if (back) {
      back.click()
  }}
  }
  
 