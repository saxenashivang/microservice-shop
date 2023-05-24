const { ProductModel } = require("../models");
const { APIError, STATUS_CODES } = require("../../utils/app-errors").default;

// Dealing with data base operations
class ProductRepository {
  async CreateProduct({ name, price, description, imageURL, creator }) {
    try {
      const Product = new ProductModel({
        name,
        price,
        description,
        imageURL,
        creator,
      });
      const ProductResult = await Product.save();
      return ProductResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Product"
      );
    }
  }

  async FindAllProducts() {
    try {
      const results = await ProductModel.find();
      return results;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Products"
      );
    }
  }

  async FindProductById({ id }) {
    try {
      const existingProduct = await ProductModel.findById(id);

      return existingProduct;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Product"
      );
    }
  }
}

module.exports = ProductRepository;
