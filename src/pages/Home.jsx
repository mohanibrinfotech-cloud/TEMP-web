import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/contact", formData);

      if (data.success) {
        toast.success("Message sent successfully!");

        setFormData({
          name: "",
          mobile: "",
          email: "",
          message: "",
        });
      } else {
        toast.error(data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "An error occurred. Please try again later.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased scroll-smooth">
      {/* 1. HEADER / NAVIGATION */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              {/* <span className="text-2xl font-black tracking-tight text-indigo-600">Brand<span className="text-slate-900">Name</span></span> */}
            </div>

            <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
              <a href="#" className="text-indigo-600 px-1 pt-1">
                Home
              </a>
              <a
                href="#features"
                className="hover:text-slate-900 px-1 pt-1 transition-colors"
              >
                Features
              </a>
              <a
                href="#contact"
                className="hover:text-slate-900 px-1 pt-1 transition-colors"
              >
                Contact Us
              </a>
            </nav>

            <div className="hidden md:flex items-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* 2. HERO SECTION */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-indigo-50/50 to-transparent pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
            <div className="inline-flex items-center gap-x-2 bg-indigo-50 border border-indigo-100 rounded-full py-1 px-3 text-xs font-semibold text-indigo-700 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Now Live: Next-Gen Platform Built for Speed
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
              Build beautiful websites{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                faster than ever before
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              The ultimate utility-first React kit designed to help you launch
              your next big idea. Clean JSX code, reactive states, and
              responsive styling.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150"
              >
                Start Free Trial
              </a>
            </div>

            {/* Logo Cloud / Trust Bar */}
            <div className="mt-20 border-t border-slate-200 pt-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Trusted by modern teams worldwide
              </p>
              <div className="mt-6 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60 text-slate-500 font-bold text-lg">
                <span>⚡️ ACME Corp</span>
                <span>⚡️ Globex</span>
                <span>⚡️ Initech</span>
                <span>⚡️ Umbrellaco</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CONTACT FORM SECTION */}
        <section
          id="contact"
          className="py-20 bg-white border-t border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Contact Copywriting */}
              <div className="max-w-lg">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Let's talk about your project
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  Have questions or ready to get started? Fill out the form,
                  drop us a line, and our team will get back to you within 24
                  hours.
                </p>

                <div className="mt-8 space-y-4 text-sm text-slate-600">
                  <div className="flex items-center gap-x-3">
                    <span className="font-semibold text-indigo-600">
                      Email:
                    </span>{" "}
                    support@brandname.com
                  </div>
                  <div className="flex items-center gap-x-3">
                    <span className="font-semibold text-indigo-600">
                      Hours:
                    </span>{" "}
                    Mon - Fri, 9am - 5pm EST
                  </div>
                </div>
              </div>

              {/* Contact Form Card */}
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/60 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none sm:text-sm transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Mobile Input */}
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      required
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none sm:text-sm transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none sm:text-sm transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none sm:text-sm transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150 cursor-pointer"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
