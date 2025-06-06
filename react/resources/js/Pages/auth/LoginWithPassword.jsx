import React, { useState } from 'react';
import { usePage, useForm } from '@inertiajs/react';

const LoginWithPassword = () => {
  const { errors, auth } = usePage().props;
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { data, setData, post, processing } = useForm({
    phone: auth?.user?.phone || '',
    password: '',
  });

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    post('/login/password'); // Adjust route as per your backend
  };

  return (
    <div className='container mx-auto'>
      <div className='flex items-center justify-center min-h-screen'>
        <div className="max-w-md p-6 mx-auto bg-white shadow-xl rounded-xl animate-fade-in">
          <h2 className="mb-6 text-2xl font-bold text-center text-indigo-600">Login with Password</h2>

          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            {/* Phone Field (Disabled) */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={data.phone}
                className="block w-full px-4 py-2 mt-1 text-gray-500 bg-gray-100 border rounded-xl"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                placeholder="Enter your password"
                required
                className="block w-full px-4 py-2 mt-1 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible((prev) => !prev)}
                className="absolute inset-y-0 right-3 top-[30px] text-sm text-indigo-600"
              >
                {passwordVisible ? 'Hide' : 'Show'}
              </button>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition disabled:opacity-50"
            >
              {processing ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginWithPassword;
