const ProductService = require("../services/product-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
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
};
