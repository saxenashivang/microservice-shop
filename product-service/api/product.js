const ProductService = require("../services/product-service");
const UserAuth = require("./middlewares/auth");
const { validate } = require("express-validation");
const { createProduct } = require("./validations/product");

module.exports = (app, channel) => {
  const service = new ProductService();

  // create new product in DB
  app.post(
    "/product",
    validate(createProduct),
    UserAuth,
    async (req, res, next) => {
      try {
        const { name, price, description, imageURI } = req.body;

        const { data } = await service.CreateProduct({
          name,
          price,
          description,
          imageURI,
        });

        return res.json(data);
      } catch (err) {
        next(err);
      }
    }
  );

  // get all products from DB
  app.get("/products", async (req, res, next) => {
    try {
      const { data } = await service.GetAllProducts();
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  // get single product from DB
  app.get("/product", async (req, res, next) => {
    const { id } = req.body;
    try {
      const { data } = await service.GetProduct(id);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  //   app.post("/products/buy", async (req, res, next) => {
  //     try {
  //       const { _id, email } = req.body;
  //       const { product } = await service.GetProduct(_id);
  //       let order;
  //       channel.sendToQueue(
  //         "ORDER",
  //         Buffer.from(
  //           JSON.stringify({
  //             product,
  //             userEmail: email,
  //           })
  //         )
  //       );
  //       channel.consume("PRODUCT", (data) => {
  //         order = JSON.parse(data.content);
  //         console.log(order);
  //       });
  //       return res.json(order);
  //     } catch (err) {
  //       next(err);
  //     }
  //   });
};
