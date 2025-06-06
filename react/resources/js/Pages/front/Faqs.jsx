import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How can I change my password?",
    answer:
      "Go to the login page, click on 'Forgot Password', verify your number, and set a new password.",
  },
  {
    question: "Can I update my mobile number later?",
    answer:
      "Yes, after logging in, navigate to your profile and update your mobile number anytime.",
  },
  {
    question: "What if I don’t receive an OTP?",
    answer:
      "Check your mobile signal or wait a few seconds. You can resend the OTP after the countdown ends.",
  },
  {
    question: "Is my data safe with your app?",
    answer:
      "Yes. We prioritize user data privacy and follow encryption standards to keep your data secure.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl transition-shadow duration-300 shadow-sm hover:shadow-md"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="flex justify-between items-center w-full px-4 py-4 text-left"
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-indigo-600 transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeIndex === index && (
                <div className="px-4 pb-4 text-sm text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;