---
layout: post
title: "#17 - Lendo e Escrevendo Excel, HTML e Exportando Arquivos"
date: 2026-08-11 18:20:00
image: '/assets/img/posts/pandas-lendo-e-escrevendo-excel-html-e-exportando-arquivos.webp'
description: Como ler planilhas Excel com read_excel(), extrair tabelas de páginas HTML com read_html(), e exportar um DataFrame de volta para CSV, JSON e Excel.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Pandas
twitter_text: Lendo e Escrevendo Excel, HTML e Exportando Arquivos
introduction: "Nesta parte do tutorial, você vai aprender a ler arquivos Excel e HTML com o Pandas, e a exportar um DataFrame para CSV, JSON e Excel."
---

No post anterior você combinou dados vindos de tabelas diferentes numa única análise. Mas até agora a série só mostrou como ler dados de CSV e JSON — lá no primeiro post — e nunca como lidar com outros formatos comuns, nem como fazer o caminho inverso: salvar o resultado de volta num arquivo. Este post fecha essas duas pontas: leitura de Excel e HTML, e exportação com `to_csv()`, `to_json()` e `to_excel()`.

## Lendo planilhas Excel com read_excel()

Excel continua sendo um formato comum pra troca de dados, principalmente fora de times técnicos. `read_excel()` carrega uma planilha do mesmo jeito que `read_csv()` carrega um CSV.

### Exemplo 1 - lendo uma planilha específica

```py
import pandas as pd

df = pd.read_excel("vendas.xlsx", sheet_name="2026")
print(df.head())
```

Se o arquivo tiver mais de uma aba, `sheet_name` escolhe qual carregar — por nome (como no exemplo) ou por posição numérica (`sheet_name=0` pra primeira aba). Sem esse parâmetro, o Pandas carrega só a primeira aba por padrão.

> **Nota:** ler e escrever Excel depende de uma biblioteca auxiliar instalada separadamente (`openpyxl`, na maioria dos casos) — se faltar, o Pandas avisa com um erro claro pedindo pra instalar o pacote certo.

## Lendo tabelas de páginas HTML com read_html()

Quando os dados que você precisa estão numa tabela dentro de uma página web (não num arquivo baixado), `read_html()` extrai automaticamente todas as tabelas `<table>` da página, devolvendo uma lista de DataFrames.

### Exemplo 2 - extraindo tabelas de uma página

```py
tabelas = pd.read_html("https://exemplo.com/estatisticas")
print(len(tabelas))
print(tabelas[0].head())
```

Como uma página pode ter várias tabelas, o retorno é sempre uma lista — mesmo quando só existe uma tabela na página, você acessa com `tabelas[0]`. O parâmetro `match` ajuda a filtrar, aceitando só tabelas que contenham um texto específico, útil quando a página tem várias tabelas e você quer só uma delas.

O parâmetro `match`, mencionado acima, funciona assim na prática:

```py
tabela_especifica = pd.read_html("https://exemplo.com/estatisticas", match="Total de vendas")[0]
```

Isso descarta qualquer tabela da página que não contenha o texto `"Total de vendas"` em algum lugar, evitando ter que adivinhar a posição certa na lista.

## Exportando de volta para arquivo

Depois de toda a limpeza e análise, o passo final costuma ser salvar o resultado. Os métodos de exportação seguem o padrão `to_<formato>()`, espelhando os `read_<formato>()` que abriram esta série.

### Exemplo 3 - exportando para CSV

```py
resultado = pd.DataFrame({"produto": ["notebook", "mouse"], "total": [38400, 5970]})
resultado.to_csv("resultado.csv", index=False)
```

`index=False` evita que o índice numérico do Pandas vire uma coluna extra no arquivo — geralmente é isso que você quer, a não ser que o índice em si carregue alguma informação relevante (como um ID ou uma data).

### Exemplo 4 - exportando para JSON e Excel

```py
resultado.to_json("resultado.json", orient="records")
resultado.to_excel("resultado.xlsx", sheet_name="Resumo", index=False)
```

`orient="records"` grava o JSON como uma lista de objetos (um por linha), o formato mais comum pra consumo por outras aplicações — sem esse parâmetro, o Pandas usa uma estrutura por coluna, menos intuitiva pra quem só quer ler os dados.

> **Nota:** o Pandas também exporta pra outros formatos com a mesma convenção — `to_sql()` grava direto num banco de dados, `to_parquet()` grava num formato binário colunar eficiente pra grandes volumes. O padrão `to_<formato>()` se repete em praticamente todos.

## Escrevendo várias abas no mesmo arquivo Excel

Quando o resultado final precisa de mais de uma aba no mesmo arquivo — um resumo numa aba, o detalhamento em outra — `to_excel()` sozinho não dá conta, porque cada chamada sobrescreve o arquivo inteiro. A classe `ExcelWriter` resolve isso, funcionando como um contexto (`with`) que acumula várias abas antes de salvar.

### Exemplo 5 - múltiplas abas com ExcelWriter

```py
resumo = pd.DataFrame({"produto": ["notebook", "mouse"], "total": [38400, 5970]})
detalhado = pd.DataFrame({"pedido": [101, 102], "produto": ["notebook", "mouse"]})

with pd.ExcelWriter("relatorio.xlsx") as escritor:
    resumo.to_excel(escritor, sheet_name="Resumo", index=False)
    detalhado.to_excel(escritor, sheet_name="Detalhado", index=False)
```

As duas chamadas de `to_excel()` usam o mesmo objeto `escritor`, então as duas abas acabam no mesmo arquivo `relatorio.xlsx`, em vez de um sobrescrever o outro.

> **Nota:** `read_excel()` também aceita `usecols`, pra carregar só algumas colunas da planilha (por letra, como no Excel — `"A:C"` — ou por nome), útil quando a planilha original tem colunas que você sabe de antemão que não vai usar.

Com `read_excel()`, `read_html()` e os métodos `to_<formato>()`, o ciclo de entrada e saída de dados do Pandas está completo: além de CSV e JSON, você agora lê Excel e HTML, e sabe exportar o resultado de qualquer análise de volta pro formato que precisar. O próximo — e último — post desta série fecha com gráficos mais avançados: boxplot, área, pizza e múltiplos subplots de uma vez.

**Fonte adaptada:** [Pandas - Reading Data from an Excel File](https://www.tutorialspoint.com/python_pandas/python_pandas_reading_data_from_an_excel_file.htm), [Pandas - Writing Data to Excel Files](https://www.tutorialspoint.com/python_pandas/python_pandas_writing_data_to_excel_files.htm), [Pandas - Working with HTML Data](https://www.tutorialspoint.com/python_pandas/python_pandas_working_with_html_data.htm), [Pandas - IO Tools](https://www.tutorialspoint.com/python_pandas/python_pandas_io_tool.htm)
