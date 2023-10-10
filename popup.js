// Seleciona o botão e o elemento de exibição de texto no popup HTML
const scrapeButton = document.getElementById('scrape-button');
const textDisplay = document.getElementById('text-display');

// Manipulador de clique para o botão
scrapeButton.addEventListener('click', () => {
  // Acesse os dados raspados diretamente da instância de Scrapy em content.js
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: () => {
          // Acesse os dados raspados diretamente
          return window.scrapy.scrapedData;
        },
      },
      (results) => {
        if (chrome.runtime.lastError) {
          textDisplay.textContent = 'Erro ao acessar os dados raspados.';
          console.error(chrome.runtime.lastError);
        } else {
          // Exiba os dados diretamente no elemento de exibição de texto
          const scrapedData = results[0].result;
          textDisplay.textContent = scrapedData;
        }
      }
    );
  });
});
