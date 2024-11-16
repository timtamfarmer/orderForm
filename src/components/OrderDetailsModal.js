import React from 'react';

const OrderDetailsModal = ({ order, customerData, onClose }) => {
  // Access the first order if it's an array
  const orderData = Array.isArray(order) ? order[0] : order;
  const items = orderData?.items || [];
  

  // Get the customer name from the order data
  const customerName = customerData?.username || 'Customer';

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full bg-black bg-opacity-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg  max-w-md">
        <h2 className="text-3xl mb-4 w-full border-b pb-2">{customerName}'s Order Details</h2>
        {items.length > 0 ? (
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex justify-between p-2 bg-gray-700 rounded hover:bg-gray-600 transition duration-300">
                <span className="font-medium">{item.title}</span>
                <span className="text-gray-300">Quantity: {item.quantity}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300 mt-4">No items in this order.</p>
        )}
        <p className="mt-6 text-lg font-semibold">Total Items: {orderData?.totalItems || 0}</p>
        <button
          onClick={onClose}
          className="mt-6 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
