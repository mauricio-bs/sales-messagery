# Metatron Auth

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descrição

O **Metatron Auth** é um microserviço desenvolvido com [NestJS](https://nestjs.com/) dedicado à autenticação de usuários, gerenciamento de políticas de acesso e funcionamento como gateway para aplicações externas. Ele integra uma arquitetura de microsserviços e se comunica com outros serviços utilizando o RabbitMQ via protocolo RMQ, garantindo segurança e escalabilidade.

## Funcionalidades

- Autenticação de usuários
- Gerenciamento e validação de políticas de acesso
- Gateway para aplicações externas
- Comunicação assíncrona com outros microsserviços via RabbitMQ (RMQ)
- Estrutura modular e escalável

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) (TypeScript)
- [RabbitMQ](https://www.rabbitmq.com/) (protocolo RMQ)
- [Prisma ORM](https://www.prisma.io/) (opcional, caso utilize banco relacional)
- Docker/Kubernetes (opcional para deploy)

## Instalação

```bash
pnpm install
```

## Executando o Projeto

```bash
# Desenvolvimento
pnpm run start

# Modo watch
pnpm run start:dev

# Produção
pnpm run start:prod
```

## Testes

```bash
# Testes unitários
pnpm run test

# Testes e2e
pnpm run test:e2e

# Cobertura de testes
pnpm run test:cov
```

## Configuração

Certifique-se de configurar as variáveis de ambiente necessárias para conexão com o RabbitMQ, banco de dados e definições de políticas de acesso. Veja exemplos em `resources/k8s/secrets.yaml`.

## Comunicação via RabbitMQ

O serviço utiliza o protocolo RMQ para comunicação assíncrona entre microsserviços. Certifique-se de que o RabbitMQ esteja em execução e acessível pelas configurações fornecidas.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

MIT
