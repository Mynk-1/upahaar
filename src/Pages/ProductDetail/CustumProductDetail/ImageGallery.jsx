import React from "react";
import { Plus } from "lucide-react";

const ImageGallery = ({
  selectedType,
  product,
  mainImage,
  setMainImage,
  setShowAllPhotos,
  hoverImage,
  setHoverImage
}) => {
  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="flex md:flex-col md:w-24 gap-2 mt-2 md:mt-0 md:mr-4 overflow-x-auto md:overflow-y-auto order-2 md:order-1">
        {selectedType.previewImages.slice(0, 4).map((img, index) => (
          index !== mainImage && (
            <div
              key={index}
              className="flex-none w-20 md:w-24 aspect-square relative "
              onMouseEnter={() => setHoverImage(index)}
              onMouseLeave={() => setHoverImage(null)}
              onClick={() => setMainImage(index)}
            >
              <img
                src={img}
                alt={`${selectedType.name} ${product.productType} view ${index + 1}`}
                className="w-full h-full object-cover cursor-pointer border border-gray-300 hover:border-black transition-all duration-200 hover:opacity-80"
              />
            </div>
          )
        ))}
        {selectedType.previewImages.length > 4 && (
          <MorePhotosButton 
            selectedType={selectedType}
            setShowAllPhotos={setShowAllPhotos}
          />
        )}
      </div>

      <MainImage 
        selectedType={selectedType}
        product={product}
        mainImage={mainImage}
        hoverImage={hoverImage}
      />
    </div>
  );
};

const MorePhotosButton = ({ selectedType, setShowAllPhotos }) => (
  <div 
    className="flex-none w-20 md:w-24 aspect-square relative cursor-pointer group"
    onClick={() => setShowAllPhotos(true)}
  >
    <img 
      src={selectedType.previewImages[4]}
      alt="More photos"
      className="w-full h-full object-cover "
    />
    <div className="absolute inset-0  bg-black/30 group-hover:bg-black/50 flex items-center justify-center transition-all duration-200">
      <div className="text-white text-center">
        <Plus className="w-6 h-6 mx-auto" />
        <span className="text-xs">
          +{selectedType.previewImages.length - 4}
        </span>
      </div>
    </div>
  </div>
);

const MainImage = ({ selectedType, product, mainImage, hoverImage }) => (
  <div className="w-full md:flex-1 order-1 md:order-2">
    <img
      src={selectedType.previewImages[hoverImage !== null ? hoverImage : mainImage]}
      alt={`${selectedType.name} ${product.productType} main view`}
      className="w-full aspect-square object-cover"
    />
  </div>
);

export default ImageGallery;