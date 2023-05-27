const express = require("express");
const amqp = require("amqplib");
const { UserModel } = require("./database/models");
const { databaseConnection } = require("./database");

let channel;

async function createOrder(product, userEmail) {
  let user;
  user = await UserModel.find({ email: userEmail });
  console.log(user);
  // productInfo = await Productmodel.findById({id: product});
  // console.log(product)

  return user;
}

async function connect() {
  await databaseConnection();
  const amqpServer = process.env.RABBITMQ_URL;
  const connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("ORDER");
}

connect().then(() => {
  channel.consume("ORDER", (data) => {
    console.log("Consuming ORDER service");
    const { product, userEmail } = JSON.parse(data.content);
    createOrder(product, userEmail)
      .then((newOrder) => {
        channel.ack(data);
        channel.sendToQueue(
          "PRODUCT",
          Buffer.from(JSON.stringify({ newOrder }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

const app = express();

app.use(express.json());

const port = process.env.PORT ?? 3003;

app.listen(port, () => {
  console.log(`Orders Service at ${port}`);
});
