# Uriel Products

Microserviço responsável pelo gerenciamento de produtos e categorias, parte do ecossistema Sales Messagery.

## Descrição

O `uriel-products` é um microserviço desenvolvido em Node.js com NestJS, focado no cadastro, atualização, consulta e gerenciamento de produtos e categorias. A comunicação entre serviços é realizada via AMQP utilizando RabbitMQ, permitindo integração eficiente e escalável com outros microserviços do ecossistema.

## Funcionalidades

- Cadastro, atualização e remoção de produtos
- Cadastro, atualização e remoção de categorias
- Filtros e paginação para listagem de produtos e categorias
- Comunicação assíncrona via RabbitMQ (AMQP)
- Integração com banco de dados relacional via Prisma ORM

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [RabbitMQ (AMQP)](https://www.rabbitmq.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Estrutura do Projeto

```
src/
  common/         # Configurações, utilitários e módulos comuns
  entities/       # Entidades de domínio (Product, Category)
  modules/        # Módulos de domínio (products, category)
  repository/     # Interfaces e implementações de repositórios
  prisma/         # Configuração do Prisma ORM
```

## Como Executar

1. Instale as dependências:

   ```bash
   pnpm install
   ```

2. Configure as variáveis de ambiente (exemplo em `.env.example`).

3. Execute as migrations do banco de dados:

   ```bash
   pnpm prisma migrate deploy
   ```

4. Inicie o serviço:
   ```bash
   pnpm start
   ```

## Comunicação AMQP

O serviço utiliza RabbitMQ para comunicação assíncrona entre microserviços. Certifique-se de que uma instância do RabbitMQ esteja disponível e configurada corretamente nas variáveis de ambiente.

## Testes

Para rodar os testes:

```bash
pnpm test
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

> Projeto mantido por [mauricio-bs](https://github.com/mauricio-bs)
