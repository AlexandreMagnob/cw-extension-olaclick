class HandlerScrapy {
    constructor() {
      // Inicializa as instâncias dos scrapers
      this.scrapyDino = new ScrapyDino();
      this.scrapyAnotai = new ScrapyAnotai();
      this.scrapyOlaClick = new ScrapyOlaClick();
      this.scrapyHubt = new ScrapyHubt();
      this.scrapyJotaja = new ScrapyJotaja();
      this.ScrapyYooga = new ScrapyYooga();
      this.ScrapySaipos = new ScrapySaipos();
    }
  
    async handleScrapyChoice(restaurante) {
      // Decide qual scraper usar com base no restaurante escolhido pelo usuário
      if (restaurante === 'Dino') {
        await this.scrapyDino.clickProductCards();
        const scrapedData = this.scrapyDino.scrapedData
        alert("Finalizado")
        const titleRestaurant = this.scrapyDino.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)

      } else if (restaurante === 'Anotai') {
        await this.scrapyAnotai.checkAndScrape();
        const scrapedData = this.scrapyAnotai.scrapedData
        alert("Finalizado")
        const titleRestaurant = this.scrapyAnotai.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)

      } else if (restaurante === 'OlaClick') {
        await this.scrapyOlaClick.clickProductCards()
        const scrapedData = this.scrapyOlaClick.scrapedData
        alert("Finalizado")
        const titleRestaurant = this.scrapyOlaClick.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)

      }else if (restaurante === 'Hubt') {
        await this.scrapyHubt.clickProductCards()
        const scrapedData = this.scrapyHubt.scrapedData
        alert("Finalizado")
        const titleRestaurant = this.scrapyHubt.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)

      }else if (restaurante === 'Jotaja') {
        await this.scrapyJotaja.clickProductCards()
        const scrapedData = this.scrapyJotaja.scrapedData
        alert("Finalizado")
        const titleRestaurant = this.scrapyJotaja.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)

      }else if (restaurante === 'Yooga') {
        await this.ScrapyYooga.clickProductCards()
        const scrapedData = this.ScrapyYooga.scrapedData
        alert("Finalizado")
        const titleRestaurant = this.ScrapyYooga.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)

      }else if (restaurante === 'Saipos') {
        await this.ScrapySaipos.clickProductCards()
        const scrapedData = this.ScrapySaipos.scrapedData
        alert("Finalizado")
        const titleRestaurant = this.ScrapySaipos.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)

      }
       else {
        console.error('Restaurante inválido');
      }
    }
  }
  
  // Exporta a classe HandlerScrapy
  window.HandlerScrapy = HandlerScrapy;
  
  // Escuta mensagens enviadas pelo popup.js
  chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    if (request.restaurante) {
        const handlerScrapy = new HandlerScrapy();
        await handlerScrapy.handleScrapyChoice(request.restaurante);
    }
  });
  