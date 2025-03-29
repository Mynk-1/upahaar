import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
    const navigate = useNavigate();
    
    // Add smooth scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    
    return (
    <div className="bg-white min-h-screen text-gray-800 font-titillium">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-100/80 to-gray-200/80 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900">About Our Gift Shop</h1>
          <p className="text-xl text-center text-gray-700 mt-4 max-w-3xl mx-auto">
            Turning your precious memories into unique, personalized keepsakes since 2018.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16 pb-0">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img 
              src="https://res.cloudinary.com/dg3ftdduj/image/upload/v1742035067/62ea33c5c69f445885ff9e68_what-is-a-workshop_ozknvw.jpg" 
              alt="Workshop with craftspeople creating gifts" 
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              We started as a small workshop with a big dream - to help people preserve their 
              memories and celebrate special moments through personalized gifts that last a lifetime.
            </p>
            <p className="text-gray-700">
              What began as a passion project has grown into a beloved brand trusted by thousands 
              of customers across the country for creating meaningful, high-quality keepsakes.
            </p>
          </div>
        </div>
      </div>

      {/* Products Showcase */}
      <div className="bg-white py-16 pb-0">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">
            Our Handcrafted Gifts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product Category 1 */}
            <div className="bg-gray-50/80 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="h-48 flex items-center justify-center">
                <img src="https://res.cloudinary.com/dg3ftdduj/image/upload/v1742034987/Acrylic_Photo_Frame_dndrby.webp" alt="Acrylic gifts" className="max-h-full" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mt-4">Acrylic Creations</h3>
              <p className="text-gray-700 mt-2">
                Stunning acrylic photo prints, keychains, and decorative pieces that capture moments in crystal-clear quality.
              </p>
            </div>

            {/* Product Category 2 */}
            <div className="bg-gray-50/80 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="h-48 flex items-center justify-center">
                <img src="https://res.cloudinary.com/dg3ftdduj/image/upload/v1742035116/IN_Custom-Mug_Hero-image_04_xpnq0m.webp" alt="Customized mugs" className="max-h-full" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mt-4">Photo Mugs & Drinkware</h3>
              <p className="text-gray-700 mt-2">
                Start your day with a smile using our customized mugs featuring your favorite photos, quotes, or designs.
              </p>
            </div>

            {/* Product Category 3 */}
            <div className="bg-gray-50/80 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="h-48 flex items-center justify-center">
                <img src="https://res.cloudinary.com/dg3ftdduj/image/upload/v1742035183/images_hfqwml.jpg" alt="Customized cushions" className="max-h-full" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mt-4">Comfort & Home</h3>
              <p className="text-gray-700 mt-2">
                Cozy cushions, frames, and home decor items that add a personal touch to any living space.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors" onClick={()=> navigate("/")}>
              Explore Our Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
