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
        "categoryName": "Combos",
        "productsCategory": [
            {
                "title": "COMBO FLASH: 1 Pizza Tradicional + 1 Brotinho Doce",
                "price": "49.90",
                "imgSrc": "https://client-assets.anota.ai/produtos/64ef831d54810f00194c9fa7/-1695867666196blob_600",
                "descricao": "Combo para a pessoa que tem a fome do Flash!",
                "complementsDict": [
                    {
                        "nameComplement": "Escolha o Sabor da 1° Pizza",
                        "typeComplement": "Escolha de 1 até 2 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Portuguesa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Quatro Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Palmito ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Catupiry com Bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Marguerita ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Frango com Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Napolitana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Crocante ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, bacon e batata palha"
                            },
                            {
                                "optionTitle": " Milho ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Lombo Canadense ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Calabresa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Bauru ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Americana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, bacon, cebola, milho e orégano"
                            },
                            {
                                "optionTitle": " Bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            }
                        ]
                    }
                ]
            },
            {
                "title": "COMBO BESOURO AZUL: 2 Pizzas Grandes Tradicionais + 1 Brotinho Doce",
                "price": "89.90",
                "imgSrc": "https://client-assets.anota.ai/produtos/64ef831d54810f00194c9fa7/-1695766340674blob_600",
                "descricao": "O combo do tamanho da fome para quem vai combater o crime contra a dieta!!!\n",
                "complementsDict": [
                    {
                        "nameComplement": "Escolha o Sabor da 1° Pizza",
                        "typeComplement": "Escolha de 1 até 2 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Portuguesa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Quatro Queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Palmito ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Catupiry com Bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Marguerita ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Frango com Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Napolitana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Crocante ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, bacon e batata palha"
                            },
                            {
                                "optionTitle": " Milho ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Lombo Canadense ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Calabresa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Bauru ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Americana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, bacon, cebola, milho e orégano"
                            },
                            {
                                "optionTitle": " Bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            }
                        ]
                    },
                    {
                        "nameComplement": "Escolha o sabor da 2º PIZZA",
                        "typeComplement": "Escolha de 1 até 2 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Quatro queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Palmito ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Portuguesa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Milho ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Marguerita ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Lombo canadense ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Frango com Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Crocante ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Napolitana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Calebresa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Catupiry com bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Bauru ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Americana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            }
                        ]
                    }
                ]
            },
            {
                "title": "COMBO HULK: 1 Pizza Grande Especial + 1 Broto de chocolate + 1 Refrigerante",
                "price": "119.90",
                "imgSrc": "https://client-assets.anota.ai/produtos/64ef831d54810f00194c9fa7/-1695851892127blob_600",
                "descricao": "Compre uma pizza grande especial e ganhe uma broto de chocolate + 1 Refrigerante",
                "complementsDict": [
                    {
                        "nameComplement": "Selecione a primeira pizza",
                        "typeComplement": "Escolha de 1 até 2 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Siciliana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, parmesão, calabresa, tomate fatiado, cebola, Catupiry e orégano"
                            },
                            {
                                "optionTitle": " Nachos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, carne moída, cheddar e Doritos"
                            },
                            {
                                "optionTitle": " Toscana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa, bacon, ovos, tomate e orégano"
                            },
                            {
                                "optionTitle": " Romanesca ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa, bacon, milho, ovos e azeitona"
                            },
                            {
                                "optionTitle": " Frango Filadélfia ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, frango mussarela, cream cheese, bacon e orégano"
                            },
                            {
                                "optionTitle": " Mexicana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa, presunto picado, pimenta calabresa,cebola e orégano"
                            },
                            {
                                "optionTitle": " Moda da casa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa, presunto, frango, bacon, ovo, cebola e orégano"
                            },
                            {
                                "optionTitle": " Pizza do chef ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, lombo, frango, palmito, tomate, cheddar orégano e batata palha"
                            },
                            {
                                "optionTitle": " Do pizzaiolo ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa, bacon, parmesão, presunto, tomate, azeitona e orégano"
                            },
                            {
                                "optionTitle": " Cowboy ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, presunto, bacon, palmito, ovo, Catupiry e orégano"
                            },
                            {
                                "optionTitle": " Beneditos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussrela, calabresa, milho, presunto, tomate picado, cebola e azeitona e orégano"
                            }
                        ]
                    },
                    {
                        "nameComplement": "Selecione a segunda pizza",
                        "typeComplement": "Escolha de 1 até 2 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Siciliana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, parmesão, calabresa, tomate fatiado, cebola, Catupiry e orégano"
                            },
                            {
                                "optionTitle": " Nachos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, carne moída, cheddar e Doritos"
                            },
                            {
                                "optionTitle": " Toscana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa, bacon, ovos, tomate e orégano"
                            },
                            {
                                "optionTitle": " Romanesca ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa, bacon, milho, ovos e azeitona"
                            },
                            {
                                "optionTitle": " Frango Filadélfia ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, frango mussarela, cream cheese, bacon e orégano"
                            },
                            {
                                "optionTitle": " Mexicana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa, presunto picado, pimenta calabresa,cebola e orégano"
                            },
                            {
                                "optionTitle": " Moda da casa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa, presunto, frango, bacon, ovo, cebola e orégano"
                            },
                            {
                                "optionTitle": " Pizza do chef ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, lombo, frango, palmito, tomate, cheddar orégano e batata palha"
                            },
                            {
                                "optionTitle": " Do pizzaiolo ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa, bacon, parmesão, presunto, tomate, azeitona e orégano"
                            },
                            {
                                "optionTitle": " Cowboy ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, presunto, bacon, palmito, ovo, Catupiry e orégano"
                            },
                            {
                                "optionTitle": " Beneditos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussrela, calabresa, milho, presunto, tomate picado, cebola e azeitona e orégano"
                            }
                        ]
                    },
                    {
                        "nameComplement": "Pizza broto - Grátis",
                        "typeComplement": "Escolha 1 item",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Pizza Broto de Chocolate Preto ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Pizza Broto de Chocolate Branco ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            }
                        ]
                    }
                ]
            },
            {
                "title": "COMBO DEADPOOL: Três Pizzas Grandes Tradicionais + 1 Brotinho Doce + 1 Refrigerante",
                "price": "149.90",
                "imgSrc": "https://client-assets.anota.ai/produtos/64ef831d54810f00194c9fa7/-1695867680785blob_600",
                "descricao": "O combo mais fod* para quem deseja acabar com a dieta essa semana!",
                "complementsDict": [
                    {
                        "nameComplement": "Escolha o sabor da 1º PIZZA",
                        "typeComplement": "Escolha de 1 até 2 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Quatro queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Palmito ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Portuguesa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Milho ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Marguerita ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Lombo canadense ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Frango com Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Crocante ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Napolitana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Calebresa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Catupiry com bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Bauru ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Americana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            }
                        ]
                    },
                    {
                        "nameComplement": "Escolha o sabor da 2º PIZZA",
                        "typeComplement": "Escolha de 1 até 2 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Quatro queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Palmito ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Portuguesa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Milho ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Marguerita ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Lombo canadense ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Frango com Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Crocante ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Napolitana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Calebresa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Catupiry com bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Bauru ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Americana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            }
                        ]
                    },
                    {
                        "nameComplement": "Escolha o sabor da 3º PIZZA ",
                        "typeComplement": "Escolha de 1 até 2 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Quatro queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Palmito ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Portuguesa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Milho ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Marguerita ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Lombo canadense ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Frango com Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Crocante ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Napolitana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Calebresa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Catupiry com bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Bauru ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Americana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            }
                        ]
                    },
                    {
                        "nameComplement": "Refrigerante do Combo ",
                        "typeComplement": "Escolha 1 item",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Cini ",
                                "optionPrice": "0",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Kuat ",
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
        "categoryName": "Promoção imperdível",
        "productsCategory": [
            {
                "title": "2 Pizzas G - Sabores Tradicionais",
                "price": "74.90",
                "imgSrc": "https://client-assets.anota.ai/produtos/64ef831d54810f00194c9fa7/6500543dcd9d0f0019864298/6500720538a3950027f143b1-1694914951875blob_600",
                "descricao": "Compre 2 Pizzas Tradicionais e ganhe desconto em dobro!",
                "complementsDict": [
                    {
                        "nameComplement": "Escolha o sabor da 1º PIZZA",
                        "typeComplement": "Escolha de 1 até 2 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Quatro queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Palmito ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Portuguesa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Milho ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Marguerita ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Lombo canadense ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Frango com Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Crocante ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Napolitana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Calebresa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Catupiry com bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Bauru ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Americana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            }
                        ]
                    },
                    {
                        "nameComplement": "Escolha o sabor da 2º PIZZA",
                        "typeComplement": "Escolha de 1 até 2 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Quatro queijos ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Palmito ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Portuguesa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Mussarela ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Milho ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Marguerita ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Lombo canadense ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Frango com Catupiry ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Crocante ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Napolitana ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Calebresa ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Catupiry com bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Bauru ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Bacon ",
                                "optionPrice": "0",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Americana ",
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
        "categoryName": "Pizzas",
        "productsCategory": [
            {
                "title": "Broto",
                "price": "",
                "imgSrc": "https://anotaai.s3.us-west-2.amazonaws.com/pizzas/1pizza",
                "descricao": "Pizza com 1 sabor e 4 fatias",
                "complementsDict": [
                    {
                        "nameComplement": "Sabor Broto",
                        "typeComplement": "Escolha 1 item",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Americana ",
                                "optionPrice": "29.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, bacon, cebola, milho e orégano"
                            },
                            {
                                "optionTitle": " Bacon ",
                                "optionPrice": "29.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, bacon, tomate picado, Catupiry e orégano"
                            },
                            {
                                "optionTitle": " Bauru ",
                                "optionPrice": "29.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, presunto, tomate e orégano"
                            },
                            {
                                "optionTitle": " Beneditos ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussrela, calabresa, milho, presunto, tomate picado, cebola e azeitona e orégano"
                            },
                            {
                                "optionTitle": " Calebresa ",
                                "optionPrice": "29.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa e orégano"
                            },
                            {
                                "optionTitle": " Catupiry com bacon ",
                                "optionPrice": "29.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, Catupiry, bacon  e orégano"
                            },
                            {
                                "optionTitle": " Cowboy ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, presunto, bacon, palmito, ovo, Catupiry e orégano"
                            },
                            {
                                "optionTitle": " Crocante ",
                                "optionPrice": "29.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, bacon e batata palha"
                            },
                            {
                                "optionTitle": " Do pizzaiolo ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa, bacon, parmesão, presunto, tomate, azeitona e orégano"
                            },
                            {
                                "optionTitle": " Frango com Catupiry ",
                                "optionPrice": "29.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, frango com Catupiry e orégano"
                            },
                            {
                                "optionTitle": " Frango Filadélfia ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, frango mussarela, cream cheese, bacon e orégano"
                            },
                            {
                                "optionTitle": " Lombo canadense ",
                                "optionPrice": "29.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, lombo com Catupiry e orégano"
                            },
                            {
                                "optionTitle": " Marguerita ",
                                "optionPrice": "29.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, tomate  e manjericão fresco"
                            },
                            {
                                "optionTitle": " Mexicana ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa, presunto picado, pimenta calabresa,cebola e orégano"
                            },
                            {
                                "optionTitle": " Milho ",
                                "optionPrice": "29.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, milho e orégano"
                            },
                            {
                                "optionTitle": " Moda da casa ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa, presunto, frango, bacon, ovo, cebola e orégano"
                            },
                            {
                                "optionTitle": " Mussarela ",
                                "optionPrice": "29.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, tomate azeitona e orégano."
                            },
                            {
                                "optionTitle": " Nachos ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, carne moída, cheddar e Doritos"
                            },
                            {
                                "optionTitle": " Napolitana ",
                                "optionPrice": "29.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, tomate em rodelas, parmesão  e orégano."
                            },
                            {
                                "optionTitle": " Palmito ",
                                "optionPrice": "29.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, palmito, Catupiry e orégano."
                            },
                            {
                                "optionTitle": " Pizza do chef ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, lombo, frango, palmito, tomate, cheddar orégano e batata palha"
                            },
                            {
                                "optionTitle": " Portuguesa ",
                                "optionPrice": "29.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, presunto, ovos, cebola, azeitona  e orégano."
                            },
                            {
                                "optionTitle": " Quatro queijos ",
                                "optionPrice": "29.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, Catupiry, parmesão, provolone e orégano ."
                            },
                            {
                                "optionTitle": " Romanesca ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa, bacon, milho, ovos e azeitona"
                            },
                            {
                                "optionTitle": " Siciliana ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, parmesão, calabresa, tomate fatiado, cebola, Catupiry e orégano"
                            },
                            {
                                "optionTitle": " Toscana ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa, bacon, ovos, tomate e orégano"
                            },
                            {
                                "optionTitle": " Atum ",
                                "optionPrice": "29.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, atum, tomate, cebola e orégano"
                            },
                            {
                                "optionTitle": " Escarola Especiale ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, escarola, cebola, parmesão e alho frito"
                            },
                            {
                                "optionTitle": " Escarola c/ Bacon ",
                                "optionPrice": "29.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, escarola temperada, bacon, alho frito e orégano "
                            },
                            {
                                "optionTitle": " Parmegiana ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Mussarela, Presunto, Molho Ao Sugo e Parmesao"
                            },
                            {
                                "optionTitle": " Grega  ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela , Calabresa, Bacon, Palmito, Tomate e Oregano"
                            },
                            {
                                "optionTitle": " Barbecue ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Strogonoff de Carne, Cebola, Bacon, Cheddar e Barbecue."
                            },
                            {
                                "optionTitle": " Atum Especial ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Atum, Tomate, Parmesão e Catupiry."
                            },
                            {
                                "optionTitle": " Pompeia ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Tomate, Bacon, Parmesao e Catupiry"
                            },
                            {
                                "optionTitle": " Vegetariana ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Tomate, Cebola, Champignom, Escarola, Palmito, Milho e Oregano"
                            },
                            {
                                "optionTitle": " Ta Combinado ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Presunto, Milho, Palmito, Champignon, Catupiry, Cheddar e Orégano."
                            },
                            {
                                "optionTitle": " Fiorentina ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Bacon, Frango, Palmito, Cheddar e Orégano."
                            },
                            {
                                "optionTitle": " Frango Ao Catupiry Especial ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Frango, Tomate, Catupiry, Champignon e Orégano."
                            },
                            {
                                "optionTitle": " Nachos ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, carne moída, cheddar e Doritos"
                            },
                            {
                                "optionTitle": " Strogonoff ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Strogonoff de Carne, Champignon e Batata Palha."
                            },
                            {
                                "optionTitle": " Capriciosa ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Calabresa, Milho, Presunto, Bacon, Batata Palha e Orégano."
                            },
                            {
                                "optionTitle": " Do Patrão ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Lombo, Champignon, Palmito, Milho, Catupiry e Orégano."
                            },
                            {
                                "optionTitle": " Ta Combinado ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Presunto, Milho, Palmito, Champignon, Catupiry, Cheddar e Orégano."
                            },
                            {
                                "optionTitle": " Kids ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Doce de leite, mussaarela, chocolate preto, confetes e leite condensado "
                            },
                            {
                                "optionTitle": " Fiorentina ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Bacon, Frango, Palmito, Cheddar e Orégano."
                            },
                            {
                                "optionTitle": " Beijinhos ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Doce de leite, chocolate branco, coco e leite condensado"
                            },
                            {
                                "optionTitle": " Prestígio ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Doce de leite, chocolate preto, leite condensado  e coco"
                            },
                            {
                                "optionTitle": " Banoffe ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Muçarela, doce de leite, banana, chocolate branco "
                            },
                            {
                                "optionTitle": " Mármore ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Doce de leite, chocolate branco e preto"
                            },
                            {
                                "optionTitle": " Oreo ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Doce de leite, muçarela, chocolate branco e Oreo "
                            },
                            {
                                "optionTitle": " Banana ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Doce de leite, muçarela, banana, canela e açúcar"
                            },
                            {
                                "optionTitle": " Morango moreno ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Doce de leite, chocolate preto, morango e leite condensado "
                            },
                            {
                                "optionTitle": " Sensação ",
                                "optionPrice": "34.90",
                                "optionQtd": "",
                                "optionDescription": "Doce de leite, chocolate, branco, morango e leite condensado "
                            }
                        ]
                    },
                    {
                        "nameComplement": "Borda Broto",
                        "typeComplement": "Escolha até 1 item",
                        "required": "",
                        "options": [
                            {
                                "optionTitle": " Borda de Catupiry ",
                                "optionPrice": "9.90",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda Frango com Catupiry ",
                                "optionPrice": "9.90",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda de Cheddar ",
                                "optionPrice": "9.90",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda de Chocolate ",
                                "optionPrice": "9.90",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda de Crean Cheese ",
                                "optionPrice": "9.90",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda de Calabresa ",
                                "optionPrice": "9.90",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda de Queijo e Presunto ",
                                "optionPrice": "9.90",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borde de Mussarela ",
                                "optionPrice": "9.90",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Grande ",
                "price": "",
                "imgSrc": "https://anotaai.s3.us-west-2.amazonaws.com/pizzas/2pizza",
                "descricao": "Pizza com até 2 sabores e 8 fatias",
                "complementsDict": [
                    {
                        "nameComplement": "Sabor Grande ",
                        "typeComplement": "Escolha de 1 até 2 itens",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Americana ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, bacon, cebola, milho e orégano"
                            },
                            {
                                "optionTitle": " Bacon ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, bacon, tomate picado, Catupiry e orégano"
                            },
                            {
                                "optionTitle": " Bauru ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, presunto, tomate e orégano"
                            },
                            {
                                "optionTitle": " Beneditos ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussrela, calabresa, milho, presunto, tomate picado, cebola e azeitona e orégano"
                            },
                            {
                                "optionTitle": " Calebresa ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa e orégano"
                            },
                            {
                                "optionTitle": " Catupiry com bacon ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, Catupiry, bacon  e orégano"
                            },
                            {
                                "optionTitle": " Cowboy ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, presunto, bacon, palmito, ovo, Catupiry e orégano"
                            },
                            {
                                "optionTitle": " Crocante ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, bacon e batata palha"
                            },
                            {
                                "optionTitle": " Do pizzaiolo ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa, bacon, parmesão, presunto, tomate, azeitona e orégano"
                            },
                            {
                                "optionTitle": " Frango com Catupiry ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, frango com Catupiry e orégano"
                            },
                            {
                                "optionTitle": " Frango Filadélfia ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, frango mussarela, cream cheese, bacon e orégano"
                            },
                            {
                                "optionTitle": " Lombo canadense ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, lombo com Catupiry e orégano"
                            },
                            {
                                "optionTitle": " Marguerita ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, tomate  e manjericão fresco"
                            },
                            {
                                "optionTitle": " Mexicana ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa, presunto picado, pimenta calabresa,cebola e orégano"
                            },
                            {
                                "optionTitle": " Milho ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, milho e orégano"
                            },
                            {
                                "optionTitle": " Moda da casa ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa, presunto, frango, bacon, ovo, cebola e orégano"
                            },
                            {
                                "optionTitle": " Mussarela ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, tomate azeitona e orégano."
                            },
                            {
                                "optionTitle": " Nachos ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, carne moída, cheddar e Doritos"
                            },
                            {
                                "optionTitle": " Napolitana ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, tomate em rodelas, parmesão  e orégano."
                            },
                            {
                                "optionTitle": " Palmito ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, palmito, Catupiry e orégano."
                            },
                            {
                                "optionTitle": " Pizza do chef ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, lombo, frango, palmito, tomate, cheddar orégano e batata palha"
                            },
                            {
                                "optionTitle": " Portuguesa ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, presunto, ovos, cebola, azeitona  e orégano."
                            },
                            {
                                "optionTitle": " Quatro queijos ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, Catupiry, parmesão, provolone e orégano ."
                            },
                            {
                                "optionTitle": " Romanesca ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa, bacon, milho, ovos e azeitona"
                            },
                            {
                                "optionTitle": " Siciliana ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, parmesão, calabresa, tomate fatiado, cebola, Catupiry e orégano"
                            },
                            {
                                "optionTitle": " Toscana ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, calabresa, bacon, ovos, tomate e orégano"
                            },
                            {
                                "optionTitle": " Escarola Especiale ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, escarola, cebola, parmesão e alho frito"
                            },
                            {
                                "optionTitle": " Atum ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, atum, tomate, cebola e orégano"
                            },
                            {
                                "optionTitle": " Escarola c/ Bacon ",
                                "optionPrice": "39.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, escarola temperada, bacon, alho frito e orégano "
                            },
                            {
                                "optionTitle": " Parmegiana ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Mussarela, Presunto, Molho Ao Sugo e Parmesao"
                            },
                            {
                                "optionTitle": " Grega  ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela , Calabresa, Bacon, Palmito, Tomate e Oregano"
                            },
                            {
                                "optionTitle": " Atum Especial ",
                                "optionPrice": "59.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Atum, Tomate, Parmesão e Catupiry."
                            },
                            {
                                "optionTitle": " Barbecue ",
                                "optionPrice": "59.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Strogonoff de Carne, Cebola, Bacon, Cheddar e Barbecue."
                            },
                            {
                                "optionTitle": " Pompeia ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Tomate, Bacon, Parmesao e Catupiry"
                            },
                            {
                                "optionTitle": " Vegetariana ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Tomate, Cebola, Champignom, Escarola, Palmito, Milho e Oregano"
                            },
                            {
                                "optionTitle": " Ta Combinado ",
                                "optionPrice": "59.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Presunto, Milho, Palmito, Champignon, Catupiry, Cheddar e Orégano."
                            },
                            {
                                "optionTitle": " Fiorentina ",
                                "optionPrice": "59.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Bacon, Frango, Palmito, Cheddar e Orégano."
                            },
                            {
                                "optionTitle": " Frango Ao Catupiry Especial ",
                                "optionPrice": "59.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Frango, Tomate, Catupiry, Champignon e Orégano."
                            },
                            {
                                "optionTitle": " Nachos ",
                                "optionPrice": "59.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, mussarela, carne moída, cheddar e Doritos"
                            },
                            {
                                "optionTitle": " Ta Combinado ",
                                "optionPrice": "59.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Presunto, Milho, Palmito, Champignon, Catupiry, Cheddar e Orégano."
                            },
                            {
                                "optionTitle": " Capriciosa ",
                                "optionPrice": "59.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Calabresa, Milho, Presunto, Bacon, Batata Palha e Orégano."
                            },
                            {
                                "optionTitle": " Do Patrão ",
                                "optionPrice": "59.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Lombo, Champignon, Palmito, Milho, Catupiry e Orégano."
                            },
                            {
                                "optionTitle": " Strogonoff ",
                                "optionPrice": "59.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Strogonoff de Carne, Champignon e Batata Palha."
                            },
                            {
                                "optionTitle": " Kids ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Doce de leite, mussaarela, chocolate preto, confetes e leite condensado "
                            },
                            {
                                "optionTitle": " Fiorentina ",
                                "optionPrice": "59.90",
                                "optionQtd": "",
                                "optionDescription": "Molho, Mussarela, Bacon, Frango, Palmito, Cheddar e Orégano."
                            },
                            {
                                "optionTitle": " Beijinhos ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Doce de leite, chocolate branco, coco e leite condensado"
                            },
                            {
                                "optionTitle": " Mármore ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Doce de leite, chocolate branco e preto"
                            },
                            {
                                "optionTitle": " Prestígio ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Doce de leite, chocolate preto, leite condensado  e coco"
                            },
                            {
                                "optionTitle": " Banoffe ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Muçarela, doce de leite, banana, chocolate branco "
                            },
                            {
                                "optionTitle": " Oreo ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Doce de leite, muçarela, chocolate branco e Oreo "
                            },
                            {
                                "optionTitle": " Banana ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Doce de leite, muçarela, banana, canela e açúcar"
                            },
                            {
                                "optionTitle": " Sensação ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Doce de leite, chocolate, branco, morango e leite condensado "
                            },
                            {
                                "optionTitle": " Morango moreno ",
                                "optionPrice": "49.90",
                                "optionQtd": "",
                                "optionDescription": "Doce de leite, chocolate preto, morango e leite condensado "
                            }
                        ]
                    },
                    {
                        "nameComplement": "Borda Grande ",
                        "typeComplement": "Escolha até 1 item",
                        "required": "",
                        "options": [
                            {
                                "optionTitle": " Borda de Catupiry ",
                                "optionPrice": "14.90",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda Frango com Catupiry ",
                                "optionPrice": "14.90",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda de Cheddar ",
                                "optionPrice": "14.90",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda de Chocolate ",
                                "optionPrice": "14.90",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda de Crean Cheese ",
                                "optionPrice": "14.90",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda de Calabresa ",
                                "optionPrice": "14.90",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borda de Queijo e Presunto ",
                                "optionPrice": "14.90",
                                "optionQtd": "Máximo 1",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Borde de Mussarela ",
                                "optionPrice": "14.90",
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
        "categoryName": "Bebidas não alcóolicas",
        "productsCategory": [
            {
                "title": "Refrigerante 2 Litros",
                "price": "",
                "imgSrc": "https://client-assets.anota.ai/produtos/64ef831d54810f00194c9fa7/6500543dcd9d0f00198642a9/6500543dcd9d0f00198642af-1694901050236blob_600",
                "descricao": "2 litros",
                "complementsDict": [
                    {
                        "nameComplement": "Escolha o Sabor",
                        "typeComplement": "Escolha 1 item",
                        "required": "Obrigatório",
                        "options": [
                            {
                                "optionTitle": " Coca Cola ",
                                "optionPrice": "14.00",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Coca Cola ZERO ",
                                "optionPrice": "14.00",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Fanta Uva ",
                                "optionPrice": "14.00",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Fanta Laranja ",
                                "optionPrice": "14.00",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Guaraná ",
                                "optionPrice": "14.00",
                                "optionQtd": "",
                                "optionDescription": ""
                            },
                            {
                                "optionTitle": " Cint (sabor de acordo com a disponibilidade) ",
                                "optionPrice": "10.00",
                                "optionQtd": "",
                                "optionDescription": ""
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
  
  const csv = createCSV(scrapedData);
  console.log(csv);
  