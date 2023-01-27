const Product = require("../models/product");
module.exports.getAll = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "get all products", products });
  } catch (error) {
    res.status(500).json({ message: "something go wrong" });
  }
};
module.exports.getOne = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    res.status(200).json({ message: "get product by id", product });
  } catch (error) {
    res.status(500).json({ message: "something go wrong" });
  }
};
module.exports.delete = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    res.status(200).json({
      message: "product deleted",
      deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "something go wrong" });
  }
};
module.exports.update = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: updatedData,
      },
      { new: true }
    );
    res.status(200).json({
      message: "product updated",
      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "something go wrong" });
  }
};
module.exports.add = async (req, res, next) => {
  try {
    const product = await new Product(req.body).save();
    res.status(200).json({
      message: "product added",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "something go wrong" });
  }
};
