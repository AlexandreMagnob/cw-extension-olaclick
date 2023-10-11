document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('scrapeButton');

  button.addEventListener('click', function() {
    // Envia uma mensagem para o script de conteúdo (content.js)
    console.log("iniciando...")
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'checkAndScrape' }, function(scrapedData) {
        // Verificar se os dados foram coletados
        if (scrapedData && scrapedData.length > 0) {
          // Chamar a função para criar e baixar o arquivo CSV
          createCSV(scrapedData);
        } else {
          console.log('Nenhum dado coletado.');
        }
      });
    });
  });
});
