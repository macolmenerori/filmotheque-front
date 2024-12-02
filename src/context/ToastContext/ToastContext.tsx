import React from 'react';
import { createContext, useContext, useState } from 'react';

import StatusToast from '../../common/components/StatusToast/StatusToast';
import { StatusToastAttributes } from '../../common/components/StatusToast/StatusToast.types';

import { ToastContextType, ToastProviderProps } from './ToastContext.types';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Access the toast context, for displaying messages on a toast
 *
 * @returns {ToastContextType} Toast context
 */
export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};

/**
 * Provider for the toast context
 *
 * @param {ToastProviderProps} children Children of the provider
 *
 * @returns {JSX.Element} ToastProvider component
 */
export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<StatusToastAttributes | null>(null);

  const showToast = ({ title, message, type }: StatusToastAttributes) => {
    setToast({ title, message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <StatusToast
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </ToastContext.Provider>
  );
};
