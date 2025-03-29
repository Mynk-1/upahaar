import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, resetAddItemSuccess } from "../../../Store/Slices/cartitemSlice";
import ImageGallery from "../CustumProductDetail/ImageGallery";
import ProductOptions from "../CustumProductDetail/ProductOptions";
import PhotoUploader from "../CustumProductDetail/PhotoUploader";
import ProductInfo from "../CustumProductDetail/ProductInfo";
import ProductSections from "../CustumProductDetail/ProductSections";
import Button from "../CustumProductDetail/Button";
import PhotoGalleryModal from "../CustumProductDetail/PhotoGalleryModal";
import SignInModal from "../CustumProductDetail/SignInModal";
import { useAuth } from "../../../auth/AuthProvider";
import { getItemByCustomizedFrameId } from "../../../Data/frames";
import { getItemByAcrylicsId } from "../../../Data/acrylics";
import { getProductByCategory } from "../../../Data/CustumProductDetails";

const CustomProductDetail = () => {
  const { category, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user and cart state
  const { user } = useAuth();
  const { loading: isSubmitting, error, addItemSuccess } = useSelector((state) => state.cart);

  // Product state
  const [product, setProduct] = useState(null);
  
  // State management
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [customText, setCustomText] = useState("");
  const [hoverImage, setHoverImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSignInModal, setShowSignInModal] = useState(false);

  // Initialize product and initial selections based on category
  useEffect(() => {
    let foundProduct = null;
    
    if (category === "CustomizedFrames") {
      foundProduct = getItemByCustomizedFrameId(id);
    } else if (category === "acrylics") {
      foundProduct = getItemByAcrylicsId(id);
    } else {
      // Fallback to the general product data
      foundProduct = getProductByCategory(category);
    }

    if (foundProduct) {
      setProduct(foundProduct);
      const initialType = foundProduct.customizationOptions.types?.[0];
      setSelectedType(initialType);
      setSelectedSize(initialType?.sizes?.[0] || null);
      setSelectedColor(initialType?.colors?.[0] || null);
    } else {
      navigate("/"); // Redirect if product not found
    }
  }, [category, id, navigate]);

  // Calculate current price based on selected options
  const currentPrice = selectedSize?.price || selectedType?.price || (product?.price || 0);

  // Reset form after successful add to cart
  useEffect(() => {
    if (addItemSuccess) {
      setUploadedImages([]);
      setCustomText("");
      dispatch(resetAddItemSuccess());
    }
  }, [addItemSuccess, dispatch]);

  // Update error message from Redux - only for non-auth related errors
  useEffect(() => {
    if (error && error !== "Login to add Item") {
      setErrorMessage(typeof error === "string" ? error : "An error occurred");
    } else {
      setErrorMessage("");
    }
  }, [error]);

  const handleSubmit = async () => {
    // Check if user is logged in
    if (!user) {
      setShowSignInModal(true);
      return;
    }

    // Validate that photos have been uploaded
    if (uploadedImages.length === 0) {
      setErrorMessage("Please upload at least one photo to continue.");
      return;
    }

    const formData = new FormData();

    // Add required fields
    formData.append("productId", product.id);
    formData.append("productCategory", category);
    formData.append("productName", product.name);
    formData.append("selectedType", selectedType?.id || "");
    formData.append("selectedTypeName", selectedType?.name || "");
    formData.append("selectedSize", selectedSize?.id || "");
    formData.append("selectedSizeName", selectedSize?.name || "");
    formData.append("selectedColor", selectedColor?.id || "");
    formData.append("quantity", quantity.toString());
    formData.append("customText", customText);
    formData.append("price", currentPrice.toString());

    // Add uploaded images and their descriptions
    uploadedImages.forEach((image, index) => {
      formData.append("images", image.file);
      formData.append(`imageDescriptions[${index}]`, image.text || "");
    });

  

    // Dispatch the addCartItem thunk
    dispatch(addCartItem(formData));
  };

  const handleSignIn = () => {
    // Navigate to sign in page
    navigate("/profile");
    setShowSignInModal(false);
  };

  if (!product) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 fontAdd">
      {showAllPhotos && (
        <PhotoGalleryModal
          selectedType={selectedType}
          product={product}
          setShowAllPhotos={setShowAllPhotos}
          setMainImage={setMainImage}
        />
      )}

      {showSignInModal && (
        <SignInModal 
          onClose={() => setShowSignInModal(false)} 
          onSignIn={handleSignIn}
          message="Please sign in to add items to your cart"
        />
      )}

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <ImageGallery
            selectedType={selectedType}
            product={product}
            mainImage={mainImage}
            setMainImage={setMainImage}
            setShowAllPhotos={setShowAllPhotos}
            hoverImage={hoverImage}
            setHoverImage={setHoverImage}
          />
        </div>

        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <ProductInfo product={product} currentPrice={currentPrice} />

          <ProductOptions
            product={product}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            setMainImage={setMainImage}
            setHoverImage={setHoverImage}
          />

          <div className="mt-6">
            <p className="font-semibold mb-2">QUANTITY</p>
            <div className="flex items-center border border-gray-300 rounded-md w-32">
              <button
                type="button"
                className="px-3 py-2 hover:bg-gray-100"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-x"
              />
              <button
                type="button"
                className="px-3 py-2 hover:bg-gray-100"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <PhotoUploader
            product={product}
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
          />

          {product.customizationOptions.allowText && (
            <div className="mt-6">
              <p className="font-semibold mb-2">ADD CUSTOM TEXT (Optional)</p>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder={product.customizationOptions.textPlaceholder || "Add your custom text here..."}
                className="w-full border border-gray-300 p-2 rounded-md"
                rows={2}
                maxLength={product.customizationOptions.maxTextLength || 100}
              />
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {errorMessage}
            </div>
          )}

          {addItemSuccess && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
              Item added to cart successfully!
            </div>
          )}

          <Button
            type="button"
            disabled={uploadedImages.length === 0 || isSubmitting}
            className="w-full mt-6"
            onClick={handleSubmit}
          >
            {uploadedImages.length === 0
              ? "UPLOAD PHOTOS TO ADD ITEM TO CART"
              : isSubmitting
              ? "ADDING TO CART..."
              : "ADD TO CART"}
          </Button>

          <ProductSections sections={product.sections || []} />
        </div>
      </div>
    </div>
  );
};

export default CustomProductDetail;