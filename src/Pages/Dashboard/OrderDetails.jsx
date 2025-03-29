import React, { useState } from 'react';

const OrderDetails = ({ order, onClose, updateOrderStatus, updateTrackingId, getStatusColor, formatDate }) => {
  const [trackingId, setTrackingId] = useState('');

  const handleUpdateOrderStatus = async (newStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/api/dashboard/status/${order._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        updateOrderStatus(order._id, newStatus);
      } else {
        throw new Error(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    }
  };

  const handleUpdateTrackingId = async () => {
    if (!trackingId.trim()) {
      alert('Please enter a tracking ID');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/dashboard/trackingId/${order._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ trackingId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        updateTrackingId(order._id, trackingId);
        setTrackingId('');
      } else {
        throw new Error(data.message || 'Failed to update tracking ID');
      }
    } catch (error) {
      console.error('Error updating tracking ID:', error);
      alert('Failed to update tracking ID. Please try again.');
    }
  };

  const handleDownloadImage = async (imageUrl, description) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${description || 'image'}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"></span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-semibold text-gray-900">
                    Manage Order: {order.orderNumber}
                  </h3>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Order Information */}
                  <div className="mb-5">
                    <h4 className="font-medium text-gray-900 mb-2">Order Information</h4>
                    <div className="bg-gray-50 p-3 rounded border text-sm">
                      <p><span className="font-medium">Order ID:</span> {order._id}</p>
                      <p><span className="font-medium">Order Number:</span> {order.orderNumber}</p>
                      <p><span className="font-medium">Created:</span> {formatDate(order.createdAt)}</p>
                      <p><span className="font-medium">Items:</span> {order.items.length}</p>
                      <p><span className="font-medium">Subtotal:</span> ₹{order.subtotal.toLocaleString()}</p>
                      <p><span className="font-medium">Shipping:</span> ₹{order.shipping.toLocaleString()}</p>
                      <p><span className="font-medium">Tax:</span> ₹{order.tax.toLocaleString()}</p>
                      <p><span className="font-medium">Total:</span> ₹{order.total.toLocaleString()}</p>
                      <p><span className="font-medium">Status:</span> 
                        <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Customer Information */}
                  <div className="mb-5">
                    <h4 className="font-medium text-gray-900 mb-2">Customer Information</h4>
                    <div className="bg-gray-50 p-3 rounded border text-sm">
                      <p><span className="font-medium">User ID:</span> {order.user._id}</p>
                      <p><span className="font-medium">User Phone:</span> {order.user.phone}</p>
                      <p><span className="font-medium">Role:</span> {order.user.role}</p>
                      <p><span className="font-medium">Shipping Name:</span> {order.address.name}</p>
                      <p><span className="font-medium">Shipping Phone:</span> {order.address.phone}</p>
                      <p><span className="font-medium">Address:</span> {order.address.street}, {order.address.city}, {order.address.state} {order.address.postalCode}, {order.address.country}</p>
                      <p><span className="font-medium">Address Type:</span> {order.address.type}</p>
                      <p><span className="font-medium">Default Address:</span> {order.address.isDefault ? 'Yes' : 'No'}</p>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="mb-5">
                    <h4 className="font-medium text-gray-900 mb-2">Payment Information</h4>
                    <div className="bg-gray-50 p-3 rounded border text-sm">
                      <p><span className="font-medium">Amount:</span> ₹{order.payment.amount.toLocaleString()}</p>
                      <p><span className="font-medium">Status:</span> 
                        <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${order.payment.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {order.payment.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Order Items */}
                <div className="mb-5">
                  <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
                  <div className="overflow-x-auto border rounded">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Images</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Qty</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {order.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex items-center">
                                <div className="h-12 w-12 flex-shrink-0 mr-3">
                                  <img className="h-12 w-12 object-cover rounded" src={item.productImage} alt={item.product.name} />
                                </div>
                                <div>
                                  <p className="font-medium">{item.product.name}</p>
                                  <p className="text-xs text-gray-500">{item.product.category}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <p><span className="font-medium">Type:</span> {item.selectedTypeName || 'N/A'}</p>
                              <p><span className="font-medium">Size:</span> {item.selectedSizeName || 'N/A'}</p>
                              {item.selectedColorName && <p><span className="font-medium">Color:</span> {item.selectedColorName}</p>}
                              {item.customText && <p><span className="font-medium">Custom Text:</span> {item.customText}</p>}
                              <p><span className="font-medium">Product Type:</span> {item.product.productType}</p>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              {item.images && item.images.length > 0 ? (
                                <div className="space-y-4">
                                  {item.images.map((img, imgIndex) => (
                                    <div key={img._id} className="flex items-center space-x-3">
                                      <img
                                        src={img.image}
                                        alt={img.description || `Image ${imgIndex + 1}`}
                                        className="h-16 w-16 object-cover rounded"
                                      />
                                      <div>
                                        <p className="text-sm">{img.description || 'No description'}</p>
                                        <button
                                          onClick={() => handleDownloadImage(img.image, img.description)}
                                          className="mt-1 text-xs text-blue-600 hover:text-blue-800 underline"
                                        >
                                          Download Image
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p>No images available</p>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                              ₹{item.price.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Order Management */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                  {/* Status Update */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Update Status</h4>
                    <div className="bg-gray-50 p-4 rounded border">
                      <div className="mb-3">
                        <p className="text-sm mb-2">Current Status: 
                          <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={() => handleUpdateOrderStatus('Pending')}
                          className={`px-3 py-1 text-xs rounded-full border ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 'hover:bg-yellow-50'}`}
                        >
                          Pending
                        </button>
                        <button 
                          onClick={() => handleUpdateOrderStatus('Processing')}
                          className={`px-3 py-1 text-xs rounded-full border ${order.status === 'Processing' ? 'bg-purple-100 text-purple-800 border-purple-300' : 'hover:bg-purple-50'}`}
                        >
                          Processing
                        </button>
                        <button 
                          onClick={() => handleUpdateOrderStatus('Shipped')}
                          className={`px-3 py-1 text-xs rounded-full border ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 border-blue-300' : 'hover:bg-blue-50'}`}
                        >
                          Shipped
                        </button>
                        <button 
                          onClick={() => handleUpdateOrderStatus('Delivered')}
                          className={`px-3 py-1 text-xs rounded-full border ${order.status === 'Delivered' ? 'bg-green-100 text-green-800 border-green-300' : 'hover:bg-green-50'}`}
                        >
                          Delivered
                        </button>
                        <button 
                          onClick={() => handleUpdateOrderStatus('Cancelled')}
                          className={`px-3 py-1 text-xs rounded-full border ${order.status === 'Cancelled' ? 'bg-red-100 text-red-800 border-red-300' : 'hover:bg-red-50'}`}
                        >
                          Cancelled
                        </button>
                        <button 
                          onClick={() => handleUpdateOrderStatus('Refunded')}
                          className={`px-3 py-1 text-xs rounded-full border ${order.status === 'Refunded' ? 'bg-gray-300 text-gray-800' : 'hover:bg-gray-100'}`}
                        >
                          Refunded
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tracking Information */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tracking Information</h4>
                    <div className="bg-gray-50 p-4 rounded border">
                      {order.trackingId ? (
                        <div>
                          <p className="text-sm mb-2">Current Tracking ID:</p>
                          <div className="flex items-center bg-blue-50 border border-blue-200 rounded p-2 mb-3">
                            <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm font-medium">{order.trackingId}</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm mb-2">No tracking ID assigned</p>
                      )}
                      
                      <div className="flex">
                        <input
                          type="text"
                          value={trackingId}
                          onChange={(e) => setTrackingId(e.target.value)}
                          placeholder="Enter tracking ID"
                          className="flex-1 border-gray-300 rounded-l-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm p-2"
                        />
                        <button
                          onClick={handleUpdateTrackingId}
                          className="bg-blue-600 text-white px-3 py-2 rounded-r-md text-sm hover:bg-blue-700"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;