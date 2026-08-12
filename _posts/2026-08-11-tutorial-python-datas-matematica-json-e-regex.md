---
layout: post
title: "#14 - Datas, Matemática, JSON e Expressões Regulares"
date: 2026-08-11 12:20:00
image: '/assets/img/posts/tutorial-python-datas-matematica-json-e-regex.webp'
description: Uma volta pelos módulos datetime, math, json e re do Python - datas e horas, funções matemáticas, conversão de e para JSON e expressões regulares.
category: 'dev'
tags:
- Python
- Programação
- JSON
twitter_text: Datas, Matemática, JSON e Regex
introduction: "Nesta parte do tutorial, você vai conhecer quatro módulos essenciais do Python: datetime, math, json e re (expressões regulares)."
---

Fechando esse bloco mais avançado do tutorial, vamos dar uma volta por quatro módulos que aparecem em praticamente qualquer programa Python de tamanho razoável: `datetime` pra trabalhar com datas e horários, `math` pra funções matemáticas que vão além dos operadores básicos, `json` pra trocar dados com APIs e arquivos de configuração, e `re` pra buscar e manipular texto com expressões regulares.

São quatro assuntos independentes entre si, então sinta-se à vontade pra ler este post em partes, conforme a necessidade do momento.

## O módulo datetime

Diferente de outras linguagens, o Python não tem um tipo "data" embutido na linguagem — pra trabalhar com datas e horários, você precisa importar o módulo `datetime` da biblioteca padrão.

### Data e hora atuais

```py
import datetime

agora = datetime.datetime.now()
print(agora)
```

A saída (o valor exato varia, claro) é algo como:

```py
2026-08-11 12:20:00.123456
```

### Acessando partes de uma data

Um objeto `datetime` tem atributos pra cada componente da data.

```py
import datetime

agora = datetime.datetime.now()
print(agora.year)
print(agora.month)
print(agora.day)
print(agora.strftime("%A"))
```

A saída é algo como:

```py
2026
8
11
Tuesday
```

> **Nota:** por padrão, nomes de dias e meses do `datetime` vêm em inglês, mesmo com o sistema configurado em português. Pra exibir em pt-BR você precisaria configurar o `locale` do sistema operacional, ou formatar o texto manualmente com um dicionário de tradução.

### Criando uma data específica

Pra criar uma data que não é "agora", use o construtor `datetime.datetime(ano, mês, dia, ...)`.

```py
import datetime

data_evento = datetime.datetime(2026, 12, 25)
print(data_evento)
```

A saída é:

```py
2026-12-25 00:00:00
```

### Formatando datas com strftime()

O método `strftime()` converte um objeto `datetime` num texto formatado do jeito que você quiser, usando códigos de formatação — `%Y` pro ano com quatro dígitos, `%m` pro mês numérico, `%d` pro dia, `%B` pro nome do mês por extenso, e por aí vai.

```py
import datetime

data_evento = datetime.datetime(2026, 12, 25)
print(data_evento.strftime("%d/%m/%Y"))
print(data_evento.strftime("%B de %Y"))
```

A saída é:

```py
25/12/2026
December de 2026
```

## O módulo math

Além das quatro operações básicas (`+`, `-`, `*`, `/`) e de algumas funções embutidas que já funcionam sem importar nada (como `min()`, `max()`, `abs()` e `pow()`), o módulo `math` traz funções matemáticas mais específicas.

### Funções embutidas (sem precisar importar)

```py
print(min(4, 9, 1))
print(max(4, 9, 1))
print(abs(-8.5))
print(pow(2, 10))
```

A saída é:

```py
1
9
8.5
1024
```

### Funções do módulo math

Já pra raiz quadrada, arredondamento, logaritmos e constantes como pi, é preciso importar `math`.

```py
import math

print(math.sqrt(64))
print(math.ceil(4.1))
print(math.floor(4.9))
print(math.pi)
```

