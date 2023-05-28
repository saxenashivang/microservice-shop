const express = require("express");
const { user } = require("./api");
const cors = require("cors");
const { databaseConnection } = require("./database");

const StartServer = async () => {
  const app = express();
  // app use
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());

  // database connection
  await databaseConnection();

  user(app);

  app.get("/", function (req, res) {
    res.status(200).send(`Welcome to login , sign-up api`);
  });

  // listening port
  const PORT = process.env.PORT || 8001;
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
