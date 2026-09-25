---
layout: post
title: "NumPy #11 - Dados Ausentes e Arquivos"
date: 2026-08-11 16:54:00
image: '/assets/img/posts/numpy-com-python-dados-ausentes-e-arquivos.webp'
description: Como identificar, remover e substituir valores ausentes (NaN) em um array, e como salvar e carregar arrays em arquivo com NumPy, fechando a série NumPy com Python.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Numpy
twitter_text: "NumPy #11 - Dados Ausentes e Arquivos"
introduction: "Nesta parte do tutorial, você vai aprender a lidar com valores ausentes em um array e a salvar e carregar arrays em arquivo, fechando a série de NumPy."
---

Nos [dois posts anteriores](/numpy-com-python-distribuicoes-de-probabilidade-parte-2/), você simulou dados do zero com `numpy.random`. Na prática, porém, boa parte dos dados que você vai processar vem de fora — e vem com buracos. Fechando a série, dois assuntos bem do dia a dia: como lidar com valores ausentes em um array, e como salvar/carregar arrays em disco sem depender de recriar tudo em código toda vez.

## Identificando e removendo valores ausentes

O NumPy representa um valor ausente com `np.nan` ("Not a Number") — um valor especial de ponto flutuante que se comporta de um jeito estranho: `np.nan == np.nan` dá `False`, então comparar diretamente não funciona pra detectar ausência.

### np.isnan()

```py
import numpy as np

arr = np.array([1, 2, np.nan, 4, np.nan, 6])

print(np.isnan(arr))
```

A saída é:

```py
[False False  True False  True False]
```

`np.isnan()` é a forma correta de checar ausência — devolve uma máscara booleana, `True` onde o valor é `NaN`.

### Removendo valores ausentes

Combinando essa máscara com o operador `~` (que inverte booleanos, visto lá no post de broadcasting), dá pra filtrar um array removendo os `NaN`s — a mesma técnica de indexação booleana vista no post de filtro.

```py
sem_nan = arr[~np.isnan(arr)]

print(sem_nan)
```

A saída é:

```py
[1. 2. 4. 6.]
```

## Substituindo valores ausentes

Remover nem sempre é a melhor opção — em uma matriz, por exemplo, remover uma linha inteira por causa de um único `NaN` pode jogar fora dado bom junto. Às vezes faz mais sentido substituir.

### np.nan_to_num()

```py
print(np.nan_to_num(arr))
print(np.nan_to_num(arr, nan=-1))
```

A saída é:

```py
[1. 2. 0. 4. 0. 6.]
[ 1.  2. -1.  4. -1.  6.]
```

Sem argumentos, `np.nan_to_num()` troca todo `NaN` por `0`. Com o parâmetro `nan`, você escolhe qual valor usar no lugar — nesse exemplo, `-1`.

### Imputando com a média (np.nanmean())

Trocar por `0` ou por um valor fixo arbitrário costuma distorcer estatísticas calculadas depois. Uma abordagem mais comum é substituir cada `NaN` pela média dos valores que **não** são ausentes — e é aí que entra `np.nanmean()`, uma versão de `np.mean()` que ignora `NaN`s no cálculo.

```py
media = np.nanmean(arr)
imputado = np.where(np.isnan(arr), media, arr)

print(media)
print(imputado)
```

A saída é:

```py
3.25
[1.   2.   3.25 4.   3.25 6.  ]
```

`np.nanmean()` calculou a média só dos 4 valores válidos (`1, 2, 4, 6`), ignorando os dois `NaN`s. `np.where(condição, valor_se_true, valor_se_false)`, vista no post #3, troca cada `NaN` por essa média, mantendo os outros valores como estavam.

> **Nota:** existem também `np.nanmedian()`, `np.nansum()`, `np.nanstd()` e outras variantes "nan-aware" pra praticamente toda função estatística vista no post anterior — todas seguem o mesmo padrão de prefixo `nan` e ignoram valores ausentes automaticamente.

### Contando valores ausentes por linha

