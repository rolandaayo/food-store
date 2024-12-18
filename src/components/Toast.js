'use client';

import { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const TOAST_TYPES = {
  success: {
    icon: FaCheckCircle,
    className: 'bg-green-100 text-green-800 border-green-300',
  },
  error: {
    icon: FaTimesCircle,
    className: 'bg-red-100 text-red-800 border-red-300',
  },
  info: {
    icon: FaInfoCircle,
    className: 'bg-blue-100 text-blue-800 border-blue-300',
  },
};

export default function Toast({ message, type = 'info', onClose, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(true);
  const ToastIcon = TOAST_TYPES[type].icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center p-4 rounded-lg border 
        shadow-lg transition-all duration-300 transform 
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
        ${TOAST_TYPES[type].className}`}
    >
      <ToastIcon className="text-xl mr-3" />
      <p className="font-medium">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose();
        }}
        className="ml-4 p-1 hover:bg-black/10 rounded-full"
      >
        <IoClose className="text-xl" />
      </button>
    </div>
  );
} 