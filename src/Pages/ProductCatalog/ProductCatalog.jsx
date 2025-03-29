import React, { useState, useMemo, useEffect } from "react";
import { CustomizedFrames } from "../../Data/frames";
import { acrylics } from "../../Data/acrylics";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Filter,
  X,
} from "lucide-react";
import ProductCard from "../Cards/ProductCard";
import { useParams } from "react-router-dom";

// Create filter options based on the acrylics data
const getAcrylicsFilters = () => {
  return {
    "Product Type": [
      { name: "Customizable Acrylic Frame", count: 1 },
      { name: "Music Player Backlit Photo Frame", count: 1 },
      { name: "Customizable Acrylic Clock", count: 1 },
      { name: "Anniversary Backlit Frame", count: 4 },
      { name: "Promise Backlit Frame", count: 1 },
    ],
    "Price Range": [
      { name: "Under ₹500", count: 3 },
      { name: "₹500 - ₹1000", count: 5 },
      { name: "Above ₹1000", count: 2 },
    ],
    "LED Feature": [
      { name: "LED Backlit", count: 6 },
      { name: "Standard", count: 2 },
    ],
    "Size": [
      { name: "Small (8-10 inch)", count: 4 },
      { name: "Medium (12-14 inch)", count: 4 },
      { name: "Large (18+ inch)", count: 2 },
    ],
    "Shape": [
      { name: "Rectangle", count: 1 },
      { name: "Square", count: 1 },
      { name: "Circle", count: 1 },
      { name: "Heart", count: 1 },
      { name: "Moon", count: 2 },
      { name: "Infinity", count: 1 },
      { name: "Diamond", count: 1 },
    ],
  };
};

