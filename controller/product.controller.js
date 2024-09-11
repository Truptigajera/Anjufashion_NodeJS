const Product = require("../model/product.model");


exports.addNewProduct = async (req, res) => {
  try {
    const { productName, productPrice, items, quntity, rating } = req.body;
    let product = await Product.findOne({ productName: req.body.title, isDelete: false })
    if (product)
      return res.status(400).json({ message: "product alredy exists..." })
    product = await Product.create(req.body);
    res.status(201).json({ product, messege: "product added succsess...." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" })
  }
};

exports.getAllproduct = async (req, res) => {
  try {

    let product = await Product.find()
    if (!product) {
      res.status(404).json({ msg: "Product is Not Found" })
    }
    res.status(201).json(product)
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Internal Server Error" })

  }
};


exports.deleteproduct = async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.query.productId, isDelete: false });
    // console.log(user);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product = await Product.findByIdAndUpdate(product._id, { isDelete: true }, { new: true });
    res.status(200).json({ product, message: 'product Delete success' });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });

  }
};

/* ------------get  product---------- */

exports.getProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.query.id)
    if (!product) {
      res.status(404).json({ msg: "Product is Not Avaliable" });
    }
    res.status(201).json(product)
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" })
  }

};
