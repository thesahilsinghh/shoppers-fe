import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Mail, User, Phone, MapPin, Lock } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import type { RegisterData } from '../../types/auth';
import toast from 'react-hot-toast';
import { Select } from '../ui/Select';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    phone_number: '',
    address: '',
    role:'',
  });
  const [errors, setErrors] = useState<Partial<RegisterData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof RegisterData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterData> = {};

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.last_name) newErrors.last_name = 'Last name is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      console.log(formData);
      const response = await register(formData);
      console.log(response.message);
      toast.success(response.message);
      // Redirect to OTP page with email
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
        <p className="text-gray-600 mt-2">Join us today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="soham"
            required
          />
          <Input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="k"
            required
          />
        </div>

        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="soham@gmail.com"
          required
        />

        <Input
          type="tel"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="+1234567890"
        />

        <Input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="123 Main Street" />

        <Select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-2" // optional spacing
        >
          <option value="">Select a role</option>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </Select>

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button type="submit"  className="w-full">
          Create Account
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </Card>
  );
};