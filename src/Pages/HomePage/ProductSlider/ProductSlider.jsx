import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import ProductCard from "../../Cards/ProductCard";
import { useNavigate } from "react-router-dom";

const ProductSlider = ({ data, category }) => {
  const navigate = useNavigate();
  
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to format category name (capitalize first letter of each word)
  const formatCategoryName = (category) => {
    if (!category) return "";
    return category
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="mb-8">
      {/* Category Heading with light gray background and rounded borders */}
      <div className="flex justify-center bg-gray-100 rounded-lg px-4 py-2 mb-4 mx-2 sm:mx-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 font-titillium">
          {formatCategoryName(category)}
        </h2>
      </div>
      
      <div className="w-full max-w-full px-2 sm:px-4 font-titillium">
        <div className="relative">
          <div
            className="flex gap-2 sm:gap-4 overflow-x-auto"
            style={{
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <style>
              {`
                .flex::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            {data.map((product) => (
              <ProductCard key={product.id} product={product} category={category} id={product.id}/>
            ))}
          </div>
          <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 sm:hidden bg-white bg-opacity-75 p-1 rounded-l">
            <ChevronRight size={24} className="text-gray-600" />
          </div>
        </div>
        <div className="text-center mt-2 lg:mt-6">
          <button
            className="px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base text-gray-600 border-2 border-gray-300 rounded-sm uppercase hover:bg-slate-200"
            onClick={() => {
              navigate(`/productcatalog/${category}`);
              handleScroll();
            }}
          >
            VIEW ALL
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;