// Adicione um listener para mensagens
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'dadosColetados') {
    const dados = message.dados;
    // Faça algo com os dados recebidos
  }
});


function sleep(ms) {     return new Promise(resolve => setTimeout(resolve, ms)); }



