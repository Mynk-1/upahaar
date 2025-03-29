import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, category, id }) => {
  const navigate = useNavigate();

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClick = () => {
    handleScroll();
    navigate(`/${category}/${id}`);
  };

  // Get the starting price (smallest size price)
  const getStartingPrice = (product) => {
    const sizes = product.customizationOptions.types[0].sizes;
    if (sizes && sizes.length > 0) {
      return sizes[0].price;
    }
    return product.price;
  };

  const startingPrice = getStartingPrice(product);

  return (
    <div
      className="min-w-[160px] w-[160px] sm:min-w-[200px] sm:w-[200px] md:min-w-[240px] md:w-[240px] lg:min-w-[280px] lg:w-[280px] flex-shrink-0 bg-white overflow-hidden group cursor-pointer"
      onClick={handleClick}
    >
      <div className="p-0">
        <div className="aspect-[3/3.5] sm:aspect-[3/4] bg-gray-100/50 mb-2 overflow-hidden">
          <img
            src={product.customizationOptions.types[0].previewImages[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
        <h3 className="text-xs sm:text-sm md:text-base font-normal mb-1 text-gray-900">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm md:text-base font-normal text-gray-900 mb-2">
          ₹{startingPrice}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