A saída é:

```py
8.0
5
4
3.141592653589793
```

`math.ceil()` sempre arredonda pra cima, `math.floor()` sempre arredonda pra baixo — diferente da função embutida `round()`, que arredonda pro inteiro mais próximo seguindo a regra usual de arredondamento.

```py
import math

valor = 4.5
print(math.ceil(valor))
print(math.floor(valor))
print(round(valor))
```

A saída é:

```py
5
4
4
```

> **Nota:** repare que `round(4.5)` deu `4`, não `5`. O Python usa "arredondamento bancário" (rounds to even) em caso de empate exato — vale a pena testar esse comportamento se sua aplicação depender de arredondamento preciso.

## O módulo json

JSON (JavaScript Object Notation) é o formato mais comum pra troca de dados entre sistemas — é o que a maioria das APIs usa pra responder requisições, e é um formato de arquivo de configuração popular. O módulo `json`, também da biblioteca padrão, converte entre texto JSON e estruturas Python.

### De JSON para Python: json.loads()

```py
import json

texto_json = '{"nome": "Felipe", "idade": 33, "ativo": true}'
dados = json.loads(texto_json)

print(dados)
print(dados["nome"])
print(type(dados))
```

A saída é:

```py
{'nome': 'Felipe', 'idade': 33, 'ativo': True}
Felipe
<class 'dict'>
```

Repare que `json.loads()` transforma o texto JSON num dicionário Python de verdade, já pronto pra ser acessado com colchetes.

### De Python para JSON: json.dumps()

O caminho inverso — de uma estrutura Python pra um texto JSON — é feito com `json.dumps()`.

```py
import json

pessoa = {
    "nome": "Felipe",
    "idade": 33,
    "linguagens": ["Python", "JavaScript"],
    "ativo": True,
    "endereco": None
}

texto_json = json.dumps(pessoa)
print(texto_json)
```

A saída é:

```py
{"nome": "Felipe", "idade": 33, "linguagens": ["Python", "JavaScript"], "ativo": true, "endereco": null}
```

A tabela de conversão é bem intuitiva: `dict` vira objeto JSON, `list`/`tuple` viram array, `str` vira string, `int`/`float` viram número, `True`/`False` viram `true`/`false` (em minúsculo) e `None` vira `null`.

### Formatando a saída com indent

Por padrão, `json.dumps()` gera tudo numa linha só, o que é ótimo pra transmitir dados, mas péssimo pra ler. O parâmetro `indent` resolve isso.

```py
import json

pessoa = {"nome": "Felipe", "linguagens": ["Python", "JavaScript"]}
print(json.dumps(pessoa, indent=4))
```

A saída é:

```py
{
    "nome": "Felipe",
    "linguagens": [
        "Python",
        "JavaScript"
    ]
}
```

Também dá pra ordenar as chaves alfabeticamente com `sort_keys=True`, útil quando você quer uma saída determinística (por exemplo, pra comparar dois JSONs num teste automatizado).

## O módulo re (expressões regulares)

_Expressão regular_ (ou _regex_) é um padrão de busca escrito numa sintaxe própria e compacta, usado pra encontrar, validar ou substituir trechos de texto que seguem um determinado formato — como validar um e-mail, extrair todos os números de um texto, ou trocar todas as ocorrências de uma palavra.

Em Python, isso é feito através do módulo `re`, também da biblioteca padrão.

### Buscando um padrão com search()

`re.search()` procura o padrão em qualquer lugar da string, e devolve um objeto `Match` na primeira ocorrência encontrada (ou `None`, se não encontrar nada).

```py
import re

texto = "O rato roeu a roupa do rei de Roma"
resultado = re.search(r"ro\w+", texto)

print(resultado)
print(resultado.group())
```

A saída é:

```py
<re.Match object; span=(9, 14), match='roeu'>
roeu
```

### Encontrando todas as ocorrências com findall()