const MobileFilter = ({ filters, openDrawers, toggleDrawer, activeFilters, toggleFilter }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-50 bg-black text-white p-4 rounded-full shadow-lg md:hidden"
      >
        <Filter size={24} />
      </button>
      <div
        className={`fixed inset-y-0 right-0 w-[90%] sm:w-[70%] md:w-[50%] max-w-[400px] bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 overflow-y-auto flex flex-col md:hidden`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          {Object.entries(filters).map(([filterName, options], index) => (
            <div
              key={filterName}
              className={`py-3 border-b border-gray-200 transition-all duration-300 ease-in-out ${
                isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div
                className="flex items-center justify-between cursor-pointer uppercase px-2"
                onClick={() => toggleDrawer(filterName)}
              >
                <span className=" text-gray-800 text-sm">{filterName}</span>
                <ChevronDown
                  size={20}
                  className={`transition-transform ${
                    openDrawers[filterName] ? "rotate-180" : ""
                  }`}
                />
              </div>
              {openDrawers[filterName] && (
                <div className="ml-4 mt-3 px-2 space-y-3">
                  {options.map((option) => (
                    <div
                      key={option.name}
                      className="flex items-center text-sm"
                    >
                      <input 
                        type="checkbox"
                        id={`mobile-${filterName}-${option.name}`}
                        className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={activeFilters[filterName]?.includes(option.name) || false}
                        onChange={() => toggleFilter(filterName, option.name)}
                      />
                      <label htmlFor={`mobile-${filterName}-${option.name}`} className="text-gray-700">
                        {option.name} <span className="text-gray-500">({option.count})</span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-400/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

const ProductCatalog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDrawers, setOpenDrawers] = useState({});
  const [activeFilters, setActiveFilters] = useState({});
  const productsPerPage = 12;
  const { category } = useParams();
  const filters = useMemo(() => (category === "acrylics" ? getAcrylicsFilters() : {}), [category]);

  const allProducts = useMemo(() => {
    return category === "caricature" ? CustomizedFrames : category === "acrylics" ? acrylics : [];
  }, [category]);

  const filteredProducts = useMemo(() => {
    if (Object.keys(activeFilters).length === 0) return allProducts;

    return allProducts.filter(product => {
      return Object.entries(activeFilters).every(([filterCategory, selectedValues]) => {
        if (selectedValues.length === 0) return true;

        switch (filterCategory) {
          case "Product Type":
            return selectedValues.some(value => product.productType === value);
          case "Price Range":
            const price = product.price;
            return selectedValues.some(range => {
              if (range === "Under ₹500") return price < 500;
              if (range === "₹500 - ₹1000") return price >= 500 && price <= 1000;
              if (range === "Above ₹1000") return price > 1000;
              return false;
            });
          case "LED Feature":
            if (selectedValues.includes("LED Backlit")) {
              return product.name.toLowerCase().includes("backlit") || 
                     product.productType.toLowerCase().includes("backlit");
            }
            if (selectedValues.includes("Standard")) {
              return !product.name.toLowerCase().includes("backlit") &&
                     !product.productType.toLowerCase().includes("backlit");
            }
            return false;
          case "Size":
            if (!product.customizationOptions?.types) return false;
            return selectedValues.some(sizeRange => {
              if (sizeRange === "Small (8-10 inch)") {
                return product.customizationOptions.types.some(type => 
                  type.sizes?.some(size => size.name.includes("8") || size.name.includes("10"))
                );
              }
              if (sizeRange === "Medium (12-14 inch)") {
                return product.customizationOptions.types.some(type => 
                  type.sizes?.some(size => size.name.includes("12") || size.name.includes("14"))
                );
              }
              if (sizeRange === "Large (18+ inch)") {
                return product.customizationOptions.types.some(type => 
                  type.sizes?.some(size => size.name.includes("18") || size.name.includes("24") || size.name.includes("36"))
                );
              }
              return false;
            });
          case "Shape":
            return selectedValues.some(shape => {
              const shapeLower = shape.toLowerCase();
              return (
                product.customizationOptions?.types?.some(type => type.name.toLowerCase().includes(shapeLower)) ||
                product.name.toLowerCase().includes(shapeLower) ||
                product.productType.toLowerCase().includes(shapeLower)
              );
            });
          default:
            return true;
        }
      });
    });
  }, [allProducts, activeFilters]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [currentPage, filteredProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters]);

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const toggleDrawer = (drawer) => setOpenDrawers((prev) => ({ ...prev, [drawer]: !prev[drawer] }));
  const toggleFilter = (category, value) => {
    setActiveFilters(prev => {
      const prevValues = prev[category] || [];
      const newValues = prevValues.includes(value)
        ? prevValues.filter(v => v !== value)
        : [...prevValues, value];
      return newValues.length === 0
        ? { ...Object.fromEntries(Object.entries(prev).filter(([k]) => k !== category)) }
        : { ...prev, [category]: newValues };
    });
  };
  const clearAllFilters = () => setActiveFilters({});

  return (
    <div className="container mx-auto px-4 py-4 pb-20 font-titillium">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden md:block md:w-1/4 lg:w-1/5">
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Filters</h2>
              {Object.keys(activeFilters).length > 0 && (
                <button 
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>
            {Object.entries(filters).map(([filterName, options]) => (
              <div key={filterName} className="mb-6">
                <div
                  className="flex items-center justify-between cursor-pointer mb-3"
                  onClick={() => toggleDrawer(filterName)}
                >
                  <h3 className="font-semibold uppercase text-gray-800">{filterName}</h3>
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${openDrawers[filterName] ? "rotate-180" : ""}`}
                  />
                </div>
                <div className={`ml-1 transition-all duration-300 ease-in-out overflow-hidden ${openDrawers[filterName] ? "max-h-64" : "max-h-0"}`}>
                  {options.map((option) => (
                    <div key={option.name} className="flex items-center mb-2 text-sm hover:bg-gray-50 p-1 rounded">
                      <input 
                        type="checkbox"
                        id={`desktop-${filterName}-${option.name}`}
                        checked={activeFilters[filterName]?.includes(option.name) || false}
                        onChange={() => toggleFilter(filterName, option.name)}
                        className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                      />
                      <label 
                        htmlFor={`desktop-${filterName}-${option.name}`}
                        className="cursor-pointer flex-grow text-gray-700"
                      >
                        {option.name} <span className="text-gray-500">({option.count})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Filter */}
        <MobileFilter
          filters={filters}
          openDrawers={openDrawers}
          toggleDrawer={toggleDrawer}
          activeFilters={activeFilters}
          toggleFilter={toggleFilter}
        />

        {/* Main content */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          {/* Active Filters */}
          {Object.keys(activeFilters).length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              {Object.entries(activeFilters).map(([category, values]) => 
                values.map(value => (
                  <div 
                    key={`${category}-${value}`}
                    className="flex items-center bg-white px-3 py-1 rounded-full border border-gray-200 text-sm"
                  >
                    <span className="text-gray-700">{value}</span>
                    <button 
                      onClick={() => toggleFilter(category, value)}
                      className="ml-2 text-gray-500 hover:text-gray-800"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))
              )}
              <button 
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:underline ml-auto"
              >
                Clear All
              </button>
            </div>
          )}
          
          {/* Product count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">Showing {filteredProducts.length} products</p>
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filter selection</p>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {currentProducts.map((product) => (
              <div key={product.id}>
                <ProductCard 
                  product={product} 
                  category={category}
                  id={product.id} 
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-8 md:mt-12">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={20} className="mr-2" /> Previous
              </button>
              <div className="hidden md:flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-md transition-colors ${
                      currentPage === i + 1
                        ? "bg-black text-white"
                        : "border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <span className="md:hidden text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                Next <ChevronRight size={20} className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;