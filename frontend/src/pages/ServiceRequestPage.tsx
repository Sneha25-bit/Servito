import React, { useState } from 'react';
import axios from 'axios';
import {
  Menu, X, User, Mail, Phone, MapPin, CheckCircle, Wrench, Home, Paintbrush, Zap
} from 'lucide-react';
import Footer from '../components/Footer';
import Header from '@/components/Header';


export default function ServiceRequestPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    address: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async () => {
  if (Object.values(formData).every((field) => field.trim() !== '')) {
    try {
      // Send data to backend
      const response = await axios.post('http://localhost:5000/api/requests', formData);
      alert(' Your request has been submitted successfully!');


      console.log('Request submitted successfully:', response.data);

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceType: '',
          address: '',
          description: ''
        });
      }, 8080);
    } catch (err) {
      console.error(' Error submitting request:', err);
      alert('Something went wrong! Please try again.');
    }
  } else {
    alert('Please fill all the fields before submitting.');
  }
};

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Poppins:wght@300;400;500;600&display=swap');
        
        .brand-title {
          font-family: 'Playfair Display', serif;
          letter-spacing: 2px;
        }
        
        .elegant-text {
          font-family: 'Poppins', sans-serif;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .input-elegant {
          transition: all 0.3s ease;
        }

        .input-elegant:focus {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(14, 165, 233, 0.25); /* blue-teal glow */
        }

        .blue-gradient {
          background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #22d3ee 100%);
        }
      `}</style>

      <Header />

      <main className="flex-grow pt-24">
        {activeSection === 'home' && (
          <section className="max-w-6xl mx-auto px-4 py-12">
            {/* Service Categories */}
            <div className="mb-12 text-center">
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {[
                  { icon: <Home size={32} className="text-white" />, label: 'Home Services', gradient: 'from-sky-500 to-cyan-600' },
                  { icon: <Zap size={32} className="text-white" />, label: 'Electrical', gradient: 'from-cyan-500 to-blue-600' },
                  { icon: <Paintbrush size={32} className="text-white" />, label: 'Painting', gradient: 'from-blue-500 to-sky-600' },
                  { icon: <Wrench size={32} className="text-white" />, label: 'Repairs', gradient: 'from-sky-600 to-indigo-600' },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="glass-effect rounded-2xl p-6 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1"
                  >
                    <div className={`bg-gradient-to-br ${service.gradient} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                      {service.icon}
                    </div>
                    <p className="elegant-text font-medium text-gray-700">{service.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Request Form */}
            <div className="glass-effect rounded-3xl shadow-2xl p-10 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-5xl font-bold brand-title bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent mb-3">
                  Request a Service
                </h2>
                <p className="elegant-text text-gray-600 text-lg">
                  Tell us what you need, and we'll connect you with the best professionals
                </p>
              </div>

              {submitted && (
                <div className="bg-gradient-to-r from-teal-400 to-emerald-500 text-white px-6 py-4 rounded-2xl mb-8 flex items-center shadow-lg">
                  <CheckCircle className="mr-3" size={24} />
                  <span className="elegant-text font-medium">Request submitted successfully! We will contact you soon.</span>
                </div>
              )}

              <div className="space-y-6 elegant-text">
                {[
                  { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Enter your full name' },
                  { label: 'Email Address', name: 'email', type: 'email', placeholder: 'your@email.com' },
                  { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '(123) 456-7890' },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-gray-700 font-semibold mb-3 text-lg">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={(formData as any)[field.name]}
                      onChange={handleInputChange}
                      className="input-elegant w-full px-6 py-4 border-2 border-sky-200 rounded-2xl focus:outline-none focus:border-sky-500 bg-white"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-gray-700 font-semibold mb-3 text-lg">Service Type</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="input-elegant w-full px-6 py-4 border-2 border-sky-200 rounded-2xl focus:outline-none focus:border-sky-500 bg-white"
                  >
                    <option value="">Select a service</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="painting">Painting</option>
                    <option value="hvac">HVAC</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-3 text-lg">Service Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="input-elegant w-full px-6 py-4 border-2 border-sky-200 rounded-2xl focus:outline-none focus:border-sky-500 bg-white"
                    placeholder="Enter service location"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-3 text-lg">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                    className="input-elegant w-full px-6 py-4 border-2 border-sky-200 rounded-2xl focus:outline-none focus:border-sky-500 bg-white resize-none"
                    placeholder="Describe the service you need in detail..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-sky-600 to-cyan-500 text-white py-5 rounded-2xl font-semibold text-lg hover:from-sky-700 hover:to-cyan-600 transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
