import React from "react";

const ProductInfo = ({ product, currentPrice }) => (
  <>
    <h1 className=" text-3xl font-bold">{product.name}</h1>
    <p className="text-xl font-semibold mt-2">₹ {currentPrice}</p>
    <p className="text-sm text-gray-500">({product.shipping.shippingNote})</p>
  </>
);

export default ProductInfo;