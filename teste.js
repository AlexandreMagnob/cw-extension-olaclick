let scrapedData = [];
function sleep(ms) {     return new Promise(resolve => setTimeout(resolve, ms)); }
async function clickProductCards() {
    let categoryDivs = document.querySelectorAll('.category-container[data-v-c24acdb4]');
        console.log(categoryDivs.length)
    for await (const categoryDiv of categoryDivs) {
      let categoryNameElement = categoryDiv.querySelector('span[data-v-c24acdb4]');
      let categoryName = categoryNameElement ? categoryNameElement.textContent : "";
      console.log(categoryName)
        await sleep(400)
        let productCards = categoryDiv.querySelectorAll('.item-card.col-8.category-container__products__product-list__item-card.not-small .item-card-container.row.justify-between');            console.log(productCards.length)
        let productData = [];
        for await (const productCard of productCards){
           await sleep(400)
          if (productCard) {
            await sleep(500)
            productCard.click();

            // Agora, vamos adicionar um atraso antes de coletar os dados.
              await sleep(1500)
              let titleElement = document.querySelector('span.font-5');
              let priceNowElement = document.querySelector('span.price__now.font-3');
              let imgElement = document.querySelector('img');
              let descricaoElement = document.querySelector('span.weight-400');

              let title = titleElement ? titleElement.textContent : "";
              let priceNow = priceNowElement ? priceNowElement.textContent : "";
              let imgSrc = imgElement ? imgElement.src : "";
              let descricao = descricaoElement ? descricaoElement.textContent : "";
              console.log(title)
              let complementsDict = []
              let complementExpandables = document.querySelectorAll('div.expandable');
              for await (const complementExpandable of complementExpandables) {
                await sleep(200)
                let complementElements = complementExpandable.querySelectorAll('div.expandable__fixed.py-2.px-4.pointer.bg-grey-12');
                let optionsComplement = [];

                // Pegar o nome de cada complemento
                for await (const complementElement of complementElements){
                    await sleep(200)
                  let typeComplementElement = complementElement.querySelector('span.expandable__fixed__header__text__subtitle.font-1.text-grey');
                  let requiredElement = complementElement.querySelector('span.expandable__fixed__header__text__required.font-0.ml-2.text-primary');
                  let complementNameElement = complementElement.querySelector('span.expandable__fixed__header__text__title');

                  let typeComplement = typeComplementElement ? typeComplementElement.textContent : "";
                  let required = requiredElement ? requiredElement.textContent : "";
                  let complementName = complementNameElement ? complementNameElement.textContent : "";

                  // Pegar nome de cada opção do complemento da iteração
                  let optionsElement = complementExpandable.querySelectorAll('.chooser');
                  for await (const optionElement of optionsElement) {
                    await sleep(200)
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
                      optionDescription: optionDescription
                    });
                  }

                  complementsDict.push({
                    nameComplement: complementName,
                    typeComplement: typeComplement,
                    required: required,
                    options: optionsComplement,
                  })
                }
              }

              productData.push({
                title: title,
                priceNow: priceNow,
                imgSrc: imgSrc,
                descricao: descricao,
                complementsDict: complementsDict
              });

              scrapedData.push({
                categoryName: categoryName,
                productsCategory: productData
              });
              await backPage();
          }
        else{
            console.log("Produto não foi clicado" (productCard))
        }
        }
    }
  }

  async function backPage() {
    await sleep(2000)
    let back = document.querySelector('#app > div.main-container.w-100.not-small.has-search-bar > div > div.w-100.item-header-container > div.navigation-header.flex.items-center.justify-between.navigation-header--small.bg-white > div:nth-child(1) > div > div');
    if (back){
        back.click()
    }
  }