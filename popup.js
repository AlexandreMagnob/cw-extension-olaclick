// Função para injetar o script na página atual
async function injectScript(tabId) {
  try {
    // Injeta o script na página atual
    const [tab] = await chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: scrapeData
    });

    // Exibe o resultado na página do popup
    const jsonDisplay = document.getElementById('json-display');
    const jsonData = JSON.stringify(tab.result, null, 2); // Converte o objeto em uma string JSON formatada
    jsonDisplay.textContent = jsonData;
  } catch (error) {
    console.error('Erro ao injetar o script:', error);
  }
}

// Função para lidar com o clique no botão
document.getElementById('scrape-button').addEventListener('click', () => {
  // Obtém a guia ativa
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      // Chama a função para injetar o script na guia ativa
      injectScript(tabs[0].id);
    }
  });
});
