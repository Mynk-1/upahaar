import React, { useState, useEffect } from "react";
import { Package, ChevronDown, ChevronUp, ShoppingBag, Clock, CheckCircle, XCircle, Truck } from "lucide-react";

const OrderStatus = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-50 text-green-700';
      case 'cancelled':
        return 'bg-red-50 text-red-700';
      case 'processing':
      case 'pending':
        return 'bg-blue-50 text-blue-700';
      case 'shipped':
        return 'bg-purple-50 text-purple-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

const OrderItem = ({ item }) => (
  <div className="flex items-center gap-4 py-3 border-t border-gray-100 first:border-t-0">
    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
      <img 
        src={item.productImage || "/api/placeholder/64/64"} 
        alt={item.selectedTypeName} 
        className="w-12 h-12 object-cover rounded"
      />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-medium text-gray-900 truncate">{item.selectedTypeName}</h4>
      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
      <p className="text-sm font-medium text-gray-900">₹{item.price.toFixed(2)}</p>
    </div>
  </div>
);

const Order = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'processing':
      case 'pending':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-purple-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formattedDate = formatDate(order.createdAt);
  
  // Create status message
  const getStatusMessage = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return `Delivered`;
      case 'cancelled':
        return `Cancelled`;
      case 'processing':
        return 'Order is being processed';
      case 'pending':
        return 'Order is pending';
      case 'shipped':
        return `Shipped`;
      default:
        return `Order status: ${status}`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Order Header */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-gray-900">Order #{order.orderNumber}</h3>
              <OrderStatus status={order.status} />
            </div>
            <p className="text-sm text-gray-500">Placed on {formattedDate}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm font-medium text-gray-900">₹{order.total.toFixed(2)}</p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 hover:text-gray-700"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="mt-4 flex items-center gap-2">
          {getStatusIcon(order.status)}
          <div className="text-sm text-gray-500">{getStatusMessage(order.status)}</div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 sm:p-6">
          <div className="space-y-4">
            {/* Delivery Address */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Delivery Address</h4>
              <div className="text-sm text-gray-500">
                <p>{order.address.name}</p>
                <p>{order.address.street}</p>
                <p>{order.address.city}, {order.address.state} {order.address.postalCode}</p>
                <p>Phone: {order.address.phone}</p>
              </div>
            </div>

            {/* Tracking Information */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Tracking Information</h4>
              <div className="text-sm text-gray-500">
                {order.trackingId ? (
                  <p>
                    <span className="font-medium">Tracking ID:</span> {order.trackingId}
                  </p>
                ) : (
                  <p>Tracking ID will be updated soon</p>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Order Items</h4>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <OrderItem key={index} item={item} />
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-200 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span>₹{order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Tax</span>
                  <span>₹{order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/orders/get`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        if (data.success && data.orders) {
          setOrders(data.orders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 lg:p-8 mb-8 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 lg:p-8 mb-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <XCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-700 mb-2">Error</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8 mb-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">My Orders</h2>
            <p className="text-sm text-gray-500">View and track your orders</p>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <Order key={order._id} order={order} />
        ))}
      </div>

      {/* Empty State */}
      {orders.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Found</h3>
          <p className="text-gray-500 mb-4">
            You haven't placed any orders yet
          </p>
          <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            <ShoppingBag className="w-4 h-4" />
            <span>Start Shopping</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MyOrders;