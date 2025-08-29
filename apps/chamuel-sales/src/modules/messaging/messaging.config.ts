export const rabbitmqConfig = {
  url: process.env.RABBITMQ_URL,
  exchanges: {
    products: 'exchange.uriel-products',
    payments: 'exchange.sariel-payments',
  },
};
