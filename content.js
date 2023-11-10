class Scrapy {
  constructor() {
    this.scrapedData = [];
    this.titleRestaurant = ""
  }

  sleep(ms) {     return new Promise(resolve => setTimeout(resolve, ms)); }

    async processTypeComplement(complementExpandable) {
      let typeOption = complementExpandable.querySelector('.checkbox,.radio,.pb.pt');
      if (typeOption.classList.contains('radio')) {

        type = "Apenas uma opcao"
        minQtd = 0
        maxQtd = 1
        return [type, minQtd, maxQtd]

      } else if (typeOption.classList.contains('pb') && typeOption.classList.contains('pt')) {

        let buttonGroup = complementExpandable.querySelector('.input-group')
        let buttonPlus = buttonGroup.querySelector('.btn.btn-default.btn-plus')
        let minQtd = buttonGroup.querySelector('.form-control.text-center').value
        let maxQtd = ""
        
        buttonPlus.click()
        buttonPlus.click()
        await this.sleep(200)
        let repetion = ""
        let counter = buttonGroup.querySelector('.form-control.text-center')
        let counterValue = parseInt(counter.value, 10); 
        if (counterValue > 1) {
          repetion = " com repeticao";
        } else {
          repetion = " sem repeticao";
        }
        let type = "Mais de uma opcao" + repetion
        return [type, minQtd, maxQtd];
      }

      else if (typeOption.classList.contains('checkbox')) {
        let minQtd = "0"
        let maxQtd = ""
        let type = "Mais de uma opcao com repeticao"
        return [type, minQtd, maxQtd];
      }
      
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
            let complementElements = complementExpandable.querySelectorAll('.panel-heading')
            let optionsComplement = [];
            // Pegar o nome de cada complemento
            for await (const complementElement of complementElements) {
              let typeComplementElement = complementElement.querySelector('small');
              let complementNameElement = complementElement.querySelector('.panel-title');
              
              let typeComplementText = typeComplementElement ? typeComplementElement.textContent : "";
              let [typeComplement, minQtd, maxQtd] = await this.processTypeComplement(complementExpandable);
              let required = requiredElement ? requiredElement.textContent : "";
              let complementName = complementNameElement ? complementNameElement.textContent : "";
              
              // Pegar nome de cada opção do complemento da iteração
              let optionsElement = complementExpandable.querySelectorAll('.checkbox,.radio,.pb.pt');
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
                  
                  if (optionLabelElement) {
                    let optionLabelContent = optionLabelElement.textContent.trim();
                    let optionTitle = optionLabelContent.split('+')[0].trim();
                    let optionPriceText = optionLabelContent.split('+')[1];
                    let optionPrice = optionPriceText.replace(/[^\d,.]/g, '').replace(',', '.');
                  }
                  else{
                    let optionPrice = ""
                  }
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
      await window.scrapy.clickProductCards();
      const scrapedData = window.scrapy.scrapedData
      const titleRestaurant = window.scrapy.titleRestaurant
      await createCSV(scrapedData, titleRestaurant)
  }
});
