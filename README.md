# Sales Messagery Monorepo

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo" />
</p>

## Descrição

Este monorepo reúne um sistema de vendas construído como estudo de mensageria e arquitetura de microsserviços. Cada microserviço recebe o nome de um anjo e se comunica de forma assíncrona através do RabbitMQ utilizando o protocolo RMQ.

O objetivo do projeto é explorar conceitos de mensageria, escalabilidade, desacoplamento e boas práticas em sistemas distribuídos.

## Estrutura dos Microserviços

- **haniel-users**: Gestão de usuários e preferências
- **chamuel-sales**: Processamento de vendas
- **gabriel-notifications**: Notificações e comunicação com usuários
- **metatron-auth**: Autenticação e autorização
- **sariel-payments**: Processamento de pagamentos
- **uriel-products**: Gerenciamento de produtos

Cada serviço é independente, escrito em [NestJS](https://nestjs.com/), e se comunica via RabbitMQ.

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) (TypeScript)
- [RabbitMQ](https://www.rabbitmq.com/) (protocolo RMQ)
- [Prisma ORM](https://www.prisma.io/) (quando aplicável)
- Docker/Kubernetes (opcional para deploy)
- pnpm (gerenciador de pacotes e workspaces)

## Instalação

```bash
pnpm install
```

## Executando os Serviços

Cada microserviço pode ser iniciado individualmente. Exemplo para o serviço de usuários:

```bash
cd apps/haniel-users
pnpm run start:dev
```

Repita para os demais serviços conforme necessário.

## Comunicação entre Serviços

A comunicação entre os microsserviços é feita de forma assíncrona via RabbitMQ, utilizando o protocolo RMQ. Isso permite desacoplamento, escalabilidade e resiliência entre os módulos do sistema.

## Objetivo do Projeto

Este projeto é voltado para fins de estudo e experimentação com mensageria, microsserviços e arquitetura distribuída. Sinta-se à vontade para explorar, modificar e contribuir!

## Licença

MIT
