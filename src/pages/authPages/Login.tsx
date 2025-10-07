import React from 'react';
import { LoginForm } from '../../components/forms/LoginForm';
import { Toaster } from 'react-hot-toast';

export const Login: React.FC = () => {
  return (
    <>
    <Toaster position="top-right" />
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
    </>
  );
};