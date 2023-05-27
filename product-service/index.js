const express = require("express");
const cors = require("cors");
const amqp = require("amqplib");
const { product } = require("./api");
const { databaseConnection } = require("./database");

let channel;
async function connect() {
  const amqpServer = process.env.RABBITMQ_URL;
  const connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("PRODUCT");
}

const StartServer = async () => {
  const app = express();
  // app use
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use(express.static(`${__dirname}/public`));

  // database connection
  await databaseConnection();

  // rabbit mq connection
  await connect();

  product(app, channel);

  app.get("/", (req, res) => {
    res.status(200).send(`Welcome to login , sign-up api`);
  });

  // listening port
  const PORT = process.env.PORT || 3002;
  app
    .listen(PORT, () => {
      console.log(`app is live at ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      throw new Error("Unable to start server");
    });
};

StartServer();
