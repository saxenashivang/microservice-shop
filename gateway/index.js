const express = require("express");
const app = express();
const Proxy = require("express-http-proxy");

/* -------------------------------------------------------------------------- */
/*                                    AUTH                                    */
/* -------------------------------------------------------------------------- */
app.post("/login", Proxy("http://localhost:8001"));
app.post("/signup", Proxy("http://localhost:8001"));
app.get("/profile", Proxy("http://localhost:8001"));

/* -------------------------------------------------------------------------- */
/*                                   PRODUCT                                  */
/* -------------------------------------------------------------------------- */
app.post("/product", Proxy("http://localhost:8003"));
app.get("/product", Proxy("http://localhost:8003"));
app.get("/products", Proxy("http://localhost:8003"));

const PORT = process.env.PORT || 8000;
app
  .listen(PORT, () => {
    console.log(`app is live at ${PORT}`);
  })
  .on("error", (err) => {
    console.log(err);
    throw new Error("Unable to start server");
  });
