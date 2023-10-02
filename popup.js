// Função para lidar com o clique no botão
document.getElementById('scrape-button').addEventListener('click', () => {
  // Execute um script na guia ativa para injetar e chamar a função scrapeData
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js'] // Injeta o content.js na página ativa
      }, () => {
        // Após a injeção do script, chame a função scrapeData
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: () => {
            // Chame a função scrapeData definida no content.js
            return scrapeData();
          }
        }, (results) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
          } else {
            try {
              // Os resultados conterão o valor retornado pela função scrapeData
              const scrapedData = results[0];
              console.log(scrapedData); // Exibe os dados no console
            } catch (error) {
              console.error('Erro ao processar os dados:', error);
            }
          }
        });
      });
    }
  });
});
