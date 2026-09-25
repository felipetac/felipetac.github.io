---
layout: post
title: "Estruturas de Dados | #7 - Árvores de Busca Binária e AVL"
date: 2026-09-25 10:00:00
image: '/assets/img/posts/dsa-arvores-de-busca-binaria-e-avl.webp'
description: Como funciona uma árvore de busca binária (BST) - busca, inserção e remoção - e como as árvores AVL usam fator de balanceamento e rotações pra se manterem sempre balanceadas.
category: 'dev'
tags:
- Python
- Programação
- Árvores de Busca
twitter_text: Árvores de Busca Binária e AVL em Python
introduction: "Nesta parte da série, você vai aprender como funciona uma Árvore de Busca Binária (BST), e como as árvores AVL se autobalanceiam pra manter buscas rápidas."
---

No post anterior você viu árvores binárias de forma genérica — cada nó com no máximo dois filhos. Agora vem a parte que torna essa estrutura realmente útil pra busca: organizar os valores seguindo uma regra específica.

## O que é uma Árvore de Busca Binária

Uma **Árvore de Busca Binária** (Binary Search Tree, ou BST) é uma árvore binária onde, pra qualquer nó, o filho esquerdo (e todos os seus descendentes) sempre tem valor menor, e o filho direito (e seus descendentes) sempre tem valor maior. Essa regra vale recursivamente pra cada subárvore.

É essa organização que torna busca, inserção e remoção rápidas — e sem precisar deslocar nada na memória, como aconteceria com um array.

## Confirmando que é uma BST

Uma forma de checar se uma árvore respeita a regra da BST é fazer um percurso em ordem: se o resultado sai em ordem crescente, é uma BST.

```py
class NoArvore:
    def __init__(self, dado):
        self.dado = dado
        self.esquerda = None
        self.direita = None

def percorrer_em_ordem(no):
    if no is None:
        return
    percorrer_em_ordem(no.esquerda)
    print(no.dado, end=", ")
    percorrer_em_ordem(no.direita)

raiz = NoArvore(13)
no7 = NoArvore(7)
no15 = NoArvore(15)
no3 = NoArvore(3)
no8 = NoArvore(8)
no14 = NoArvore(14)
no19 = NoArvore(19)
no18 = NoArvore(18)

raiz.esquerda = no7
raiz.direita = no15

no7.esquerda = no3
no7.direita = no8

no15.esquerda = no14
no15.direita = no19

no19.esquerda = no18

percorrer_em_ordem(raiz)
```

A saída é:

```py
3, 7, 8, 13, 14, 15, 18, 19,
```

Como o percurso em ordem retornou os números em sequência crescente, confirma-se que essa árvore é uma BST.

## Buscando um valor

A busca numa BST lembra a busca binária num array ordenado: em cada nó, você decide ir pra esquerda ou pra direita comparando o valor procurado com o valor do nó atual.

```py
def buscar(no, alvo):
    if no is None:
        return None
    elif no.dado == alvo:
        return no
    elif alvo < no.dado:
        return buscar(no.esquerda, alvo)
    else:
        return buscar(no.direita, alvo)

resultado = buscar(raiz, 14)
if resultado:
    print(f"Encontrado o nó com valor: {resultado.dado}")
else:
    print("Valor não encontrado na BST.")
```

A saída é:

```py
Encontrado o nó com valor: 14
```

A complexidade de tempo da busca é **O(h)**, onde `h` é a altura da árvore. Numa BST **balanceada**, a altura cresce de forma logarítmica em relação ao número de nós, então a busca é rápida. Mas se a árvore ficar "torta" — por exemplo, com quase todos os nós pendurados do lado direito — a altura se aproxima do número total de nós, e a busca fica tão lenta quanto percorrer uma lista encadeada inteira. Esse é o problema que as árvores AVL, na segunda metade deste post, resolvem.

## Inserindo um nó

Inserir segue a mesma lógica da busca: desce-se pela árvore comparando valores, até achar o lugar vazio onde o novo nó deve entrar — que sempre acaba virando uma nova folha.

```py
def inserir(no, dado):
    if no is None:
        return NoArvore(dado)
    else:
        if dado < no.dado:
            no.esquerda = inserir(no.esquerda, dado)
        elif dado > no.dado:
            no.direita = inserir(no.direita, dado)
    return no

inserir(raiz, 10)
```

## Encontrando o menor valor de uma subárvore

Essa função auxiliar vai ser útil daqui a pouco, na remoção: basta ir sempre pra esquerda até não haver mais filho esquerdo.

```py
def no_de_menor_valor(no):
    atual = no
    while atual.esquerda is not None:
        atual = atual.esquerda
    return atual

print("Menor valor:", no_de_menor_valor(raiz).dado)
```

## Apagando um nó

Remover um nó de uma BST tem três casos possíveis:

1. **O nó é uma folha:** basta remover a ligação com ele.
2. **O nó tem só um filho:** o pai do nó passa a apontar direto pra esse filho.
3. **O nó tem dois filhos:** encontra-se o sucessor em ordem (o menor valor da subárvore direita), copia-se o valor dele pro nó atual, e então apaga-se o sucessor — que, por definição, sempre vai ser uma folha ou ter no máximo um filho.

