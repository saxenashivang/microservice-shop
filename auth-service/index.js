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
  app.use(express.static(__dirname + "/public"));

  // database connection
  await databaseConnection();

  user(app);

  app.get("/", function (req, res) {
    res.status(200).send(`Welcome to login , sign-up api`);
  });

  // listening port
  const PORT = process.env.PORT || 3001;
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