Enquanto `search()` para na primeira ocorrência, `findall()` devolve uma lista com **todas** as ocorrências do padrão no texto.

```py
import re

texto = "O rato roeu a roupa do rei de Roma"
resultados = re.findall(r"ro\w+", texto)

print(resultados)
```

A saída é:

```py
['roeu', 'roupa']
```

Repare que "Roma", com R maiúsculo, não entrou na lista — por padrão, expressões regulares são sensíveis a maiúsculas e minúsculas.

### Dividindo uma string com split()

`re.split()` funciona como o `.split()` de string, só que usando um padrão regex como separador em vez de um texto fixo.

```py
import re

texto = "um,dois;três dez"
partes = re.split(r"[,; ]", texto)

print(partes)
```

A saída é:

```py
['um', 'dois', 'três', 'dez']
```

### Substituindo texto com sub()

`re.sub()` substitui todas as ocorrências de um padrão por outro texto.

```py
import re

texto = "Contato: felipe@exemplo.com ou suporte@exemplo.com"
texto_censurado = re.sub(r"\w+@\w+\.\w+", "[email oculto]", texto)

print(texto_censurado)
```

A saída é:

```py
Contato: [email oculto] ou [email oculto]
```

### Principais metacaracteres

Uma expressão regular ganha poder combinando caracteres especiais (_metacaracteres_) que representam padrões, não caracteres literais. Alguns dos mais usados:

- `.` — qualquer caractere (exceto quebra de linha);
- `^` — início da string;
- `$` — fim da string;
- `*` — zero ou mais ocorrências do que vem antes;
- `+` — uma ou mais ocorrências do que vem antes;
- `?` — zero ou uma ocorrência (torna o anterior opcional);
- `[]` — um conjunto de caracteres, como `[aeiou]`;
- `\d` — um dígito (equivalente a `[0-9]`);
- `\w` — um caractere alfanumérico (letras, números e `_`);
- `\s` — um espaço em branco.

```py
import re

textos = ["ana@email.com", "não é email", "outro@dominio.com.br"]

for texto in textos:
    if re.search(r"^\w+@\w+\.\w+", texto):
        print(f"{texto} parece um e-mail válido")
    else:
        print(f"{texto} não parece um e-mail")
```

A saída é:

```py
ana@email.com parece um e-mail válido
não é email não parece um e-mail
outro@dominio.com.br parece um e-mail válido
```

> **Nota:** essa regex de e-mail é bem simplificada, só pra ilustrar o conceito — validar e-mail de verdade com regex é uma tarefa surpreendentemente complicada, e na prática costuma valer mais a pena usar uma biblioteca pronta pra isso do que tentar cobrir todos os casos com um padrão caseiro.

### O objeto Match

Quando `re.search()` encontra alguma coisa, ele devolve um objeto `Match` com informações úteis sobre a ocorrência: `.span()` devolve a posição inicial e final do trecho encontrado, `.string` devolve a string original pesquisada, e `.group()` devolve o próprio texto encontrado.

```py
import re

resultado = re.search(r"\d+", "Tenho 33 anos")

print(resultado.span())
print(resultado.string)
print(resultado.group())
```

A saída é:

```py
(6, 8)
Tenho 33 anos
33
```

E com isso fecham-se quatro ferramentas que você vai usar direto no dia a dia: `datetime` pra qualquer coisa envolvendo tempo, `math` pra contas mais elaboradas, `json` pra conversar com o mundo exterior via APIs e arquivos de configuração, e `re` pra buscar padrões em texto sem precisar escrever dezenas de `if` e `.find()` encadeados.

**Fonte adaptada:** [Python Datetime](https://www.w3schools.com/python/python_datetime.asp), [Python Math](https://www.w3schools.com/python/python_math.asp), [Python JSON](https://www.w3schools.com/python/python_json.asp), [Python RegEx](https://www.w3schools.com/python/python_regex.asp)
