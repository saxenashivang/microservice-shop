const ProductService = require("../services/product-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app, channel) => {
  const service = new ProductService();

  app.post("/products", UserAuth, async (req, res, next) => {
    try {
      const { name, price, description, imageURL } = req.body;

      const { data } = await service.CreateProduct({
        name,
        price,
        description,
        imageURL,
      });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/products", async (req, res, next) => {
    try {
      const { data } = await service.GetAllProducts();
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/products/buy", async (req, res, next) => {
    try {
      const { _id, email } = req.body;
      const { product } = await service.GetProduct(_id);
      let order;
      channel.sendToQueue(
        "ORDER",
        Buffer.from(
          JSON.stringify({
            product,
            userEmail: email,
          })
        )
      );
      await channel.consume("PRODUCT", (data) => {
        order = JSON.parse(data.content);
        console.log(order);
      });
      return res.json(order);
    } catch (err) {
      next(err);
    }
  });
};
