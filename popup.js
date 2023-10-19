document.addEventListener('DOMContentLoaded', function () {
  const coletarDadosButton = document.getElementById('coletarDados');
  coletarDadosButton.addEventListener('click', async function () {

      var message = { text: 'hi' };
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, message);
      });
      
  });

});