<h1 align="center">
    <img alt="GoStack" src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/bootcamp-header.png" width="200px" />
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rocketseat/bootcamp-gostack-desafio-06?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>

# Módulo 3: Aplicação Backend – GoBarber

Sistema de barbearia para agendamento de serviços.

### Rodar Servidor Docker e os Bancos de Dados envolvidos

Visualiza todos os bancos criados no Docker.

```
docker ps -a
```

Visualiza apenas os bancos que estão ativos no Docker.

```
docker ps
```

Inicializa os bancos no Docker.

```
docker start database mongobarber redisbarber
```

## Passo a passo das instalações de todas as bibliotecas e plugins:

### 1º Passo: Instalar Cors

(Usado para permitir que outras aplicações acessem a nossa API, desta forma conseguimos definir quais endereços poderão acessar a nossa API)

```
yarn add cors
```

### 2º Passo: Rodar API GoBarber

```
yarn dev
```
