'use client';

import { useEffect } from 'react';
import { useToast } from '@/context/ToastContext';

export default function PaystackPayment({ amount, email, onSuccess, onClose }) {
  const { showToast } = useToast();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializePayment = () => {
    if (!window.PaystackPop) {
      showToast('Payment system is loading. Please try again.', 'error');
      return;
    }

    try {
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: Math.round(amount * 100), // Convert to kobo and ensure whole number
        currency: 'NGN',
        ref: `ord_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
        metadata: {
          order_id: Date.now(),
          custom_fields: [
            {
              display_name: "Order Amount",
              variable_name: "order_amount",
              value: amount
            }
          ]
        },
        callback: (response) => {
          if (response.status === 'success') {
            onSuccess(response);
            showToast('Payment successful! Your order is being processed.', 'success');
          } else {
            showToast('Payment failed. Please try again.', 'error');
          }
        },
        onClose: () => {
          onClose();
          showToast('Payment window closed', 'info');
        },
      });
      handler.openIframe();
    } catch (error) {
      console.error('Paystack initialization error:', error);
      showToast('Unable to initialize payment. Please try again.', 'error');
      onClose();
    }
  };

  return { initializePayment };
} 