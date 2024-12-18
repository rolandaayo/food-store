'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { FaTrash, FaShoppingBag } from 'react-icons/fa';
import Image from 'next/image';
import PaystackPayment from './PaystackPayment';

export default function Cart({ onClose }) {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);

  const handleRemoveItem = (item) => {
    removeFromCart(item.id);
    showToast(`Removed ${item.name} from cart`, 'info');
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    updateQuantity(item.id, newQuantity);
    if (newQuantity === 0) {
      showToast(`Removed ${item.name} from cart`, 'info');
    }
  };

  const handlePaymentSuccess = (response) => {
    clearCart();
    showToast('Order placed successfully!', 'success');
    onClose();
    setIsProcessing(false);
    setShowEmailInput(false);
  };

  const handlePaymentClose = () => {
    setIsProcessing(false);
    setShowEmailInput(false);
  };

  const { initializePayment } = PaystackPayment({
    amount: cartTotal,
    email: userEmail,
    onSuccess: handlePaymentSuccess,
    onClose: handlePaymentClose,
  });

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }
    setShowEmailInput(true);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!userEmail) {
      showToast('Please enter your email', 'error');
      return;
    }
    setIsProcessing(true);
    initializePayment();
  };

  return (
    <div className="fixed top-20 right-4 bg-white shadow-2xl p-6 rounded-2xl min-w-[350px] max-w-[400px] z-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="text-gray-400 hover:text-red-500 transition-colors p-2"
            title="Clear cart"
          >
            <FaTrash />
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <FaShoppingBag className="text-4xl text-gray-400 mb-4 mx-auto" />
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="max-h-[400px] overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="relative w-20 h-20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-[--primary] font-semibold">${item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <span className="material-icons-outlined">delete</span>
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            {showEmailInput ? (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[--primary]"
                  required
                />
                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="button-primary w-full disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEmailInput(false)}
                  className="w-full text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button 
                onClick={handleCheckout}
                className="button-primary w-full"
              >
                Checkout
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
} 