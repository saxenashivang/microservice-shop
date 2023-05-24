const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI,
    RABBITMQ_URL: process.env.RABBITMQ_URL,
  },
  default: {
    SECRET: "mysecretkey",
    DATABASE: "mongodb://localhost:27017/Products",
    RABBITMQ_URL: "amqp://localhost:5672",
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
