function clickProductElements() {
    const productElements = document.querySelectorAll('.item-card.col-8.category-container__products__product-list__item-card.not-small[data-v-58044642]');
    
    productElements.forEach((productElement) => {
      try {
        productElement.click();
        console.log(productElement.textContent);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'NotAllowedError') {
          console.log(`Clicar no elemento não é permitido: ${productElement.textContent}`);
        } else {
          console.error(error);
        }
      }
    });
  }
  
  // Escute mensagens da extensão
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'clickProductElements') {
      clickProductElements();
    }
  });