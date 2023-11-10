document.addEventListener('DOMContentLoaded', function () {
  const coletarDadosButton = document.getElementById('coletarDados');
  const restauranteCheckbox = document.getElementById('restauranteCheckbox');

  coletarDadosButton.addEventListener('click', async function () {
    const selectedRestaurante = restauranteCheckbox.value;
    var message = { restaurante: selectedRestaurante };

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  });
});