```py
def apagar(no, dado):
    if not no:
        return None

    if dado < no.dado:
        no.esquerda = apagar(no.esquerda, dado)
    elif dado > no.dado:
        no.direita = apagar(no.direita, dado)
    else:
        if not no.esquerda:
            temp = no.direita
            no = None
            return temp
        elif not no.direita:
            temp = no.esquerda
            no = None
            return temp

        no.dado = no_de_menor_valor(no.direita).dado
        no.direita = apagar(no.direita, no.dado)

    return no

apagar(raiz, 15)
```

## AVL: árvores que se autobalanceiam

A **árvore AVL** — batizada em homenagem aos seus inventores, Georgy **A**delson-**V**elsky e Evgenii **L**andis — é um tipo de BST que resolve exatamente o problema mencionado lá em cima: ela se rebalanceia sozinha, garantindo altura mínima e, com isso, busca, inserção e remoção em **O(log n)**, mesmo no pior caso.

### O fator de balanceamento

Cada nó de uma árvore AVL guarda sua própria altura. A partir dela, calcula-se o **fator de balanceamento** de um nó:

```
FB(nó) = altura(subárvore esquerda) − altura(subárvore direita)
```

- `FB = 0`: o nó está balanceado.
- `FB > 0`: o nó pende pra esquerda ("left-heavy").
- `FB < 0`: o nó pende pra direita ("right-heavy").

Se o fator de balanceamento de algum nó passar de 1 ou -1, a árvore está desbalanceada, e uma rotação é necessária.

### Os quatro casos de desbalanceamento

| Caso | Descrição | Rotação pra corrigir |
|---|---|---|
| Esquerda-Esquerda (LL) | O nó desbalanceado e seu filho esquerdo pendem pra esquerda | Uma rotação simples à direita |
| Direita-Direita (RR) | O nó desbalanceado e seu filho direito pendem pra direita | Uma rotação simples à esquerda |
| Esquerda-Direita (LR) | O nó desbalanceado pende pra esquerda, mas o filho esquerdo pende pra direita | Rotação à esquerda no filho esquerdo, depois rotação à direita no nó desbalanceado |
| Direita-Esquerda (RL) | O nó desbalanceado pende pra direita, mas o filho direito pende pra esquerda | Rotação à direita no filho direito, depois rotação à esquerda no nó desbalanceado |

### Implementando as rotações

```py
class NoAVL:
    def __init__(self, dado):
        self.dado = dado
        self.esquerda = None
        self.direita = None
        self.altura = 1

def obter_altura(no):
    if not no:
        return 0
    return no.altura

def obter_fator_balanceamento(no):
    if not no:
        return 0
    return obter_altura(no.esquerda) - obter_altura(no.direita)

def rotacionar_direita(y):
    x = y.esquerda
    t2 = x.direita
    x.direita = y
    y.esquerda = t2
    y.altura = 1 + max(obter_altura(y.esquerda), obter_altura(y.direita))
    x.altura = 1 + max(obter_altura(x.esquerda), obter_altura(x.direita))
    return x

def rotacionar_esquerda(x):
    y = x.direita
    t2 = y.esquerda
    y.esquerda = x
    x.direita = t2
    x.altura = 1 + max(obter_altura(x.esquerda), obter_altura(x.direita))
    y.altura = 1 + max(obter_altura(y.esquerda), obter_altura(y.direita))
    return y
```

### Inserindo com rebalanceamento automático

Depois de inserir normalmente (igual numa BST comum), a função sobe de volta pela recursão atualizando a altura de cada nó ancestral e checando o fator de balanceamento — esse processo se chama **retracing**. Se algum ancestral sair do intervalo -1 a 1, a rotação certa é aplicada ali mesmo, cobrindo os quatro casos da tabela.

```py
def inserir_avl(no, dado):
    if not no:
        return NoAVL(dado)

    if dado < no.dado:
        no.esquerda = inserir_avl(no.esquerda, dado)
    elif dado > no.dado:
        no.direita = inserir_avl(no.direita, dado)

    no.altura = 1 + max(obter_altura(no.esquerda), obter_altura(no.direita))
    balanceamento = obter_fator_balanceamento(no)

    # Caso Esquerda-Esquerda
    if balanceamento > 1 and obter_fator_balanceamento(no.esquerda) >= 0:
        return rotacionar_direita(no)

    # Caso Esquerda-Direita
    if balanceamento > 1 and obter_fator_balanceamento(no.esquerda) < 0:
        no.esquerda = rotacionar_esquerda(no.esquerda)
        return rotacionar_direita(no)

    # Caso Direita-Direita
    if balanceamento < -1 and obter_fator_balanceamento(no.direita) <= 0:
        return rotacionar_esquerda(no)

    # Caso Direita-Esquerda
    if balanceamento < -1 and obter_fator_balanceamento(no.direita) > 0:
        no.direita = rotacionar_direita(no.direita)
        return rotacionar_esquerda(no)

    return no
```

> **Nota:** apagar um nó numa AVL segue exatamente os mesmos três casos de uma BST comum (vistos mais acima), reaproveitando a mesma `no_de_menor_valor()` pra achar o sucessor em ordem — só que, depois de remover, o mesmo processo de retracing entra em ação pra rebalancear a árvore se for preciso.

Com BST e AVL, você fecha o assunto de árvores nesta série. No próximo post, a estrutura muda de forma: em vez de uma hierarquia com raiz única, você vai conhecer os grafos, onde qualquer nó pode se conectar a qualquer outro.

**Fonte adaptada:** [Binary Search Trees with Python](https://www.w3schools.com/python/python_dsa_binarysearchtrees.asp), [AVL Trees with Python](https://www.w3schools.com/python/python_dsa_avltrees.asp)
