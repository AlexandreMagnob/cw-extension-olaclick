const Papa = require('papaparse');

function createCSV(scrapedData) {
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
  
    scrapedData.forEach(categoryData => {
      const categoryName = categoryData.categoryName;
      csvData.push(['Categoria', categoryName]);
  
      categoryData.productsCategory.forEach(productData => {
        const productName = productData.title;
        const productDescription = productData.descricao;
        const productPrice = productData.priceNow;
        const imgSrc = productData.imgSrc;
  
        csvData.push(['Produto', productName, productDescription, productPrice, imgSrc]);
  
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
  
    // Converter para CSV usando a biblioteca papaparse
    const csv = Papa.unparse(csvData);
  
    return csv;
  }
  
  // Exemplo de uso
  const scrapedData = [
    {
        "categoryName": "Promoção: Pizza Grande  + Broto + Guaraná 1.5L - Com Entrega Grátis !!",
        "productsCategory": [
            {
                "title": "Garanta Sua Pizza + 1 Broto + Guaraná !!",
                "priceNow": " R$ 69,90",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/648e1dc76e300a001cb43670/648e1dc76e300a001cb43671-1691103536428blob_600",
                "descricao": "Pizza + Um Brotinho a Sua Escolha + Guaraná 1,5L !!",
                "complementsDict": [
                    {
                        "nameComplement": "Escolha até 2 Sabores",
                        "typeComplement": "Escolha de 1 até 2 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " 1/2 - 2 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Catupiry e Mussarela.\n"
                            },
                            {
                                "optionTitle": " 1/2 - 3 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Provolone, Gorgonzola e Parmesão.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Alho Frito ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela,  Rodelas de Tomate e Cobertura de Alho Frito.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela, Cobertura de Bacon e Parmesão Ralado.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Baiana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa Moída , Ovos , Cebola e Pimenta Calabresa.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Banana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Banana com Canela e Cobertura de Leite Condensado.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Bauru ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Presunto , Rodelas de Tomate e Mussarela.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Brigadeiro ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido e Cobertura de Granulado.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Calabresa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Rodelas de Calabresa , Cebola e Mussarela.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Champignon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Champignon, Mussarela e Bacon.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Chocolate ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido.\n"
                            },
                            {
                                "optionTitle": " 1/2 - ChocoNana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Banana com Canela e Cobertura de Chocolate Derretido.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Confeitos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido e Cobertura de Confeitos Coloridos.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Da Roça ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango, Milho e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Fofoca ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Presunto, Catupiry , Mussarela e Parmesão.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Frango Com Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango e Cobertura de Catupiry\n"
                            },
                            {
                                "optionTitle": " 1/2 - Marguerita ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela,  Rodelas de Tomate , Parmesão e Manjericão Fresco.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Milho ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela e Cobertura de Milho.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Completa de Mussarela.\n\n\n"
                            },
                            {
                                "optionTitle": " 1/2 - Napolitana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela, Rodelas de Tomate e Parmesão.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Palmito ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela e Cobertura de Palmito Picado.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Pizza Prestigio ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido e Cobertura de Coco Ralado.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Portuguesa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Presunto, Ovos, Rodelas de Cebola e Mussarela.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Romeu e Julieta ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Mussarela e Cobertura de Goiabada.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Rúcula ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela , Rúcula e Tomate Seco.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Tomate Seco ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela e Pedaços de Tomate Seco.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Toscana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa Moída e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal e Catupiry Derretido.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Calabresa Paulista ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal e Coberta com Calabresa Fatiada e Rodelas de Cebola.\n\nOBS.: Essa Pizza NÃO Contém Mussarela.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Mineira ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango, Palmito Picado, Cebola,   Cobertura de Catupiry e  Bacon.\n"
                            },
                            {
                                "optionTitle": " 1/2 - Duvidosa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa, Molho Artesanal, Presunto, Palmito, Ervilha, Mussarela e Bacon."
                            },
                            {
                                "optionTitle": " 1/2 - Brocolis ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa Fresca, Molho Artesanal , Brócolis, Palmito, Mussarela e Bacon."
                            }
                        ]
                    },
                    {
                        "nameComplement": "Escolha a sua Broto",
                        "typeComplement": "Escolha 1 item",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Broto de Romeu e Julieta  ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Mussarela e Cobertura de Goiabada.\n\n"
                            },
                            {
                                "optionTitle": " Broto Prestigio  ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Chocolate Derretido e Cobertura de Coco Ralado.\n"
                            },
                            {
                                "optionTitle": " Broto de Chocolate  ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Chocolate Derretido.\n"
                            },
                            {
                                "optionTitle": " Broto de Confeitos  ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Chocolate Derretido e Cobertura de Confeitos Coloridos.\n"
                            },
                            {
                                "optionTitle": " Broto de Brigadeiro ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate com Granulado !!"
                            }
                        ]
                    },
                    {
                        "nameComplement": "Guaraná 1,5L",
                        "typeComplement": "Escolha 1 item",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Guaraná 1,5L ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Guaraná Antartica 1,5L"
                            }
                        ]
                    },
                    {
                        "nameComplement": "Que tal deixar ainda mais saborosa?",
                        "typeComplement": "Escolha até 1 item",
                        "required": "",
                        "options": [
                            {
                                "optionTitle": " Borda De Catupiry ",
                                "optionPrice": " R$ 9,99",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda De Cheddar ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda De Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "categoryName": "Pizza + Borda Recheada + Entrega Grátis !!",
        "productsCategory": [
            {
                "title": "GRANDE 35cm (8 Fatias)",
                "priceNow": "",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647d3d0ce62e61002796a7d8/647d3d0ce62e61002796a7d9-1694993173283blob",
                "descricao": "Pizza com até 2 sabores e 8 fatias",
                "complementsDict": [
                    {
                        "nameComplement": "Sabor GRANDE 35cm (8 Fatias)",
                        "typeComplement": "Escolha de 1 até 2 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Pizza 4 Queijos ",
                                "optionPrice": " R$ 59,99",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,Mussarela, Provolone, Catupiry e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza 5 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,Catupiry , Mussarela, Provolone,  Parmesão e Gongorzola.\n\n"
                            },
                            {
                                "optionTitle": " Pizza Brócolis ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Brócolis Temperado, Palmito , Mussarela e Fatias de Bacon.\n\n"
                            },
                            {
                                "optionTitle": " Pizza Pomodoro ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Rodelas de Tomate ,Mussarela, Cobertura de Azeitona Picada e Alho Frito.\n\n"
                            },
                            {
                                "optionTitle": " Pizza de Lombo Canadense ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Lombo Canadense , Rodelas de Tomate e Mussrela.\n\n"
                            },
                            {
                                "optionTitle": " Pizza Especial ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa, Palmito, Cebola , Mussarela e Bacon.\n\n"
                            },
                            {
                                "optionTitle": " Pizza Radical ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Peito de Peru, Mussarela  e Fatias de Bacon\n\n"
                            },
                            {
                                "optionTitle": " Pizza Mineira ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango, Palmito Picado, Cebola,   Cobertura de Catupiry e  Bacon\n\n"
                            },
                            {
                                "optionTitle": " Pizza Smart da Casa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa,  Catupiry, Cobertura de Mussarela e Bacon\n"
                            },
                            {
                                "optionTitle": " Pizza Do Cliente ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Monte sua Pizza com 4 Ingredientes.\n"
                            },
                            {
                                "optionTitle": " Pizza Delicia ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango,  Palmito Picado , Cobertura de Mussarela e Bacon.\n"
                            },
                            {
                                "optionTitle": " Pizza De Carne Seca ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Carne Seca, Cebola e Cobertura de Mussarela.\n\n"
                            },
                            {
                                "optionTitle": " Pizza De Peperoni ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Rodelas de Peperoni , Cebola e Mussarela.\n\n"
                            },
                            {
                                "optionTitle": " Pizza  De Atum  ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Atum e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Mexicana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Atum, Palmito Picado, Cobertura de Catupiry.\n\n"
                            },
                            {
                                "optionTitle": " Pizza Caribe ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Atum, Ovos, Cebola e Cobertura de Mussarela.\n\n"
                            },
                            {
                                "optionTitle": " Pizza Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Completa de Mussarela."
                            },
                            {
                                "optionTitle": " Pizza 2 Queijo ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Catupiry e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza 3 Queijo ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Provolone, Gongorzola e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza Portuguesa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa Artesanal, Molho Fresco, Presunto, Ovo, Cebola e Mussarela."
                            },
                            {
                                "optionTitle": " Pizza de Frango Com Catupiry. ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango e Cobertura de Catupiry\n"
                            },
                            {
                                "optionTitle": " Pizza Bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela, Cobertura de Bacon e Parmesão Ralado.\n"
                            },
                            {
                                "optionTitle": " Pizza Fofoca ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Presunto, Catupiry , Mussarela e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza Da Roça ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango, Milho e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Toscana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabrasa Moída e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Bauru ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Presunto , Rodelas de Tomate e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Calabresa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Rodelas de Calabresa , Cebola e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Baiana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa Moída , Ovos , Cebola e Pimenta Calabresa.\n"
                            },
                            {
                                "optionTitle": " Pizza Tomate Seco ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela e Pedaços de Tomate Seco.\n"
                            },
                            {
                                "optionTitle": " Pizza Palmito ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela e Cobertura de Palmito Picado.\n"
                            },
                            {
                                "optionTitle": " Pizza Milho ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela e Cobertura de Milho.\n"
                            },
                            {
                                "optionTitle": " Pizza Champignon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Champignon, Mussarela e Bacon.\n"
                            },
                            {
                                "optionTitle": " Pizza Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa, Molho Artesanal do Chefe, Coberta com Catupiry.\n\nOBS.: ESSA PIZZA NÃO CONTÉM MUSSARELA."
                            },
                            {
                                "optionTitle": " Pizza Alho Frito ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela,  Rodelas de Tomate e Cobertura de Alho Frito.\n"
                            },
                            {
                                "optionTitle": " Pizza Marguerita  ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela,  Rodelas de Tomate , Parmesão e Manjericão Fresco."
                            },
                            {
                                "optionTitle": " Pizza de Rúcula  ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela , Rúcula e Tomate Seco.\n"
                            },
                            {
                                "optionTitle": " Pizza Napolitana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela, Rodelas de Tomate e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza de Calabresa Paulista ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa Fatiada e Cebola.\n\nOBS.: Essa Pizza NÃO Contém Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Mineira ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal , Frango, Palmito, Cebola, Catupiry e Bacon."
                            },
                            {
                                "optionTitle": " Duvidosa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa, Molho Artesanal, Presunto, Palmito, Ervilha, Mussarela e Bacon."
                            },
                            {
                                "optionTitle": " Brócolis ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa Fresca, Molho Artesanal, Brócolis, Palmito, Mussarela e Bacon."
                            }
                        ]
                    },
                    {
                        "nameComplement": "Borda GRANDE 35cm (8 Fatias)",
                        "typeComplement": "Escolha até 1 item",
                        "required": "",
                        "options": [
                            {
                                "optionTitle": " Sem Borda !! ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda Borda de Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda Borda de Cheddar ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda Borda de Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            }
                        ]
                    }
                ]
            },
            {
                "title": "GIGANTE 40cm (12 Fatias)",
                "priceNow": "",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647d3d0ce62e61002796a7d8/64d5495de2bd04001c6d7547-1694993173530blob",
                "descricao": "Pizza com até 3 sabores e 12 fatias",
                "complementsDict": [
                    {
                        "nameComplement": "Sabor GIGANTE 40cm (12 Fatias)",
                        "typeComplement": "Escolha de 1 até 3 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Pizza Mussarela ",
                                "optionPrice": " R$ 69,99",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Completa de Mussarela."
                            },
                            {
                                "optionTitle": " Pizza 4 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,Mussarela, Provolone, Catupiry e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza 5 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,Catupiry , Mussarela, Provolone,  Parmesão e Gongorzola.\n\n"
                            },
                            {
                                "optionTitle": " Pizza Brócolis ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Brócolis Temperado, Palmito , Mussarela e Fatias de Bacon.\n\n"
                            },
                            {
                                "optionTitle": " Pizza Pomodoro ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Rodelas de Tomate ,Mussarela, Cobertura de Azeitona Picada e Alho Frito.\n\n"
                            },
                            {
                                "optionTitle": " Pizza de Lombo Canadense ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Lombo Canadense , Rodelas de Tomate e Mussrela.\n\n"
                            },
                            {
                                "optionTitle": " Pizza Especial ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa, Palmito, Cebola , Mussarela e Bacon.\n\n"
                            },
                            {
                                "optionTitle": " Pizza Radical ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Peito de Peru, Mussarela  e Fatias de Bacon\n\n"
                            },
                            {
                                "optionTitle": " Pizza Mineira ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango, Palmito Picado, Cebola,   Cobertura de Catupiry e  Bacon\n\n"
                            },
                            {
                                "optionTitle": " Pizza Smart da Casa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa,  Catupiry, Cobertura de Mussarela e Bacon\n"
                            },
                            {
                                "optionTitle": " Pizza Do Cliente ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Monte sua Pizza com 4 Ingredientes.\n"
                            },
                            {
                                "optionTitle": " Pizza Delicia ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango,  Palmito Picado , Cobertura de Mussarela e Bacon.\n"
                            },
                            {
                                "optionTitle": " Pizza De Carne Seca ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Carne Seca, Cebola e Cobertura de Mussarela.\n\n"
                            },
                            {
                                "optionTitle": " Pizza De Peperoni ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Rodelas de Peperoni , Cebola e Mussarela.\n\n"
                            },
                            {
                                "optionTitle": " Pizza  De Atum  ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Atum e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Mexicana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Atum, Palmito Picado, Cobertura de Catupiry.\n\n"
                            },
                            {
                                "optionTitle": " Pizza Caribe ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Atum, Ovos, Cebola e Cobertura de Mussarela.\n\n"
                            },
                            {
                                "optionTitle": " Pizza 2 Queijo ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Catupiry e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza 3 Queijo ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Provolone, Gongorzola e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza Portuguesa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa Artesanal, Molho Fresco, Presunto, Ovo, Cebola e Mussarela."
                            },
                            {
                                "optionTitle": " Pizza de Frango Com Catupiry. ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango e Cobertura de Catupiry\n"
                            },
                            {
                                "optionTitle": " Pizza Bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela, Cobertura de Bacon e Parmesão Ralado.\n"
                            },
                            {
                                "optionTitle": " Pizza Fofoca ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Presunto, Catupiry , Mussarela e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza Da Roça ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango, Milho e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Toscana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabrasa Moída e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Bauru ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Presunto , Rodelas de Tomate e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Calabresa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Rodelas de Calabresa , Cebola e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Baiana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa Moída , Ovos , Cebola e Pimenta Calabresa.\n"
                            },
                            {
                                "optionTitle": " Pizza Tomate Seco ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela e Pedaços de Tomate Seco.\n"
                            },
                            {
                                "optionTitle": " Pizza Palmito ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela e Cobertura de Palmito Picado.\n"
                            },
                            {
                                "optionTitle": " Pizza Milho ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela e Cobertura de Milho.\n"
                            },
                            {
                                "optionTitle": " Pizza Champignon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Champignon, Mussarela e Bacon.\n"
                            },
                            {
                                "optionTitle": " Pizza Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa, Molho Artesanal do Chefe, Coberta com Catupiry.\n\nOBS.: ESSA PIZZA NÃO CONTÉM MUSSARELA."
                            },
                            {
                                "optionTitle": " Pizza Alho Frito ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela,  Rodelas de Tomate e Cobertura de Alho Frito.\n"
                            },
                            {
                                "optionTitle": " Pizza Marguerita  ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela,  Rodelas de Tomate , Parmesão e Manjericão Fresco."
                            },
                            {
                                "optionTitle": " Pizza de Rúcula  ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela , Rúcula e Tomate Seco.\n"
                            },
                            {
                                "optionTitle": " Pizza Napolitana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela, Rodelas de Tomate e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza de Calabresa Paulista ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa Fatiada e Cebola.\n\nOBS.: Essa Pizza NÃO Contém Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Mineira ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal , Frango, Palmito, Cebola, Catupiry e Bacon."
                            },
                            {
                                "optionTitle": " Duvidosa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa, Molho Artesanal, Presunto, Palmito, Ervilha, Mussarela e Bacon."
                            },
                            {
                                "optionTitle": " Brócolis ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa Fresca, Molho Artesanal, Brócolis, Palmito, Mussarela e Bacon."
                            }
                        ]
                    },
                    {
                        "nameComplement": "Borda GIGANTE 40cm (12 Fatias)",
                        "typeComplement": "Escolha até 1 item",
                        "required": "",
                        "options": [
                            {
                                "optionTitle": " Sem Borda !! ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda Borda de Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda Borda de Cheddar ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda Borda de Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "categoryName": "Duas Pizzas Grande Por R$99,90 - Com Entrega Grátis !!",
        "productsCategory": [
            {
                "title": "Duas Pizzas Por R$99,00",
                "priceNow": " R$ 99,90",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/64950ffa42a89e001c2ae884/64951069abc4d8001c26be10blob_600",
                "descricao": "Pizza tamanho grande 35cm (8 Fatias)",
                "complementsDict": [
                    {
                        "nameComplement": "Escolha a primeira pizza - até 2 sabores",
                        "typeComplement": "Escolha de 1 até 2 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Pizza Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Completa de Mussarela."
                            },
                            {
                                "optionTitle": " Pizza 2 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Catupiry e Mussarela"
                            },
                            {
                                "optionTitle": " Pizza 3 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Provolone, Gorgonzola e Parmesão."
                            },
                            {
                                "optionTitle": " Pizza Portuguesa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Presunto, Ovos, Rodelas de Cebola e Mussarela."
                            },
                            {
                                "optionTitle": " Pizza de Frango Com Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango e Cobertura de Catupiry"
                            },
                            {
                                "optionTitle": " Pizza Bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela, Cobertura de Bacon e Parmesão Ralado."
                            },
                            {
                                "optionTitle": " Pizza Fofoca ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Presunto, Catupiry, Mussarela e Parmesão."
                            },
                            {
                                "optionTitle": " Pizza da Roça ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango, Milho e Cobertura de Mussarela."
                            },
                            {
                                "optionTitle": " Pizza Toscana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa Moída e Cobertura de Mussarela"
                            },
                            {
                                "optionTitle": " Pizza Bauru ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Presunto, Rodelas de Tomate e Mussarela."
                            },
                            {
                                "optionTitle": " Pizza Calabresa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Rodelas de Calabresa, Cebola e Mussarela."
                            },
                            {
                                "optionTitle": " Pizza Baiana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa Moída, Ovos, Cebola e Pimenta Calabresa.\n\nObs: ESSA PIZZA NÃO CONTÉM MUSSARELA"
                            },
                            {
                                "optionTitle": " Pizza Tomate Seco ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela e Pedaços de Tomate Seco."
                            },
                            {
                                "optionTitle": " Pizza Palmito ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela e Cobertura de Palmito Picado"
                            },
                            {
                                "optionTitle": " Pizza Milho ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela e Cobertura de Milho."
                            },
                            {
                                "optionTitle": " Pizza de Champignon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Champignon, Mussarela e Bacon."
                            },
                            {
                                "optionTitle": " Pizza Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa, Molho Artesanal do Chefe, Coberta com Catupiry.\n\nObs: ESSA PIZZA NÃO CONTÉM MUSSARELA."
                            },
                            {
                                "optionTitle": " Pizza Alho Frito ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela, Rodelas de Tomate e Cobertura de Alho Frito."
                            },
                            {
                                "optionTitle": " Pizza de Marguerita ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela, Rodelas de Tomate, Parmesão e Manjericão Fresco."
                            },
                            {
                                "optionTitle": " Pizza de Rúcula ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela, Rúcula e Tomate Seco."
                            },
                            {
                                "optionTitle": " Pizza Napolitana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela, Rodelas de Tomate e Parmesão."
                            },
                            {
                                "optionTitle": " Pizza de Calabresa Paulista ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa Fatiada e Cebola\n\nObs: Essa Pizza NÃO Contém Mussarela."
                            },
                            {
                                "optionTitle": " Pizza Mineira ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango, Palmito, Cebola, Catupiry e Bacon."
                            }
                        ]
                    },
                    {
                        "nameComplement": "Escolha a borda da primeira pizza",
                        "typeComplement": "Escolha até 1 item",
                        "required": "",
                        "options": [
                            {
                                "optionTitle": " Borda de Catupiry ",
                                "optionPrice": " R$ 9,99",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda de Cheddar ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda de Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            }
                        ]
                    },
                    {
                        "nameComplement": "Escolha a segunda pizza - até 2 sabores",
                        "typeComplement": "Escolha de 1 até 2 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Pizza Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Completa de Mussarela."
                            },
                            {
                                "optionTitle": " Pizza 2 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Catupiry e Mussarela"
                            },
                            {
                                "optionTitle": " Pizza 3 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Provolone, Gorgonzola e Parmesão."
                            },
                            {
                                "optionTitle": " Pizza Portuguesa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Presunto, Ovos, Rodelas de Cebola e Mussarela."
                            },
                            {
                                "optionTitle": " Pizza de Frango Com Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango e Cobertura de Catupiry"
                            },
                            {
                                "optionTitle": " Pizza Bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela, Cobertura de Bacon e Parmesão Ralado."
                            },
                            {
                                "optionTitle": " Pizza Fofoca ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Presunto, Catupiry, Mussarela e Parmesão."
                            },
                            {
                                "optionTitle": " Pizza da Roça ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango, Milho e Cobertura de Mussarela."
                            },
                            {
                                "optionTitle": " Pizza Toscana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa Moída e Cobertura de Mussarela"
                            },
                            {
                                "optionTitle": " Pizza Bauru ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Presunto, Rodelas de Tomate e Mussarela."
                            },
                            {
                                "optionTitle": " Pizza Calabresa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Rodelas de Calabresa, Cebola e Mussarela."
                            },
                            {
                                "optionTitle": " Pizza Baiana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa Moída, Ovos, Cebola e Pimenta Calabresa.\n\nObs: ESSA PIZZA NÃO CONTÉM MUSSARELA"
                            },
                            {
                                "optionTitle": " Pizza Tomate Seco ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela e Pedaços de Tomate Seco."
                            },
                            {
                                "optionTitle": " Pizza Palmito ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela e Cobertura de Palmito Picado"
                            },
                            {
                                "optionTitle": " Pizza Milho ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela e Cobertura de Milho."
                            },
                            {
                                "optionTitle": " Pizza de Champignon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Champignon, Mussarela e Bacon."
                            },
                            {
                                "optionTitle": " Pizza Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa, Molho Artesanal do Chefe, Coberta com Catupiry.\n\nObs: ESSA PIZZA NÃO CONTÉM MUSSARELA."
                            },
                            {
                                "optionTitle": " Pizza Alho Frito ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela, Rodelas de Tomate e Cobertura de Alho Frito."
                            },
                            {
                                "optionTitle": " Pizza de Marguerita ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela, Rodelas de Tomate, Parmesão e Manjericão Fresco."
                            },
                            {
                                "optionTitle": " Pizza de Rúcula ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela, Rúcula e Tomate Seco."
                            },
                            {
                                "optionTitle": " Pizza Napolitana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela, Rodelas de Tomate e Parmesão."
                            },
                            {
                                "optionTitle": " Pizza de Calabresa Paulista ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa Fatiada e Cebola\n\nObs: Essa Pizza NÃO Contém Mussarela."
                            },
                            {
                                "optionTitle": " Pizza Mineira ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango, Palmito, Cebola, Catupiry e Bacon."
                            }
                        ]
                    },
                    {
                        "nameComplement": "Escolha a borda da segunda pizza",
                        "typeComplement": "Escolha até 1 item",
                        "required": "",
                        "options": [
                            {
                                "optionTitle": " Borda de Catupiry ",
                                "optionPrice": " R$ 9,99",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda de Cheddar ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda de Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "categoryName": "Os Combos Smart",
        "productsCategory": [
            {
                "title": "Combo Pizza Grande + 5 Esfihas + Bebida",
                "priceNow": " R$ 79,90",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b606880e2a000122420f1/647b606880e2a00012242115blob_600",
                "descricao": "1 Pizza Salgada ou Doce + 5 Deliciosas Esfihas ( Carne, Queijo ou Calabresa )+ 1 Refrigerante 2l (Guaraná, Guaraná Zero, Pepsi)",
                "complementsDict": [
                    {
                        "nameComplement": "Qual sabor da sua pizza?",
                        "typeComplement": "Escolha 1 item",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Pizza 2 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Catupiry e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza  3 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Provolone, Gorgonzola e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza  4 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela, Provolone, Catupiry e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza 5 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Catupiry , Mussarela, Provolone,  Parmesão e Gorgonzola.\n\n\n\nObs: Essa pizza não leva mussarela"
                            },
                            {
                                "optionTitle": " Pizza De Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal e Catupiry Derretido.\n"
                            },
                            {
                                "optionTitle": " Pizza  Marguerita ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela,  Rodelas de Tomate , Parmesão e Manjericão Fresco.\n"
                            },
                            {
                                "optionTitle": " Pizza De Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Completa de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Napolitana ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela, Rodelas de Tomate e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza De Alho Frito ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela,  Rodelas de Tomate e Cobertura de Alho Frito.\n"
                            },
                            {
                                "optionTitle": " Pizza De Brócolis ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Brócolis Temperado, Palmito , Mussarela e Fatias de Bacon.\n"
                            },
                            {
                                "optionTitle": " Pizza De Milho ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela e Cobertura de Milho.\n"
                            },
                            {
                                "optionTitle": " Pizza De Palmito ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela e Cobertura de Palmito Picado.\n"
                            },
                            {
                                "optionTitle": " Pizza Pomodoro ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Rodelas de Tomate ,Mussarela, Cobertura de Azeitona Picada e Alho Frito.\n"
                            },
                            {
                                "optionTitle": " Pizza De Rúcula ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela , Rúcula e Tomate Seco.\n"
                            },
                            {
                                "optionTitle": " Pizza De Champignon ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal,  Champignon, Mussarela e Bacon.\n"
                            },
                            {
                                "optionTitle": " Pizza De Tomate Seco ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela e Pedaços de Tomate Seco.\n"
                            },
                            {
                                "optionTitle": " Pizza De Bacon ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela, Cobertura de Bacon e Parmesão Ralado.\n"
                            },
                            {
                                "optionTitle": " Pizza De Lombo Canadense ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal,  Lombo Canadense , Rodelas de Tomate e Mussrela.\n"
                            },
                            {
                                "optionTitle": " Pizza Especial ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Calabresa, Palmito, Cebola , Mussarela e Bacon.\n"
                            },
                            {
                                "optionTitle": " Pizza Baiana ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Calabresa Moída , Ovos , Cebola e Pimenta Calabresa.\n"
                            },
                            {
                                "optionTitle": " Pizza De Calabresa ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Rodalas de Calabresa , Cebola e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Toscana ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Calabrasa Moída e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Bauru ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal,  Presunto , Rodelas de Tomate e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Portuguesa ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Presunto, Ovos, Rodelas de Cebola e Mussarela.\n\n"
                            },
                            {
                                "optionTitle": " Pizza Fofoca ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Presunto, Catupiry , Mussarela e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza Duvidosa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Presunto, Palmito, Ervilha , Mussarela e Bacon.\n"
                            },
                            {
                                "optionTitle": " Pizza Radical ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Peito de Peru, Mussarela  e Fatias de Bacon\n"
                            },
                            {
                                "optionTitle": " Pizza Da Roça ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango, Milho e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Mineira ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango, Palmito Picado, Cebola,   Cobertura de Catupiry e  Bacon\n"
                            },
                            {
                                "optionTitle": " Pizza De Frango Com Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango e Cobertura de Catupiry\n"
                            },
                            {
                                "optionTitle": " Smart da Casa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa,  Catupiry, Cobertura de Mussarela e Bacon\n"
                            },
                            {
                                "optionTitle": " Pizza Delícia ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango,  Palmito Picado , Cobertura de Mussarela e Bacon\n"
                            },
                            {
                                "optionTitle": " Pizza De Carne Seca ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Carne Seca, Cebola e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza De Peperoni ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Rodelas de Peperoni , Cebola e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza De Atum ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Atum e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Mexicana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Atum, Palmito Picado, Cobertura de Catupiry.\n"
                            },
                            {
                                "optionTitle": " Pizza Caribe ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Atum, Ovos, Cebola e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza de Brigadeiro ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido e Cobertura de Granulado.\n"
                            },
                            {
                                "optionTitle": " Pizza Banana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Banana com Canela e Cobertura de Leite Condensado.\n"
                            },
                            {
                                "optionTitle": " Pizza De Romeu e Julieta ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Mussarela e Cobertura de Goiabada.\n"
                            },
                            {
                                "optionTitle": " Pizza De Prestígio ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido e Cobertura de Coco Ralado.\n"
                            },
                            {
                                "optionTitle": " Pizza de Chocolate ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido.\n"
                            },
                            {
                                "optionTitle": " Pizza ChocoNana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Banana com Canela e Cobertura de Chocolate Derretido.\n"
                            },
                            {
                                "optionTitle": " Pizza de Confeitos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido e Cobertura de Confeitos Coloridos.\n"
                            }
                        ]
                    },
                    {
                        "nameComplement": "Que tal deixar ainda mais saborosa?",
                        "typeComplement": "Escolha até 1 item",
                        "required": "",
                        "options": [
                            {
                                "optionTitle": " Borda De Catupiry ",
                                "optionPrice": " R$ 9,99",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda De Cheddar ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda De Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            }
                        ]
                    },
                    {
                        "nameComplement": "Qual sabor da suas esfihas ?",
                        "typeComplement": "Escolha de 1 até 5 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Esfiha De Queijo ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 5",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Esfiha De Calabresa ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 5",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Esfiha De Carne ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            }
                        ]
                    },
                    {
                        "nameComplement": "Qual seria sua bebida?",
                        "typeComplement": "Escolha 1 item",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Refrigerante Guaraná Antárctica 2 L ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Garrafa 2l"
                            },
                            {
                                "optionTitle": " Refrigerante de Cola Pepsi 2l ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Garrafa 2l"
                            },
                            {
                                "optionTitle": " Refrigerante Guaraná sem Açúcar Antarctica 2l ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Garrafa 2l"
                            },
                            {
                                "optionTitle": " Coca-Cola Original 2l ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Garrafa 2l"
                            },
                            {
                                "optionTitle": " Coca-Cola sem Açúcar 2l ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Garrafa 2l"
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Combo Pizza Salgada +Pizza  Doce + Bebida",
                "priceNow": " R$ 99,90",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b606880e2a000122420f1/647b606880e2a00012242116blob_600",
                "descricao": "1 Pizza Salgada + 1 Pizza Doce + Refrigerante 2L ( Guaraná ou Pepsi )",
                "complementsDict": [
                    {
                        "nameComplement": "Qual sabor da sua pizza?",
                        "typeComplement": "Escolha 1 item",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Pizza De 2 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal,Catupiry e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza De 3 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Provolone, Gongorzola e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza De 4 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela, Provolone, Catupiry e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza De 5 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal,Catupiry , Mussarela, Provolone,  Parmesão e Gorgonzola.\n\n\n\nObs: Essa pizza não leva mussarela"
                            },
                            {
                                "optionTitle": " Pizza De Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal e Catupiry Derretido.\n"
                            },
                            {
                                "optionTitle": " Pizza De Marguerita ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal,Mussarela,  Rodelas de Tomate , Parmesão e Manjericão Fresco.\n"
                            },
                            {
                                "optionTitle": " Pizza De Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Completa de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza De Napolitana ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela, Rodelas de Tomate e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza De Alho Frito ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela,  Rodelas de Tomate e Cobertura de Alho Frito.\n\n"
                            },
                            {
                                "optionTitle": " Pizza De Brócolis ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Brócolis Temperado, Palmito , Mussarela e Fatias de Bacon.\n"
                            },
                            {
                                "optionTitle": " Pizza De Milho ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela e Cobertura de Milho.\n"
                            },
                            {
                                "optionTitle": " Pizza De Palmito ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela e Cobertura de Palmito Picado.\n"
                            },
                            {
                                "optionTitle": " Pizza De Pomodoro ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Rodelas de Tomate ,Mussarela, Cobertura de Azeitona Picada e Alho Frito.\n"
                            },
                            {
                                "optionTitle": " Pizza De Rúcula ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela , Rúcula e Tomate Seco.\n"
                            },
                            {
                                "optionTitle": " Pizza De Champignon ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal,  Champignon, Mussarela e Bacon.\n"
                            },
                            {
                                "optionTitle": " Pizza De Tomate Seco ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela e Pedaços de Tomate Seco.\n"
                            },
                            {
                                "optionTitle": " Pizza De Bacon ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela, Cobertura de Bacon e Parmesão Ralado.\n"
                            },
                            {
                                "optionTitle": " Pizza De Lombo Canadense ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal,  Lombo Canadense , Rodelas de Tomate e Mussrela.\n"
                            },
                            {
                                "optionTitle": " Pizza Especial ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Calabresa, Palmito, Cebola , Mussarela e Bacon.\n"
                            },
                            {
                                "optionTitle": " Pizza Baiana ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Calabresa Moída , Ovos , Cebola e Pimenta Calabresa.\n"
                            },
                            {
                                "optionTitle": " Pizza De Calabresa ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Rodalas de Calabresa , Cebola e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Toscana ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Calabrasa Moída e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza De Bauru ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal,  Presunto , Rodelas de Tomate e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Portuguesa ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Presunto, Ovos, Rodelas de Cebola e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Fofoca ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal,  Presunto, Catupiry , Mussarela e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza Duvidosa ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Presunto, Palmito, Ervilha ,Mussarela e Bacon.\n"
                            },
                            {
                                "optionTitle": " Pizza Radical ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Peito de Peru, Mussarela  e Fatias de Bacon\n"
                            },
                            {
                                "optionTitle": " Pizza Da Roça ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Frango, Milho e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Mineira ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Frango, Palmito Picado, Cebola,   Cobertura de Catupiry e  Bacon\n"
                            },
                            {
                                "optionTitle": " Pizza De Frango Com Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Frango e Cobertura de Catupiry\n"
                            },
                            {
                                "optionTitle": " Smart da Casa ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Calabresa,  Catupiry, Cobertura de Mussarela e Bacon\n"
                            },
                            {
                                "optionTitle": " Pizza Delícia ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Frango,  Palmito Picado , Cobertura de Mussarela e Bacon\n\n\n"
                            },
                            {
                                "optionTitle": " Pizza De Carne Seca ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Carne Seca, Cebola e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza De Atum ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Atum e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Mexicana ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Atum, Palmito Picado, Cobertura de Catupiry.\n"
                            },
                            {
                                "optionTitle": " Pizza Caribe ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Atum, Ovos,Cebola e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Peperoni ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Rodelas de Peperoni , Cebola e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Brigadeiro ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido e Cobertura de Granulado.\n"
                            },
                            {
                                "optionTitle": " Banana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Banana com Canela e Cobertura de Leite Condensado.\n"
                            },
                            {
                                "optionTitle": " Romeu e Julieta ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Mussarela e Cobertura de Goiabada.\n"
                            },
                            {
                                "optionTitle": " Prestígio ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido e Cobertura de Coco Ralado.\n"
                            },
                            {
                                "optionTitle": " Chocolate ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido.\n"
                            },
                            {
                                "optionTitle": " ChocoNana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Banana com Canela e Cobertura de Chocolate Derretido.\n"
                            },
                            {
                                "optionTitle": " Confeitos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido e Cobertura de Confeitos Coloridos.\n"
                            }
                        ]
                    },
                    {
                        "nameComplement": "Que tal deixar sua pizza mais saborosa?",
                        "typeComplement": "Escolha até 2 itens",
                        "required": "",
                        "options": [
                            {
                                "optionTitle": " Broda de Catupiry ",
                                "optionPrice": " R$ 9,99",
                                "optionQtd": "Máximo 2",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda de Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 2",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda de cheddar ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 2",
                                "optionDescription": ""
                            }
                        ]
                    },
                    {
                        "nameComplement": "Qual seria sua pizza doce ?",
                        "typeComplement": "Escolha 1 item",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Pizza De Brigadeiro ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Chocolate garoto derretido"
                            },
                            {
                                "optionTitle": " Pizza De Romeu e Julieta ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Chocolate coberto com granulado"
                            },
                            {
                                "optionTitle": " Pizza De Prestígio ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Chocolate coberto com coco ralado"
                            },
                            {
                                "optionTitle": " Pizza De Chocolate ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Chocolate com confeitos coloridos"
                            },
                            {
                                "optionTitle": " Pizza De Banana ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Banana, leite condensado e canela em pó"
                            },
                            {
                                "optionTitle": " Pizza ChocoNana ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Chocolate, banana com canela e açúcar"
                            }
                        ]
                    },
                    {
                        "nameComplement": "Qual seria sua bebida?",
                        "typeComplement": "Escolha 1 item",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Refrigerante Guaraná Antárctica 2 L ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Garrafa 2l"
                            },
                            {
                                "optionTitle": " Refrigerante Guaraná Antarctica sem Açúcar 2l ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Garrafa 2l"
                            },
                            {
                                "optionTitle": " Coca-Cola Original 2l ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Garrafa 2l"
                            },
                            {
                                "optionTitle": " Refrigerante de Cola Pepsi 2l ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Garrafa 2l"
                            },
                            {
                                "optionTitle": " Coca-Cola sem Açúcar 2l ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Garrafa 2l"
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Combo Pizza GIGANTE + 10 Esfihas + Bebida - Cópia",
                "priceNow": " R$ 109,90",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b606880e2a000122420f1/647b606880e2a00012242115blob_600",
                "descricao": "1 Pizza Salgada Gigante 12 Fatias ou Doce + 10 Deliciosas Esfihas ( Carne, Queijo ou Calabresa )+ 1 Refrigerante 2l (Guaraná, Guaraná Zero, Pepsi)",
                "complementsDict": [
                    {
                        "nameComplement": "Qual sabor da sua pizza?",
                        "typeComplement": "Escolha 1 item",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Pizza 2 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Catupiry e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza  3 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Provolone, Gorgonzola e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza  4 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela, Provolone, Catupiry e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza 5 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Catupiry , Mussarela, Provolone,  Parmesão e Gorgonzola.\n\n\n\nObs: Essa pizza não leva mussarela"
                            },
                            {
                                "optionTitle": " Pizza De Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal e Catupiry Derretido.\n"
                            },
                            {
                                "optionTitle": " Pizza  Marguerita ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela,  Rodelas de Tomate , Parmesão e Manjericão Fresco.\n"
                            },
                            {
                                "optionTitle": " Pizza De Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Completa de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Napolitana ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela, Rodelas de Tomate e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza De Alho Frito ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela,  Rodelas de Tomate e Cobertura de Alho Frito.\n"
                            },
                            {
                                "optionTitle": " Pizza De Brócolis ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Brócolis Temperado, Palmito , Mussarela e Fatias de Bacon.\n"
                            },
                            {
                                "optionTitle": " Pizza De Milho ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela e Cobertura de Milho.\n"
                            },
                            {
                                "optionTitle": " Pizza De Palmito ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela e Cobertura de Palmito Picado.\n"
                            },
                            {
                                "optionTitle": " Pizza Pomodoro ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Rodelas de Tomate ,Mussarela, Cobertura de Azeitona Picada e Alho Frito.\n"
                            },
                            {
                                "optionTitle": " Pizza De Rúcula ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela , Rúcula e Tomate Seco.\n"
                            },
                            {
                                "optionTitle": " Pizza De Champignon ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal,  Champignon, Mussarela e Bacon.\n"
                            },
                            {
                                "optionTitle": " Pizza De Tomate Seco ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela e Pedaços de Tomate Seco.\n"
                            },
                            {
                                "optionTitle": " Pizza De Bacon ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela, Cobertura de Bacon e Parmesão Ralado.\n"
                            },
                            {
                                "optionTitle": " Pizza De Lombo Canadense ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal,  Lombo Canadense , Rodelas de Tomate e Mussrela.\n"
                            },
                            {
                                "optionTitle": " Pizza Especial ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Calabresa, Palmito, Cebola , Mussarela e Bacon.\n"
                            },
                            {
                                "optionTitle": " Pizza Baiana ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Calabresa Moída , Ovos , Cebola e Pimenta Calabresa.\n"
                            },
                            {
                                "optionTitle": " Pizza De Calabresa ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Rodalas de Calabresa , Cebola e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Toscana ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Calabrasa Moída e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Bauru ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal,  Presunto , Rodelas de Tomate e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Portuguesa ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Presunto, Ovos, Rodelas de Cebola e Mussarela.\n\n"
                            },
                            {
                                "optionTitle": " Pizza Fofoca ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Presunto, Catupiry , Mussarela e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza Duvidosa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Presunto, Palmito, Ervilha , Mussarela e Bacon.\n"
                            },
                            {
                                "optionTitle": " Pizza Radical ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Peito de Peru, Mussarela  e Fatias de Bacon\n"
                            },
                            {
                                "optionTitle": " Pizza Da Roça ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango, Milho e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Mineira ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango, Palmito Picado, Cebola,   Cobertura de Catupiry e  Bacon\n"
                            },
                            {
                                "optionTitle": " Pizza De Frango Com Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango e Cobertura de Catupiry\n"
                            },
                            {
                                "optionTitle": " Smart da Casa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa,  Catupiry, Cobertura de Mussarela e Bacon\n"
                            },
                            {
                                "optionTitle": " Pizza Delícia ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango,  Palmito Picado , Cobertura de Mussarela e Bacon\n"
                            },
                            {
                                "optionTitle": " Pizza De Carne Seca ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Carne Seca, Cebola e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza De Peperoni ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Rodelas de Peperoni , Cebola e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza De Atum ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Atum e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Mexicana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Atum, Palmito Picado, Cobertura de Catupiry.\n"
                            },
                            {
                                "optionTitle": " Pizza Caribe ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Atum, Ovos, Cebola e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza de Brigadeiro ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido e Cobertura de Granulado.\n"
                            },
                            {
                                "optionTitle": " Pizza Banana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Banana com Canela e Cobertura de Leite Condensado.\n"
                            },
                            {
                                "optionTitle": " Pizza De Romeu e Julieta ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Mussarela e Cobertura de Goiabada.\n"
                            },
                            {
                                "optionTitle": " Pizza De Prestígio ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido e Cobertura de Coco Ralado.\n"
                            },
                            {
                                "optionTitle": " Pizza de Chocolate ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido.\n"
                            },
                            {
                                "optionTitle": " Pizza ChocoNana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Banana com Canela e Cobertura de Chocolate Derretido.\n"
                            },
                            {
                                "optionTitle": " Pizza de Confeitos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido e Cobertura de Confeitos Coloridos.\n"
                            }
                        ]
                    },
                    {
                        "nameComplement": "Que tal deixar ainda mais saborosa?",
                        "typeComplement": "Escolha até 1 item",
                        "required": "",
                        "options": [
                            {
                                "optionTitle": " Borda De Catupiry ",
                                "optionPrice": " R$ 9,99",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda De Cheddar ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda De Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            }
                        ]
                    },
                    {
                        "nameComplement": "Qual sabor da suas esfihas ?",
                        "typeComplement": "Escolha de 1 até 5 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Esfiha De Queijo ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 5",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Esfiha De Calabresa ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 5",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Esfiha De Carne ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            }
                        ]
                    },
                    {
                        "nameComplement": "Qual seria sua bebida?",
                        "typeComplement": "Escolha 1 item",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Refrigerante Guaraná Antárctica 2 L ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Garrafa 2l"
                            },
                            {
                                "optionTitle": " Refrigerante de Cola Pepsi 2l ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Garrafa 2l"
                            },
                            {
                                "optionTitle": " Refrigerante Guaraná sem Açúcar Antarctica 2l ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Garrafa 2l"
                            },
                            {
                                "optionTitle": " Coca-Cola Original 2l ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Garrafa 2l"
                            },
                            {
                                "optionTitle": " Coca-Cola sem Açúcar 2l ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Garrafa 2l"
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Combo Pizza GIGANTE Salgada + Pizza Doce + Bebida ",
                "priceNow": " R$ 119,90",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b606880e2a000122420f1/647b606880e2a00012242116blob_600",
                "descricao": "1 Pizza Gigante Salgada + 1 Pizza Grande Doce + Refrigerante 2L ( Guaraná ou Pepsi )",
                "complementsDict": [
                    {
                        "nameComplement": "Qual sabor da sua pizza?",
                        "typeComplement": "Escolha 1 item",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Pizza De 2 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal,Catupiry e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza De 3 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Provolone, Gongorzola e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza De 4 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela, Provolone, Catupiry e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza De 5 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal,Catupiry , Mussarela, Provolone,  Parmesão e Gorgonzola.\n\n\n\nObs: Essa pizza não leva mussarela"
                            },
                            {
                                "optionTitle": " Pizza De Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal e Catupiry Derretido.\n"
                            },
                            {
                                "optionTitle": " Pizza De Marguerita ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal,Mussarela,  Rodelas de Tomate , Parmesão e Manjericão Fresco.\n"
                            },
                            {
                                "optionTitle": " Pizza De Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Completa de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza De Napolitana ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela, Rodelas de Tomate e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza De Alho Frito ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela,  Rodelas de Tomate e Cobertura de Alho Frito.\n\n"
                            },
                            {
                                "optionTitle": " Pizza De Brócolis ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Brócolis Temperado, Palmito , Mussarela e Fatias de Bacon.\n"
                            },
                            {
                                "optionTitle": " Pizza De Milho ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela e Cobertura de Milho.\n"
                            },
                            {
                                "optionTitle": " Pizza De Palmito ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela e Cobertura de Palmito Picado.\n"
                            },
                            {
                                "optionTitle": " Pizza De Pomodoro ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Rodelas de Tomate ,Mussarela, Cobertura de Azeitona Picada e Alho Frito.\n"
                            },
                            {
                                "optionTitle": " Pizza De Rúcula ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela , Rúcula e Tomate Seco.\n"
                            },
                            {
                                "optionTitle": " Pizza De Champignon ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal,  Champignon, Mussarela e Bacon.\n"
                            },
                            {
                                "optionTitle": " Pizza De Tomate Seco ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela e Pedaços de Tomate Seco.\n"
                            },
                            {
                                "optionTitle": " Pizza De Bacon ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Mussarela, Cobertura de Bacon e Parmesão Ralado.\n"
                            },
                            {
                                "optionTitle": " Pizza De Lombo Canadense ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal,  Lombo Canadense , Rodelas de Tomate e Mussrela.\n"
                            },
                            {
                                "optionTitle": " Pizza Especial ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Calabresa, Palmito, Cebola , Mussarela e Bacon.\n"
                            },
                            {
                                "optionTitle": " Pizza Baiana ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Calabresa Moída , Ovos , Cebola e Pimenta Calabresa.\n"
                            },
                            {
                                "optionTitle": " Pizza De Calabresa ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Rodalas de Calabresa , Cebola e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Toscana ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Calabrasa Moída e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza De Bauru ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal,  Presunto , Rodelas de Tomate e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Portuguesa ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Presunto, Ovos, Rodelas de Cebola e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Fofoca ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal,  Presunto, Catupiry , Mussarela e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Pizza Duvidosa ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Presunto, Palmito, Ervilha ,Mussarela e Bacon.\n"
                            },
                            {
                                "optionTitle": " Pizza Radical ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Peito de Peru, Mussarela  e Fatias de Bacon\n"
                            },
                            {
                                "optionTitle": " Pizza Da Roça ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Frango, Milho e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Mineira ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Frango, Palmito Picado, Cebola,   Cobertura de Catupiry e  Bacon\n"
                            },
                            {
                                "optionTitle": " Pizza De Frango Com Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Frango e Cobertura de Catupiry\n"
                            },
                            {
                                "optionTitle": " Smart da Casa ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Calabresa,  Catupiry, Cobertura de Mussarela e Bacon\n"
                            },
                            {
                                "optionTitle": " Pizza Delícia ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Frango,  Palmito Picado , Cobertura de Mussarela e Bacon\n\n\n"
                            },
                            {
                                "optionTitle": " Pizza De Carne Seca ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Carne Seca, Cebola e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza De Atum ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Atum e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Pizza Mexicana ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Atum, Palmito Picado, Cobertura de Catupiry.\n"
                            },
                            {
                                "optionTitle": " Pizza Caribe ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Molho Artesanal, Atum, Ovos,Cebola e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Peperoni ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Rodelas de Peperoni , Cebola e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Brigadeiro ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido e Cobertura de Granulado.\n"
                            },
                            {
                                "optionTitle": " Banana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Banana com Canela e Cobertura de Leite Condensado.\n"
                            },
                            {
                                "optionTitle": " Romeu e Julieta ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Mussarela e Cobertura de Goiabada.\n"
                            },
                            {
                                "optionTitle": " Prestígio ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido e Cobertura de Coco Ralado.\n"
                            },
                            {
                                "optionTitle": " Chocolate ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido.\n"
                            },
                            {
                                "optionTitle": " ChocoNana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Banana com Canela e Cobertura de Chocolate Derretido.\n"
                            },
                            {
                                "optionTitle": " Confeitos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido e Cobertura de Confeitos Coloridos.\n"
                            }
                        ]
                    },
                    {
                        "nameComplement": "Que tal deixar sua pizza mais saborosa?",
                        "typeComplement": "Escolha até 2 itens",
                        "required": "",
                        "options": [
                            {
                                "optionTitle": " Broda de Catupiry ",
                                "optionPrice": " R$ 9,99",
                                "optionQtd": "Máximo 2",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda de Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 2",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda de cheddar ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 2",
                                "optionDescription": ""
                            }
                        ]
                    },
                    {
                        "nameComplement": "Qual seria sua pizza doce ?",
                        "typeComplement": "Escolha 1 item",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Pizza De Brigadeiro ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Chocolate garoto derretido"
                            },
                            {
                                "optionTitle": " Pizza De Romeu e Julieta ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Chocolate coberto com granulado"
                            },
                            {
                                "optionTitle": " Pizza De Prestígio ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Chocolate coberto com coco ralado"
                            },
                            {
                                "optionTitle": " Pizza De Chocolate ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Chocolate com confeitos coloridos"
                            },
                            {
                                "optionTitle": " Pizza De Banana ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Banana, leite condensado e canela em pó"
                            },
                            {
                                "optionTitle": " Pizza ChocoNana ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Chocolate, banana com canela e açúcar"
                            }
                        ]
                    },
                    {
                        "nameComplement": "Qual seria sua bebida?",
                        "typeComplement": "Escolha 1 item",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Refrigerante Guaraná Antárctica 2 L ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Garrafa 2l"
                            },
                            {
                                "optionTitle": " Refrigerante Guaraná Antarctica sem Açúcar 2l ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Garrafa 2l"
                            },
                            {
                                "optionTitle": " Coca-Cola Original 2l ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Garrafa 2l"
                            },
                            {
                                "optionTitle": " Refrigerante de Cola Pepsi 2l ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Garrafa 2l"
                            },
                            {
                                "optionTitle": " Coca-Cola sem Açúcar 2l ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Garrafa 2l"
                            }
                        ]
                    }
                ]
            },
            {
                "title": "",
                "priceNow": " R$ 69,90",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/648e1dc76e300a001cb43670/648e1dc76e300a001cb43671-1691103536428blob",
                "descricao": "",
                "complementsDict": []
            },
            {
                "title": "",
                "priceNow": " R$ 69,90",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/648e1dc76e300a001cb43670/648e1dc76e300a001cb43671-1691103536428blob",
                "descricao": "",
                "complementsDict": []
            }
        ]
    },
    {
        "categoryName": "Pizzas Doce Smart",
        "productsCategory": [
            {
                "title": "GIGANTE 40cm (12 Fatías)",
                "priceNow": "",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/648e1b0e6e300a001cb3fc36/64d552bb01088d0028d7964b-1694993236163blob",
                "descricao": "Pizza com até 3 sabores e 12 fatias",
                "complementsDict": [
                    {
                        "nameComplement": "Sabor GIGANTE 40cm (12 Fatías)",
                        "typeComplement": "Escolha de 1 até 3 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Pizza de Chocolate Derretido. ",
                                "optionPrice": " R$ 64,99",
                                "optionQtd": "",
                                "optionDescription": "Massa Coberta de Chocolate Derretido."
                            },
                            {
                                "optionTitle": " Pizza Brigadeiro ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa, Chocolate Derretido com Cobertura de Granulado."
                            },
                            {
                                "optionTitle": " Pizza Prestigio ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa, Chocolate Derretido com Cobertura de Coco Ralado."
                            },
                            {
                                "optionTitle": " Pizza Confeitos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa, Chocolate Derretido com Confeitos Coloridos. "
                            },
                            {
                                "optionTitle": " Pizza Banana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa, Banana com Canela e Açúcar e Cobertura de Leite Condensado."
                            },
                            {
                                "optionTitle": " Pizza Choconana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa, Banana com Canela e Açúcar com Filetes de Chocolate Derretido."
                            },
                            {
                                "optionTitle": " Pizza Romeu e Julieta ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa, Mussarela e Filetes de Goiabada"
                            }
                        ]
                    },
                    {
                        "nameComplement": "Borda GIGANTE 40cm (12 Fatías)",
                        "typeComplement": "Escolha até 1 item",
                        "required": "",
                        "options": [
                            {
                                "optionTitle": " Borda de Mussarela ",
                                "optionPrice": " R$ 11,99",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            }
                        ]
                    }
                ]
            },
            {
                "title": "GRANDE 35cm (8 Fatias)",
                "priceNow": "",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/648e1b0e6e300a001cb3fc36/648e1b0e6e300a001cb3fc37blob",
                "descricao": "Pizza com até 2 sabores e 8 fatias",
                "complementsDict": [
                    {
                        "nameComplement": "Sabor GRANDE 35cm (8 Fatias)",
                        "typeComplement": "Escolha de 1 até 2 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Pizza Banana Nevada ",
                                "optionPrice": " R$ 64,99",
                                "optionQtd": "Máximo 1",
                                "optionDescription": "Massa, Banana Com Canela, Chocolate Branco e Doce de Leite."
                            },
                            {
                                "optionTitle": " Pizza de Chocolate Derretido. ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa Coberta de Chocolate Derretido."
                            },
                            {
                                "optionTitle": " Pizza Brigadeiro ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa, Chocolate Derretido com Cobertura de Granulado."
                            },
                            {
                                "optionTitle": " Pizza Prestigio ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa, Chocolate Derretido com Cobertura de Coco Ralado."
                            },
                            {
                                "optionTitle": " Pizza Confeitos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa, Chocolate Derretido com Confeitos Coloridos. "
                            },
                            {
                                "optionTitle": " Pizza Banana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa, Banana com Canela e Açúcar e Cobertura de Leite Condensado."
                            },
                            {
                                "optionTitle": " Pizza Choconana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa, Banana com Canela e Açúcar com Filetes de Chocolate Derretido."
                            },
                            {
                                "optionTitle": " Pizza Romeu e Julieta ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Massa, Mussarela e Filetes de Goiabada"
                            }
                        ]
                    },
                    {
                        "nameComplement": "Borda GRANDE 35cm (8 Fatias)",
                        "typeComplement": "Escolha até 1 item",
                        "required": "",
                        "options": [
                            {
                                "optionTitle": " Borda de Mussarela ",
                                "optionPrice": " R$ 9,99",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "categoryName": "Pizzas Individuais - Broto 4 Fatias",
        "productsCategory": [
            {
                "title": "Pizza Broto de 25cm e 4 Fatias",
                "priceNow": " R$ 39,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b968887800300270d640a/647d5751e62e610027974341-1695414375099blob_600",
                "descricao": "Pizza Broto de 25cm e 4 Fatias",
                "complementsDict": [
                    {
                        "nameComplement": "Escolha Sua Pizza Broto",
                        "typeComplement": "Escolha até 1 item",
                        "required": "",
                        "options": [
                            {
                                "optionTitle": " 2 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Catupiry e Mussarela.\n"
                            },
                            {
                                "optionTitle": " 3 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Provolone, Gorgonzola e Parmesão.\n"
                            },
                            {
                                "optionTitle": " 4 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela, Provolone, Catupiry e Parmesão.\n"
                            },
                            {
                                "optionTitle": " 5 Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Catupiry , Mussarela, Provolone,  Parmesão e Gorgonzola.\n"
                            },
                            {
                                "optionTitle": " Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal e Catupiry Derretido.\n"
                            },
                            {
                                "optionTitle": " Marguerita ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela,  Rodelas de Tomate , Parmesão e Manjericão Fresco.\n"
                            },
                            {
                                "optionTitle": " Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Completa de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Napolitana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela, Rodelas de Tomate e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Alho Frito ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela,  Rodelas de Tomate e Cobertura de Alho Frito.\n"
                            },
                            {
                                "optionTitle": " Calabresa Paulista ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Coberta com Calabresa Fatiada e Cebola.\n"
                            },
                            {
                                "optionTitle": " Brócolis ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Brócolis Temperado, Palmito , Mussarela e Fatias de Bacon.\n"
                            },
                            {
                                "optionTitle": " Milho ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela e Cobertura de Milho.\n"
                            },
                            {
                                "optionTitle": " Palmito ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela e Cobertura de Palmito Picado.\n"
                            },
                            {
                                "optionTitle": " Pomodoro ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Rodelas de Tomate , Mussarela, Cobertura de Azeitona Picada e Alho Frito.\n"
                            },
                            {
                                "optionTitle": " Rúcula ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela , Rúcula e Tomate Seco.\n"
                            },
                            {
                                "optionTitle": " Champignon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Champignon, Mussarela e Bacon.\n"
                            },
                            {
                                "optionTitle": " Tomate Seco ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela e Pedaços de Tomate Seco.\n"
                            },
                            {
                                "optionTitle": " Bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Mussarela, Cobertura de Bacon e Parmesão Ralado.\n"
                            },
                            {
                                "optionTitle": " Lombo Canadense ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Lombo Canadense , Rodelas de Tomate e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Especial ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa, Palmito, Cebola , Mussarela e Bacon.\n"
                            },
                            {
                                "optionTitle": " Baiana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa Moída , Ovos , Cebola e Pimenta Calabresa.\n"
                            },
                            {
                                "optionTitle": " Calabresa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Rodelas de Calabresa , Cebola e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Toscana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa Moída e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Bauru ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Presunto , Rodelas de Tomate e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Portuguesa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Presunto, Ovos, Rodelas de Cebola e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Fofoca ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Presunto, Catupiry , Mussarela e Parmesão.\n"
                            },
                            {
                                "optionTitle": " Duvidosa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Presunto, Palmito, Ervilha , Mussarela e Bacon.\n"
                            },
                            {
                                "optionTitle": " Radical ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Peito de Peru, Mussarela  e Fatias de Bacon\n"
                            },
                            {
                                "optionTitle": " Da Roça ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango, Milho e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Mineira ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango, Palmito Picado, Cebola,   Cobertura de Catupiry e  Bacon.\n"
                            },
                            {
                                "optionTitle": " Frango Com Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Frango e Cobertura de Catupiry\n"
                            },
                            {
                                "optionTitle": " Smart da Casa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Calabresa,  Catupiry, Cobertura de Mussarela e Bacon\n"
                            },
                            {
                                "optionTitle": " Delícia ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Monte sua Pizza com 4 Ingredientes\n"
                            },
                            {
                                "optionTitle": " Carne Seca ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Carne Seca, Cebola e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Peperoni ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal,  Rodelas de Peperoni , Cebola e Mussarela.\n"
                            },
                            {
                                "optionTitle": " Atum ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Atum e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Mexicana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Atum, Palmito Picado, Cobertura de Catupiry.\n"
                            },
                            {
                                "optionTitle": " Caribe ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho Artesanal, Atum, Ovos, Cebola e Cobertura de Mussarela.\n"
                            },
                            {
                                "optionTitle": " Brigadeiro ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido e Cobertura de Granulado.\n"
                            },
                            {
                                "optionTitle": " Banana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Banana com Canela e Cobertura de Leite Condensado.\n"
                            },
                            {
                                "optionTitle": " Romeu e Julieta ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Mussarela e Cobertura de Goiabada.\n"
                            },
                            {
                                "optionTitle": " Prestígio ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido e Cobertura de Coco Ralado.\n"
                            },
                            {
                                "optionTitle": " Chocolate ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido.\n"
                            },
                            {
                                "optionTitle": " ChocoNana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Banana com Canela e Cobertura de Chocolate Derretido.\n"
                            },
                            {
                                "optionTitle": " Confeitos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Chocolate Derretido e Cobertura de Confeitos Coloridos.\n"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "categoryName": "Esfihas Salgada e Doce - Smart",
        "productsCategory": [
            {
                "title": "Esfiha de Carne",
                "priceNow": " R$ 4,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b78429487de001c6e30be/647b88a1886f770027289c23-1695332374029blob_600",
                "descricao": "Esfiha de Carne com Tomate Picado e Cebola.\n",
                "complementsDict": []
            },
            {
                "title": "Esfiha de Queijo",
                "priceNow": " R$ 4,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b78429487de001c6e30be/647b88c3886f770027289e27-1695332731584blob_600",
                "descricao": "Esfiha de Queijo\n",
                "complementsDict": []
            },
            {
                "title": "Esfiha de Calabresa",
                "priceNow": " R$ 4,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b78429487de001c6e30be/647b88ee9487de001c6ed33a-1695332924149blob_600",
                "descricao": "Esfiha de Calabresa Moída.\n",
                "complementsDict": []
            },
            {
                "title": "Esfiha Toscana",
                "priceNow": " R$ 5,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b89389487de001c6ed515-1689383871592blob_600",
                "descricao": "Esfiha de Calabresa Moida com Mussaela.\n",
                "complementsDict": []
            },
            {
                "title": "Esfiha Carne com Queijo",
                "priceNow": " R$ 5,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b78429487de001c6e30be/647b8959886f77002728a07b-1695332302337blob_600",
                "descricao": "Esfiha de Carne com Mussarela.\n",
                "complementsDict": []
            },
            {
                "title": "Esfiha Frango com Catupiry",
                "priceNow": " R$ 5,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b78429487de001c6e30be/647b89859487de001c6ed671-1695333978754blob_600",
                "descricao": "Esfiha de Frango com Requeijão.\n",
                "complementsDict": []
            },
            {
                "title": "Chocolate",
                "priceNow": " R$ 5,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b78429487de001c6e30be/647b89c39487de001c6ed760-1695333285698blob_600",
                "descricao": "Esfiha de Chocolate\n",
                "complementsDict": []
            },
            {
                "title": "Esfiha de Prestígio",
                "priceNow": " R$ 5,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b78429487de001c6e30be/647b89d89487de001c6ed792-1695333354319blob_600",
                "descricao": "Esfiha de Prestígio\n",
                "complementsDict": []
            },
            {
                "title": "Esfiha de Brigadeiro",
                "priceNow": " R$ 5,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b78429487de001c6e30be/647b89ec9487de001c6ed7bf-1695333419048blob_600",
                "descricao": "Esfiha de Brigadeiro.\n",
                "complementsDict": []
            },
            {
                "title": "Esfiha de Confeitos",
                "priceNow": " R$ 5,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b78429487de001c6e30be/647b8a069487de001c6ed85a-1695333462507blob_600",
                "descricao": "Esfiha de Confeitos Coloridos.\n",
                "complementsDict": []
            },
            {
                "title": "Esfiha de Banana",
                "priceNow": " R$ 5,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b78429487de001c6e30be/647b8a289487de001c6ed892-1695333512580blob_600",
                "descricao": "Esfiha de Banana com Canela e Leite Condensado.\n",
                "complementsDict": []
            },
            {
                "title": "ChocoNana",
                "priceNow": " R$ 5,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b78429487de001c6e30be/647b8a4e9487de001c6ed921-1695333563228blob_600",
                "descricao": "Esfiha de Banana e Gostas de Chocolate.",
                "complementsDict": []
            },
            {
                "title": "Esfiha Romeu e Julieta",
                "priceNow": " R$ 5,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b8a739487de001c6ed9ed-1689384547561blob_600",
                "descricao": "Esfiha de Queijo com Goiabada.",
                "complementsDict": []
            },
            {
                "title": "Esfiha de Doce de Leite",
                "priceNow": " R$ 5,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b78429487de001c6e30be/647b8a86886f77002728a759-1695333185008blob_600",
                "descricao": "Esfiha de Doce de Leite.\n",
                "complementsDict": []
            }
        ]
    },
    {
        "categoryName": "Kits de Esfihas Smart",
        "productsCategory": [
            {
                "title": "Kit Promo - 5 Esfihas Sortidas",
                "priceNow": " R$ 19,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/202206072017_I211_i_600",
                "descricao": "5 Deliciosas Esfihas Sortidas ( Queijo, Carne, Toscana e Presunto ).",
                "complementsDict": [
                    {
                        "nameComplement": "Sabor das esfihas",
                        "typeComplement": "Escolha de 1 até 5 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Calabresa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Calabresa Moída"
                            },
                            {
                                "optionTitle": " Esfiha de Carne ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Carne Moída, Tomate e Cebola Picada.\n"
                            },
                            {
                                "optionTitle": " Esfiha de Queijo ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Kit 1-10 Esfihas Sortidas",
                "priceNow": " R$ 39,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/202206072017_I211_i_600",
                "descricao": "10 Deliciosas Esfihas Sortidas ( Queijo, Carne, Toscana e Presunto ).",
                "complementsDict": [
                    {
                        "nameComplement": "Sabor das esfihas",
                        "typeComplement": "Escolha de 1 até 10 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Calabresa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Calabresa Moída"
                            },
                            {
                                "optionTitle": " Esfiha de Carne ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Carne Moída, Tomate e Cebola Picada.\n"
                            },
                            {
                                "optionTitle": " Esfiha de Queijo ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Kit 2- 20 Esfihas Sortidas",
                "priceNow": " R$ 69,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/202206072017_I211_i_600",
                "descricao": "20 Deliciosas Esfihas Sortidas ( Queijo, Carne, Toscana e Presunto ).",
                "complementsDict": [
                    {
                        "nameComplement": "Sabor das esfihas",
                        "typeComplement": "Escolha de 1 até 20 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Calabresa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Calabresa Moída"
                            },
                            {
                                "optionTitle": " Esfiha de Carne ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Carne Moída, Tomate e Cebola Picada.\n"
                            },
                            {
                                "optionTitle": " Esfiha de Queijo ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Kit 3 -30 Esfihas Sortidas",
                "priceNow": " R$ 99,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/202206072017_I211_i_600",
                "descricao": "30 Deliciosas Esfihas Sortidas ( Queijo, Carne, Toscana e Presunto ).",
                "complementsDict": [
                    {
                        "nameComplement": "Sabor das esfihas",
                        "typeComplement": "Escolha de 1 até 30 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Calabresa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Calabresa Moída"
                            },
                            {
                                "optionTitle": " Esfiha de Carne ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Carne Moída, Tomate e Cebola Picada.\n"
                            },
                            {
                                "optionTitle": " Esfiha de Queijo ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Kit 4 - 40 Esfihas Sortidas",
                "priceNow": " R$ 119,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/202206072017_I211_i_600",
                "descricao": "40 Deliciosas Esfihas Sortidas ( Queijo, Carne, Toscana e Presunto ).",
                "complementsDict": [
                    {
                        "nameComplement": "Sabor das esfihas",
                        "typeComplement": "Escolha de 1 até 40 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Calabresa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Calabresa Moída"
                            },
                            {
                                "optionTitle": " Esfiha de Carne ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Carne Moída, Tomate e Cebola Picada.\n"
                            },
                            {
                                "optionTitle": " Esfiha de Queijo ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "categoryName": "Petiscos",
        "productsCategory": [
            {
                "title": "Calabresa Acebolada",
                "priceNow": " R$ 29,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/202211281148_YMO4_i_600",
                "descricao": "Maravilhosa Porção com 500g de Calabresa Fatiada Na Chapa com Rodelas de Cebola.",
                "complementsDict": []
            },
            {
                "title": "Batata Frita !!",
                "priceNow": " R$ 29,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b606880e2a0001224210c/647b7f6a9487de001c6e740cblob_600",
                "descricao": "Maravilhosa Porção de 500g de Batata Frita !!\n",
                "complementsDict": []
            },
            {
                "title": "Batata com Cheddar Derretido e Bacon !!",
                "priceNow": " R$ 34,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b606880e2a0001224210c/647b7fc29487de001c6e7a10blob_600",
                "descricao": "Deliciosa Porção de 500g de Batata  Frita com Cheddar Derretido e Bacon.\n",
                "complementsDict": []
            },
            {
                "title": "isca de Frango Empanado !!",
                "priceNow": " R$ 34,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b606880e2a0001224210c/647b7ff8886f770027285421blob_600",
                "descricao": "Deliciosa Porção com 500g de Isca de Frango Empanado na Farinha Panco.\n",
                "complementsDict": []
            }
        ]
    },
    {
        "categoryName": "Que Tal Aquela Bebida Gelada ??",
        "productsCategory": [
            {
                "title": "Coca Cola 2 Litros Normal",
                "priceNow": " R$ 13,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b606880e2a0001224210d/647b8e66886f77002728cf71blob_600",
                "descricao": "Coca 2L Normal",
                "complementsDict": []
            },
            {
                "title": "Coca Cola 2 Litros Zero",
                "priceNow": " R$ 13,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b606880e2a0001224210d/647b8e8b9487de001c6f075bblob_600",
                "descricao": "Coca 2L Zero",
                "complementsDict": []
            },
            {
                "title": "Guarana 2 Litros Normal",
                "priceNow": " R$ 11,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b606880e2a0001224210d/647b8ea79487de001c6f086fblob_600",
                "descricao": "Guarana 2 L Normal",
                "complementsDict": []
            },
            {
                "title": "",
                "priceNow": " R$ 69,90",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/648e1dc76e300a001cb43670/648e1dc76e300a001cb43671-1691103536428blob",
                "descricao": "",
                "complementsDict": []
            },
            {
                "title": "",
                "priceNow": " R$ 69,90",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/648e1dc76e300a001cb43670/648e1dc76e300a001cb43671-1691103536428blob",
                "descricao": "",
                "complementsDict": []
            },
            {
                "title": "Coca Cola 600ml",
                "priceNow": " R$ 7,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b606880e2a0001224210d/64937fa342a89e001c1b47fablob_600",
                "descricao": "Coca Cola Normal 600ml",
                "complementsDict": []
            },
            {
                "title": "Guaraná 600Ml Normal",
                "priceNow": " R$ 7,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/-1695768425957blob_600",
                "descricao": "Guaraná 600ml",
                "complementsDict": []
            },
            {
                "title": "Guaraná Lata Normal",
                "priceNow": " R$ 5,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b606880e2a0001224210d/2b3d4152-19b3-4fdf-ba7e-c349f90b35b2blob_600",
                "descricao": "Guaraná Lata Normal",
                "complementsDict": []
            },
            {
                "title": "Guaraná Lata Zero",
                "priceNow": " R$ 5,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b606880e2a0001224210d/647b90539487de001c6f13ceblob_600",
                "descricao": "Guaraná Lata Zero",
                "complementsDict": []
            },
            {
                "title": "Coca Cola Lata Normal",
                "priceNow": " R$ 5,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b606880e2a0001224210d/b50a21ef-4831-439a-a4a3-45b6bf76afecblob_600",
                "descricao": "Coca Cola Lata Normal",
                "complementsDict": []
            },
            {
                "title": "Coca Cola Lata Zero",
                "priceNow": " R$ 5,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b606880e2a0001224210d/4cb35b29-8601-4538-b293-c245f5fae160blob_600",
                "descricao": "Coca Cola Lata Zero",
                "complementsDict": []
            },
            {
                "title": "Água Mineral sem Gás Minalba 510ml",
                "priceNow": " R$ 3,49",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/202305051058_myt8gedrbx",
                "descricao": "Garrafa 510ml",
                "complementsDict": []
            },
            {
                "title": "Coca Cola 600ml Zero",
                "priceNow": " R$ 7,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/-1696106105315blob_600",
                "descricao": "Coca Cola 600ml Zero",
                "complementsDict": []
            }
        ]
    },
    {
        "categoryName": "Cervejas Geladas !!",
        "productsCategory": [
            {
                "title": "",
                "priceNow": " R$ 69,90",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/648e1dc76e300a001cb43670/648e1dc76e300a001cb43671-1691103536428blob",
                "descricao": "",
                "complementsDict": []
            },
            {
                "title": "Long Neck Heineken",
                "priceNow": " R$ 9,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b606880e2a00012242110/647b8b14886f77002728ac57blob",
                "descricao": "Long Neck Heineken",
                "complementsDict": []
            },
            {
                "title": "Long Neck Corona ",
                "priceNow": " R$ 9,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b606880e2a00012242110/647b8c93886f77002728b8c1blob",
                "descricao": "Long Neck Corona",
                "complementsDict": []
            },
            {
                "title": "Long Neck Budweiser",
                "priceNow": " R$ 9,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b606880e2a00012242110/4b5364ed-3478-4a9f-927c-433f7cb939fcblob",
                "descricao": "Long Neck Budweiser",
                "complementsDict": []
            },
            {
                "title": "Cerveja Heineken 473ml",
                "priceNow": " R$ 9,99",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/647b606880e2a00012242110/647b606880e2a00012242128blob",
                "descricao": "Cerveja Heineken 473ml",
                "complementsDict": []
            },
            {
                "title": "",
                "priceNow": " R$ 69,90",
                "imgSrc": "https://client-assets.anota.ai/produtos/647b606752f72300121a3d4c/648e1dc76e300a001cb43670/648e1dc76e300a001cb43671-1691103536428blob",
                "descricao": "",
                "complementsDict": []
            }
        ]
    }
]
  
  const csv = createCSV(scrapedData);
  console.log(csv);
  