import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  }, [productId, products]);

  return productData ? (
    <div className="border-t pt-12 transition-opacity ease-in duration-500 opacity-100 font-light">
      {/* Product Section */}
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Image Gallery */}
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll gap-3 sm:w-[18%]">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                onClick={() => setImage(item)}
                className={`w-[22%] sm:w-full cursor-pointer rounded-lg shadow-sm transition-all duration-300 hover:opacity-80 ${
                  image === item ? "ring-2 ring-amber-500" : ""
                }`}
                alt="thumb"
              />
            ))}
          </div>
          <div className="w-full sm:w-[82%]">
            <img
              src={image}
              className="w-full h-auto object-cover rounded-xl shadow-md transition-all duration-500"
              alt="product"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-serif tracking-wide mb-2">
            {productData.name}
          </h1>

          {/* Ratings */}
          <div className="flex items-center gap-1 mb-4">
            {Array(4).fill("").map((_, i) => (
              <img key={i} src={assets.star_icon} className="w-4" alt="star" />
            ))}
            <img src={assets.star_dull_icon} className="w-4" alt="star" />
            <p className="text-gray-500 ml-2">(122 reviews)</p>
          </div>

          {/* Price */}
          <p className="text-3xl font-semibold mb-6">
            {currency}
            {productData.price}
          </p>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6">
            {productData.description}
          </p>

          {/* Size Selection */}
          <div className="mb-8">
            <p className="mb-3">Select Size</p>
            <div className="flex gap-3">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border px-5 py-2 rounded-md transition-all ${
                    size === item
                      ? "bg-black text-white border-black"
                      : "bg-gray-50 hover:border-amber-500"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-10 py-3 tracking-wide text-sm rounded-lg shadow-md hover:bg-amber-600 transition-all"
          >
            ADD TO CART
          </button>

          {/* Extra Info */}
          <div className="mt-8 border-t pt-5 text-sm text-gray-500">
            <p>✓ 100% Original Product</p>
            <p>✓ Cash on Delivery available</p>
            <p>✓ Easy 7-day return & exchange policy</p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-20">
        <div className="flex border-b mb-6">
          <button className="px-6 py-3 border-b-2 border-black text-sm font-medium">
            Description
          </button>
          <button className="px-6 py-3 text-sm text-gray-500 hover:text-black">
            Reviews (122)
          </button>
        </div>
        <div className="text-gray-600 leading-relaxed space-y-4 text-sm max-w-3xl">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            necessitatibus voluptatibus libero dolore veniam fugiat.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            asperiores dolorem dolores pariatur ab distinctio quas.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
