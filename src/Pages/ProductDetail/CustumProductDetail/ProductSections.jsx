import React, { useState } from "react";

const ProductSections = ({ sections }) => {
  const [openSection, setOpenSection] = useState(null);

  return (
    <div className="mt-6 space-y-4">
      {sections.map((section, index) => (
        <div key={index} className="border-t border-gray-300 pt-4">
          <button 
            className="flex justify-between items-center w-full font-semibold"
            onClick={() => setOpenSection(openSection === index ? null : index)}
          >
            <span>{section.title}</span>
            <span className="transform transition-transform duration-200" 
                  style={{ transform: openSection === index ? 'rotate(180deg)' : '' }}>
              ▼
            </span>
          </button>
          {openSection === index && (
            <p className="text-sm text-gray-600 mt-2">{section.content}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductSections;