const fs = require('fs');
const Papa = require('papaparse');

function createCSVFromJSON(jsonFilePath) {
  try {
    // Lê o arquivo JSON
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    const data = JSON.parse(jsonData);

    const csvData = [];

    // Cabeçalho do CSV
    csvData.push([
      'TIPO',
      'NOME',
      'DESCRIÇÃO',
      'VALOR',
      'IMAGEM',
      'CODIGO PDV',
      'DISPONIBILIDADE DO ITEM',
      'TIPO COMPLEMENTO',
      'QTDE MINIMA',
      'QTDE MAXIMA',
      'CALCULO DOS COMPLEMENTOS',
    ]);

    data.forEach(categoryData => {
      const categoryName = categoryData.categoryName;
      csvData.push(['Categoria', categoryName]);

      categoryData.productsCategory.forEach(productData => {
        const productName = productData.title;
        const productDescription = productData.descricao;
        const productPrice = productData.price;
        const imgSrc = productData.imgSrc;
        const codigoPdv = ''; // Adicione o código PDV aqui, se tiver

        // Preencha os campos de código PDV e disponibilidade do item, se disponíveis
        if (codigoPdv && productData.disponibilidade) {
          const disponibilidade = productData.disponibilidade;
          csvData.push(['Produto', productName, productDescription, productPrice, imgSrc, codigoPdv, disponibilidade]);
        } else {
          csvData.push(['Produto', productName, productDescription, productPrice, imgSrc]);
        }

        productData.complementsDict.forEach(complementData => {
          const complementName = complementData.nameComplement;
          const complementType = complementData.typeComplement;
          const complementRequired = complementData.required ? 'Obrigatório' : 'Não';
          const complementMinQtd = complementData.minQtd;
          const complementMaxQtd = complementData.maxQtd;

          csvData.push(['Complemento', complementName, '', '', '', '', '', complementType, complementMinQtd, complementMaxQtd]);

          complementData.options.forEach(option => {
            const optionName = option.optionTitle;
            const optionPrice = option.optionPrice;
            const optionMaxQtd = option.optionQtd;

            csvData.push(['Opção', optionName, '', optionPrice, '', '', '', '', '', optionMaxQtd]);
          });
        });
      });
    });

    // Gerar a string CSV
    const csv = Papa.unparse(csvData);

    // Especifique o caminho onde você deseja salvar o arquivo CSV
    const csvFilePath = 'explosao_acai.csv';

    // Escrever o conteúdo do CSV no arquivo
    fs.writeFileSync(csvFilePath, csv, 'utf8');
    console.log('Arquivo CSV criado com sucesso em:', csvFilePath);
  } catch (error) {
    console.error('Erro ao processar o arquivo JSON:', error);
  }
}

// Especifique o caminho para o arquivo JSON com os dados
const jsonFilePath = 'a.json'; // Substitua pelo caminho do seu arquivo JSON

// Chame a função para criar o arquivo CSV
createCSVFromJSON(jsonFilePath);
