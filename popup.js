document.addEventListener('DOMContentLoaded', function () {
  const coletarDadosButton = document.getElementById('coletarDados');
  coletarDadosButton.addEventListener('click', async function () {
    // Coletar os dados e gerar a planilha
    alert("Iniciando...")
    await window.scrapy.clickProductCards();
    window.scrapy.sleep(2000)// Isso chamará a função checkAndScrape da classe Scrapy
    const scrapedData = window.scrapy.scrapedData;
    await createCSV(scrapedData); // Isso chamará a função createCSV para gerar a planilha
    // Você pode adicionar qualquer lógica adicional aqui, se necessário
  });
});
