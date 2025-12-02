import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-600" style={{ width: '20px', height: '20px' }} />;
      case 'error':
        return <XCircle className="text-red-600" style={{ width: '20px', height: '20px' }} />;
      case 'warning':
        return <AlertCircle className="text-yellow-600" style={{ width: '20px', height: '20px' }} />;
      case 'info':
        return <Info className="text-blue-600" style={{ width: '20px', height: '20px' }} />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
    }
  };

  return createPortal(
    <div
      className="position-fixed top-0 end-0 p-3"
      style={{
        zIndex: 9999,
        animation: 'slideInRight 0.3s ease-out',
      }}
    >
      <div
        className={`glass rounded-2xl shadow-lg border ${getBgColor()} d-flex align-items-center gap-3 px-4 py-3`}
        style={{ minWidth: '300px', maxWidth: '400px' }}
      >
        {getIcon()}
        <span className="flex-grow-1 text-gray-900 small fw-medium">{message}</span>
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Close"
          style={{ fontSize: '0.75rem' }}
        />
      </div>
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>,
    document.body
  );
};

export default Toast;

