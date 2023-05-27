const { ProductRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError, BadRequestError } = require('../utils/app-errors')

// All Business logic will be here
class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }

  async CreateProduct(userInputs) {
    const { name, price, description, imageURL, creator } = userInputs;

    try {
      const result = await this.repository.CreateProduct({
        name,
        price,
        description,
        imageURL,
        creator,
      });

      return FormateData(result);
    } catch (err) {
      throw new APIError("Unable to create product", err);
    }
  }

  async GetProduct(_id) {
    try {
      const result = await this.repository.FindProductById(_id);

      return FormateData(result);
    } catch (err) {
      throw new APIError("Unable to get product", err);
    }
  }

  async GetAllProducts() {
    try {
      const result = await this.repository.FindAllProducts();

      return FormateData(result);
    } catch (err) {
      throw new APIError("Unable to get products", err);
    }
  }
}

module.exports = ProductService;
