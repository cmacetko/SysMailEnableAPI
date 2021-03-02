# SysMailEnableAPI

>  **SysMailEnableAPI** é uma **API**, que roda em Nodejs e permite gerenciar o MailEnable Server utilizando o repositório **CtrlMailEnable**

![Language](https://img.shields.io/badge/language-nodejs-orange)
![Platforms](https://img.shields.io/badge/platforms-Windows-blue)
![License](https://img.shields.io/github/license/cmacetko/sysmailenableapi)
[![HitCount](http://hits.dwyl.com/cmacetko/sysmailenableapi.svg)](http://hits.dwyl.com/cmacetko/sysmailenableapi)

## Porta

A aplicação roda na porta **9092** porém pode ser alterado na variável **cfg_porta**

## Autenticação

O acesso a api é feito utilizando **autenticação básica HTTP** *(Basic Auth)*, e os usuários/senha são controlados na variável **cfg_usuarios**

## Método

Toda chamada a API é feita via **POST** enviando no corpo da solicitação o JSON com os parâmetros

## Sucesso

Em caso de sucesso, será retornado um json com dois valores:

- **httpcode:** 200
- **body:** Json com o resultado da requisição

**Exemplo:**
```json
{
"httpcode": 200,
"body":{
}
}
```

> Em alguns métodos não é retornado o **body**, são métodos que apenas retornam o **httpcode: 200** para indicar o **SUCESSO** da requisição

## Erro

Em caso de erro, será retornado um json com dois valores:

- **httpcode:** 500
- **body/Msg:** Mensagem de erro

**Exemplo:**
```json
{
"httpcode": 500,
"body":{
"Msg": "Alguns dados nao foram preenchidos"
}
}
```

## Dependências

Para o funcionamento deste método é necessário a dependência do pacote **CtrlMailEnable**:

[![CtrlMailEnable](https://github-readme-stats.vercel.app/api/pin/?username=cmacetko&repo=CtrlMailEnable)](https://github.com/cmacetko/CtrlMailEnable)


# Métodos

## Listar as Contas

**Método:** 
contas_listar

**Exemplo:**
```json
null
```

**Retorno:**
```json
{
	"httpcode": 200,
	"body": {
	  "cmacetko_teste1.com.br": {
		"Conta": "cmacetko_teste1.com.br",
		"Status": "1"
	  }
	}
}
```

## Verifica se uma Conta Existe

**Método:** 
contas_is

**Exemplo:**
```json
{
	"Conta": "example.com"
}
```

**Retorno:**
```json
{
	"httpcode": 200,
	"body": true/false
}
```

## Altera o Status de uma Conta

**Método:** 
contas_status

**Exemplo:**
```json
{
	"Conta": "example.com",
	"Status": true
}
```

**Retorno:**
```json
{
	"httpcode": 200
}
```

## Criar uma Conta

**Método:** 
contas_criar

**Exemplo:**
```json
{
	"Conta": "example.com"
}
```

**Retorno:**
```json
{
	"httpcode": 200
}
```

## Deletar Conta

**Método:** 
contas_deletar

**Exemplo:**
```json
{
	"Conta": "example.com"
}
```

**Retorno:**
```json
{
	"httpcode": 200
}
```

## Listar E-mails de uma Conta

**Método:** 
emails_listar

**Exemplo:**
```json
{
	"Conta": "example.com"
}
```

**Retorno:**
```json
{
	"httpcode": 200,
	"body": [
	{
	  "Nome":"Postmaster",
	  "Status":"1",
	  "Limite":"-1",
	  "Tamanho":"0"
	},
	{
	  "Nome":"teste1",
	  "Status":"1",
	  "Limite":"-1",
	  "Tamanho":"0"
	}
	]
}
```

**Observalções:**
**Status:** 1 - Ativado / 0 - Desativado
**Limite:** Em Kb, onde "-1" indica sem limite
**Tamanho:** Indica quantos Kb já foram utilizados

## Verificar se um E-mail Existe em uma Conta

**Método:** 
emails_is

**Exemplo:**
```json
{
	"Conta": "example.com",
	"Email": "teste1"
}
```

**Retorno:**
```json
{
	"httpcode": 200,
	"body": true/false
}
```

## Cria um E-mail em uma Conta

**Método:** 
emails_criar

**Exemplo:**
```json
{
	"Conta": "example.com",
	"Email": "teste1",
	"Senha": "123456",
	"Limite": "520000"
}
```

**Retorno:**
```json
{
	"httpcode": 200
}
```

## Alterar Senha de um E-mail de uma Conta

**Método:** 
emails_alterar_senha

**Exemplo:**
```json
{
	"Conta": "example.com",
	"Email": "teste1",
	"Senha": "123456"
}
```

**Retorno:**
```json
{
	"httpcode": 200
}
```

## Alterar Limite de um E-mail de uma Conta

**Método:** 
emails_alterar_limite

**Exemplo:**
```json
{
	"Conta": "example.com",
	"Email": "teste1",
	"Limite": "520000"
}
```

**Retorno:**
```json
{
	"httpcode": 200
}
```

## Alterar Status de um E-mail de uma Conta

**Método:** 
emails_alterar_status

**Exemplo:**
```json
{
	"Conta": "example.com",
	"Email": "teste1",
	"Status": true
}
```

**Retorno:**
```json
{
	"httpcode": 200
}
```

## Deletar E-mail de uma Conta

**Método:** 
emails_deletar

**Exemplo:**
```json
{
	"Conta": "example.com",
	"Email": "teste1"
}
```

**Retorno:**
```json
{
	"httpcode": 200
}
```

# Referências

## Limite

O limite de espaço das contas é gerenciado em kilobytes, você pode também informar "-1" indicando que a caixa tem espaço ilimitado

## Status

O controle de status é sempre um **boolean**, onde:
- **true:** Ativado
- **false:** Desativado

# Contato

**Paloma Macetko**
- cmacetko@gmail.com
- https://github.com/cmacetko/
- https://www.npmjs.com/~cmacetko
- https://cmacetko.medium.com
- https://www.facebook.com/cmacetko
- https://www.instagram.com/cmacetko/
- https://twitter.com/cmacetko
- [Skype: cmacetko](skype:cmacetko "cmacetko")
- [Whatsapp: 47-91277858](https://wa.me/554791277858 "Whatsapp: 47-91277858")