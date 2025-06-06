import GuestLayout from "@/Layouts/Front/Layout";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

const LoginWithPhone = () => {
  const [otpSend, setotpSend] = useState(false)

  const { data, setData, post, processing, errors } = useForm({
    phone: '',
    code: '',
  });
  function handleSubmit(e) {
    e.preventDefault();
    post(!otpSend ? route('login.send') : route('login.verify'), {
      onSuccess: (page) => {
        // Laravel responded with 200, OTP sent successfully
        setotpSend(true);
        console.log('Success:', page.props); // if you return props from Inertia
      },
      onError: (errors) => {
        // Laravel returned validation or server error (e.g. status 422 or 500)
        console.error('Validation or server error:', errors);
      },
      onFinish: () => {
        // Called after success or error
      },
    });
  }
  return (
    <>
      <GuestLayout>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
            <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Login with OTP</h2>
            <form onSubmit={e => handleSubmit(e)} className="space-y-5">
              <div>
                <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">
                  Phone Number <span className="text-gray-400">(e.g. +91XXXXXXXXXX)</span>
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={data.phone}
                  onChange={(e) => setData("phone", e.target.value)}
                  placeholder="+91XXXXXXXXXX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              {otpSend && (
                <div>
                  <label htmlFor="otp" className="block mb-1 text-sm font-medium text-gray-700">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    name="code"
                    onChange={e => setData('code', e.target.value)}
                    placeholder="123456"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
              )}

              <button type="submit" disabled={processing ? "disabled" : ""} className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                {processing ? "Wait..." : otpSend ? "Login" : "Continue"}
              </button>
            </form>
          </div>
        </div>
      </GuestLayout>
    </>
  )
};

export default LoginWithPhone;