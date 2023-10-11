// popup.js

// Função para lidar com o botão no popup HTML
document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('scrapeButton');

  button.addEventListener('click', function() {
    console.log("Iniciando..")
    // Envia uma mensagem para o script de conteúdo (content.js)
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'checkAndScrape' });
    });
  });
});
