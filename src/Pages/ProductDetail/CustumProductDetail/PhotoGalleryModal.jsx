import React from "react";
import { X } from "lucide-react";

const PhotoGalleryModal = ({
  selectedType,
  product,
  setShowAllPhotos,
  setMainImage
}) => (
  <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg w-full max-h-[90vh] overflow-y-auto p-6 max-w-5xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{selectedType.name} {product.productType} Gallery</h2>
        <button 
          onClick={() => setShowAllPhotos(false)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {selectedType.previewImages.map((photo, index) => (
          <div key={index} className="aspect-square">
            <img
              src={photo}
              alt={`${selectedType.name} ${product.productType} view ${index + 1}`}
              className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => {
                setMainImage(index);
                setShowAllPhotos(false);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PhotoGalleryModal;