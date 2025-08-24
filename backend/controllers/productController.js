import productModel from "../models/productModel.js";

// Function to add a product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // Get uploaded image URLs from the blob middleware
    const image1 = req.imageUrls?.image1?.[0];
    const image2 = req.imageUrls?.image2?.[0];
    const image3 = req.imageUrls?.image3?.[0];
    const image4 = req.imageUrls?.image4?.[0];

    // Filter out undefined values
    const imageUrl = [image1, image2, image3, image4].filter((item) => item !== undefined);

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imageUrl,
      date: Date.now()
    }

    console.log(productData);

    const product = new productModel(productData);
    await product.save()

    res.json({success: true, message:"Product Added"});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function to remove a product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"Product Removed"})
  } catch (error) {
    console.log(error)
    res.json({ success:false, message:error.message });
  }
};

// Function to list products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({success:true,products})
  } catch (error) {
    console.log(error)
    res.json({ success:false, message:error.message });
  }
};

// Function to get a single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body
    const products = await productModel.findById(productId)
    res.json({success:true,products})
  } catch (error) {
    console.log(error)
    res.json({ success:false, message:error.message });
  }
};

export { addProduct, removeProduct, listProduct, singleProduct };