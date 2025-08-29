export const rabbitmqConfig = {
  url: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
  exchanges: {
    products: 'exchange.uriel-products',
    sales: 'exchange.chamuel-sales',
    users: 'exchange.haniel-users',
  },
};
