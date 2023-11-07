class Scrapy {
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
    
      console.log(type)
      return [type, minQtd, maxQtd];
    }
    

  async clickProductCards() {
    console.log("executando..")
    await this.sleep(500)
    let categoryDivs = document.querySelectorAll('.panel.panel-danger')
  
    for await (const categoryIndex of [...Array(categoryDivs.length).keys()]) {
      await this.sleep(500)
      let categoryDivs = document.querySelectorAll('.panel.panel-danger')
      let categoryDiv = categoryDivs[categoryIndex];
      let categoryNameElement = categoryDiv.querySelector('.truncate-overflow')
      let categoryName = categoryNameElement ? categoryNameElement.textContent : "";
  
      let productCards = categoryDiv.querySelectorAll('.product-container');
  
      let productData = [];
      for await (const productIndex of [...Array(productCards.length).keys()]) {
        await this.sleep(500)
        let categoryDivs = document.querySelectorAll('.panel.panel-danger')
        let categoryDiv = categoryDivs[categoryIndex];
        let productCards = categoryDiv.querySelectorAll('.product-container');
        let productCard = productCards[productIndex];
  
        let priceElement = productCard.querySelector('.price');
  
        let innerDiv = productCard.querySelector('.product-item');
        if (innerDiv) {
          await this.sleep(500)
          innerDiv.click();

          // Agora, vamos adicionar um atraso antes de coletar os dados.
          await this.sleep(1000)
          let productModal = document.querySelector('.modal-dialog');
          let titleElement = productModal.querySelector('#produtoModalNome');
          console.log(titleElement)
          let imgElement = productModal.querySelector('#produtoModalImagePath');
          let descricaoElement = productModal.querySelector('#produtoModalDescricao')
          let productTitle = titleElement ? titleElement.textContent : "";
          console.log(productTitle)
          let priceText = priceElement ? priceElement.textContent : "";
          let productPrice = priceText.replace(/[^\d,.]/g, '').replace('.', ',')
          let imgSrc = imgElement ? imgElement.src : "";
          let productDescricao = descricaoElement ? descricaoElement.textContent : "";
  
          let complementsDict = []
          let complementExpandables = productModal.querySelectorAll('.panel.panel-danger')
          for await (const complementExpandable of complementExpandables) {
            let complementElements = complementExpandable.querySelector('.panel-heading')
            let optionsComplement = [];
  
            // Pegar o nome de cada complemento
            for await (const complementElement of complementElements) {
              let typeComplementElement = complementElement.querySelector('small');
              let complementNameElement = complementElement.querySelector('.panel-title');
              
              let typeComplementText = typeComplementElement ? typeComplementElement.textContent : "";
              let [typeComplement, minQtd, maxQtd] = await this.processTypeComplement(typeComplementText, complementExpandable)
              let required = requiredElement ? requiredElement.textContent : "";
              let complementName = complementNameElement ? complementNameElement.textContent : "";
              // Pegar nome de cada opção do complemento da iteração
              let optionsElement = complementExpandabledocument.querySelectorAll('.checkbox,.radio,.pb.pt.clearfix');
              for await (const optionElement of optionsElement) {
                if (optionElement.classList.contains('radio')) {
                  // Se a classe for 'radio', trata como um rádio.
                  let optionTitleElement = optionElement.querySelector('label');
                  let optionPriceElement = optionElement.querySelector('.pull-right');
                  
                  let optionTitle = optionTitleElement.textContent.trim();
                  let optionPriceText = optionPriceElement ? optionPriceElement.textContent : "0";
                  let optionPrice = optionPriceText.replace(/[^\d,.]/g, '').replace(',', '.');

                } else if (optionElement.classList.contains('pb') && optionElement.classList.contains('pt')) {
                  let optionText = optionElement.textContent.trim();
                  let regex = /(.+)\(([\d,.]+)\)/;
                  let match = optionText.match(regex);
                
                  let optionTitle = match ? match[1].trim() : "";
                  let optionPrice = match ? match[2].replace(',', '.') : "";
                }
                else if (optionElement.classList.contains('checkbox')) {
                  // Se a classe for 'checkbox', trata como um checkbox.
                  let optionLabelElement = optionElement.querySelector('label');
                  let optionLabelContent = optionLabelElement.textContent.trim();
                  let optionTitle = optionLabelContent.split('+')[0].trim();
                  let optionPriceText = optionLabelContent.split('+')[1].trim();
                  let optionPrice = optionPriceText.replace(/[^\d,.]/g, '').replace(',', '.');
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
      }
      this.scrapedData.push({
        categoryName: categoryName,
        productsCategory: productData
      });
      await this.backPage();
    }
    alert("Finalizado!")
}


async backPage() {
  await this.sleep(1000);
  let productModal = document.querySelector('.modal-dialog');
  let back = productModal.querySelector('fa.fa');
  if (back) {
    back.click()
}}
}


// Exporta a instância da classe Scrapy para uso em popup.js
window.scrapy = new Scrapy();

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.text === 'hi') {
      await window.scrapy.checkAndScrape();
      const scrapedData = window.scrapy.scrapedData
      const titleRestaurant = window.scrapy.titleRestaurant
      await createCSV(scrapedData, titleRestaurant)
  }
});
