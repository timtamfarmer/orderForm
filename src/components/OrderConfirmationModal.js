// components/OrderConfirmationModal.js
import React from 'react';

const OrderConfirmationModal = ({ isOpen, onClose, onConfirm, orderDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Confirm Your Order</h2>
        <div>
          <h3 className="text-lg font-semibold mb-2">Order Summary:</h3>
          <ul className="mb-4">
            {orderDetails.map((item, index) => (
              <li key={index} className="mb-2">
                <span>{item.title} - Quantity: {item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 p-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
