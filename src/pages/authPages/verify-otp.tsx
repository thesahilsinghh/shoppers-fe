import React from 'react';
import { OTPForm } from '../../components/forms/OTPForm';
import { Toaster } from 'react-hot-toast';

export const VerifyOTP: React.FC = () => {
  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <OTPForm />
      </div>
    </>
  );
};