Em uma matriz, às vezes o que interessa não é o valor em si, mas quantos `NaN`s cada linha tem — útil, por exemplo, pra decidir quais linhas de um conjunto de dados têm informação demais faltando pra valer a pena manter.

```py
matriz = np.array([[1, np.nan, 3],
                    [np.nan, np.nan, 6],
                    [7, 8, 9]])

faltantes_por_linha = np.sum(np.isnan(matriz), axis=1)
print(faltantes_por_linha)
```

A saída é:

```py
[1 2 0]
```

`np.isnan(matriz)` gera uma matriz booleana do mesmo shape, e `np.sum(..., axis=1)` soma os `True` (que valem `1`) de cada linha — a mesma combinação de máscara booleana com `axis` que apareceu nos dois posts anteriores.

## Salvando e carregando arrays em arquivo

### Texto simples com np.savetxt() e np.loadtxt()

Pra um array numérico simples, o formato mais portátil é texto delimitado (tipo CSV) — o mesmo formato que você provavelmente já abriria numa planilha.

```py
matriz = np.array([[1, 2, 3],
                    [4, 5, 6]])

np.savetxt('matriz.csv', matriz, delimiter=',', fmt='%d')

carregado = np.loadtxt('matriz.csv', delimiter=',')
print(carregado)
```

A saída é:

```py
[[1. 2. 3.]
 [4. 5. 6.]]
```

`fmt='%d'` controla o formato de cada número no arquivo salvo (aqui, inteiro, sem casas decimais); `np.loadtxt()` sempre lê de volta como `float` por padrão, por isso o `.` depois de cada número no resultado, mesmo os valores tendo sido salvos como inteiros.

### Formato binário com np.save() e np.load()

Pra arrays maiores, ou quando você quer preservar o `dtype` exato sem depender de conversão de texto, o formato nativo do NumPy (`.npy`) é mais rápido e mais compacto.

```py
np.save('matriz.npy', matriz)

carregado = np.load('matriz.npy')
print(carregado)
```

A saída é:

```py
[[1 2 3]
 [4 5 6]]
```

Repare que, diferente do `loadtxt()`, o `dtype` original (inteiro) foi preservado — o `.npy` guarda o array em um formato binário próprio do NumPy, sem passar por texto.

### Vários arrays de uma vez com np.savez()

Se você precisa salvar mais de um array no mesmo arquivo, `np.savez()` empacota tudo em um único `.npz` (um zip por baixo dos panos), acessado depois como um dicionário.

```py
notas = np.array([7, 8, 9])
faltas = np.array([2, 0, 1])

np.savez('turma.npz', notas=notas, faltas=faltas)

dados = np.load('turma.npz')
print(dados['notas'])
print(dados['faltas'])
```

A saída é:

```py
[7 8 9]
[2 0 1]
```

Cada argumento nomeado passado pra `savez()` (`notas=notas`, `faltas=faltas`) vira uma chave do arquivo `.npz`, acessível do mesmo jeito que um dicionário Python depois de carregado com `np.load()`.

E assim fecho a série "NumPy com Python": criação e indexação de arrays, copy/view/shape/iteração, join/split/search/sort/filter, random básico e ufuncs, arredondamento/logaritmos/somas acumuladas, MDC/MMC/trigonometria/conjuntos, broadcasting e álgebra linear, estatísticas descritivas, distribuições de probabilidade, e agora dados ausentes e arquivos. É uma base sólida pra seguir pra bibliotecas construídas em cima do NumPy, como pandas e scikit-learn.

**Fonte adaptada:** [NumPy - Identifying Missing Values](https://www.tutorialspoint.com/numpy/numpy_identifying_missing_values.htm), [NumPy - Removing Missing Data](https://www.tutorialspoint.com/numpy/numpy_removing_missing_data.htm), [NumPy - Imputing Missing Data](https://www.tutorialspoint.com/numpy/numpy_imputing_missing_data.htm), [NumPy - Loading Arrays](https://www.tutorialspoint.com/numpy/numpy_loading_arrays.htm), [NumPy - Saving Arrays](https://www.tutorialspoint.com/numpy/numpy_saving_arrays.htm)
