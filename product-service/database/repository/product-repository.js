const { ProductModel } = require("../models");
const { APIError, STATUS_CODES } = require("../../utils/app-errors");

// Dealing with data base operations
class ProductRepository {
  async CreateProduct({ name, price, description, imageURI, creator }) {
    try {
      const Product = new ProductModel({
        name,
        price,
        description,
        imageURI,
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

  async FindProductById(_id) {
    try {
      const existingProduct = await ProductModel.findById(_id);

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
