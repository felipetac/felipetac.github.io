---
layout: post
title: "Typescript em 5 minutos"
date: 2018-01-05 12:51:37
image: 'https://res.cloudinary.com/felipetac/image/upload/v1515159686/typescript2_x1mafy.png'
description: Rápida exemplificação sobre desenvolvimento em Typescript
category: 'dev'
tags:
- Desenvolvimento
- Typescript
- Programação
twitter_text: Rápida exemplificação sobre desenvolvimento em Typescript
introduction: Rápida exemplificação sobre desenvolvimento em Typescript
---
Vamos começar criando um aplicativo web simples com o TypeScript.

## Instalando o TypeScript

Existem duas principais maneiras de obter as ferramentas do TypeScript:

- Via npm (o gerenciador de pacotes do Node.js)
- Ao instalar os plugins do TypeScript no Visual Studio

O Visual Studio 2017 e o Visual Studio 2015 Update 3 incluem TypeScript por padrão. Se você não instalou TypeScript com o Visual Studio, você ainda pode [baixá-lo](https://www.typescriptlang.org/#download-links).

Para usuários do NPM:

```bash
npm install -g typescript
```

> **Observação:** Vai utilizar o Typescript via NPM e não sabe como? Aconselho ler meu outro post [Instalando NodeJS no Ubuntu]({{site.baseurl}}/instalando-nodejs-no-ubuntu/)

## Construindo seu primeiro arquivo TypeScript

Em seu editor, digite o seguinte código JavaScript em um arquivo chamado ```greeter.ts```:

```ts
function greeter(person) {
    return "Hello, " + person;
}

var user = "Jane User";

document.body.innerHTML = greeter(user);
```

## Compilando seu código

Usamos uma extensão ```.ts```, mas esse código é apenas JavaScript. Você poderia ter copiado / colado diretamente de um aplicativo JavaScript existente.

Na linha de comando, execute o compilador do TypeScript:

```bash
tsc greeter.ts
```

O resultado será um arquivo ```greeter.ts``` que contém o mesmo JavaScript que você escreveu. Estamos executando TypeScript em nosso aplicativo JavaScript!

Agora podemos começar a aproveitar algumas das novas ferramentas que o TypeScript oferece. Adicione um ```:string``` ao argumento ‘pessoa’ como mostrado a seguir:

```ts
function greeter(person: string) {
    return "Hello, " + person;
}

var user = "Jane User";

document.body.innerHTML = greeter(user);
```

## Tipagem

Tipagem no TypeScript são maneiras de registrar o contrato pretendido da função ou variável. Neste caso, pretendemos que a função greeter seja chamada com um único parâmetro string. Podemos tentar mudar a chamada para passar uma matriz em vez disso:

```ts
function greeter(person: string) {
    return "Hello, " + person;
}

var user = [0, 1, 2];

document.body.innerHTML = greeter(user);
```

Recompilando, você verá um erro:

```bash
error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```

Da mesma forma, tente remover todos os argumentos para a chamada da função greeter. O TypeScript irá informar que chamou esta função com um número inesperado de parâmetros. Em ambos os casos, o TypeScript pode oferecer uma análise estática com base na estrutura do seu código e nos tipos que você fornece.

Observe que, embora existam erros, o arquivo ```greeter.js``` ainda é criado. Você pode usar o TypeScript mesmo se houver erros em seu código. Mas, neste caso, o TypeScript está avisando que seu código provavelmente não será executado conforme o esperado.

## Interfaces

Vamos desenvolver nosso exemplo ainda mais. Aqui, usamos uma interface que descreve objetos que possuem os campos _firstName_ e _lastName_. No TypeScript, dois tipos são compatíveis se sua estrutura interna for compatível. Isso nos permite implementar uma interface apenas por ter a forma que a interface precisa, sem uma cláusula implements explícita.

```ts
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

var user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);
```

## Classes

Finalmente, vamos ampliar o exemplo uma última vez com classes. O TypeScript oferece suporte a novos recursos em JavaScript, como suporte a programação orientada a objetos baseada em classe.

Aqui vamos criar uma classe ```Student``` com um construtor e alguns campos públicos. Observe que as classes e as interfaces funcionam bem juntas, deixando o programador decidir sobre o nível certo de abstração.

Além disso, o uso do ```public``` nos argumentos para o construtor é uma forma abreviada que nos permite criar automaticamente propriedades com esse nome.

```ts
class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

var user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);
```

Re-execute ```tsc greeter.ts``` e você verá que o JavaScript gerado é o mesmo que o código anterior. Classes no TypeScript são apenas uma abreviatura para o mesmo OO baseado em protótipo que é freqüentemente usado em JavaScript.
Executando seu aplicativo web TypeScript:

Agora digite o seguinte em um arquivo chamado ```greeter.html```:

```html
<!DOCTYPE html>
<html>
    <head><title>TypeScript Greeter</title></head>
    <body>
        <script src="greeter.js"></script>
    </body>
</html>
```

Abra ```greeter.html``` no navegador para executar seu primeiro aplicativo web simples com TypeScript!

> *Opcional:* Abra ```greeter.ts``` no Visual Studio, ou copie o código no campo de TypeScript playground. Você pode passar o mouse sobre os identificadores para ver seus tipos. Observe que, em alguns casos, esses tipos são inferidos automaticamente para você. Redigite a última linha e veja a lista de autocompletar e a ajuda de parâmetros com base nos tipos de elementos DOM. Coloque seu cursor na referência à função greeter, e pressione _F12_ para ir à sua definição. Note, também, que você pode clicar com o botão direito do mouse em um símbolo e usar a refatoração para renomeá-lo.

O tipo de informação fornecida funciona em conjunto com as ferramentas para trabalhar com JavaScript em escala de aplicação. Para obter mais exemplos do que é possível no TypeScript, consulte a seção _Samples_ do site.

[![Greet_Person](https://res.cloudinary.com/felipetac/image/upload/v1515159253/greet_person_gdcsek.png)](https://res.cloudinary.com/felipetac/image/upload/v1515159253/greet_person_gdcsek.png)

> Este artigo é uma tradução e adaptação do seguinte texto [Typescript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
