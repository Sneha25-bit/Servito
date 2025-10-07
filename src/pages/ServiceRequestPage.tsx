import React, { useState } from 'react';
import { Menu, X, User, Mail, Phone, MapPin, CheckCircle, Wrench, Home, Paintbrush, Zap } from 'lucide-react';

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.phone && formData.serviceType && formData.address && formData.description) {
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
      }, 3000);
    }
  };

  const scrollToSection = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
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
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.15);
        }
        
        .hero-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        }
      `}</style>

      <header className="hero-gradient text-white shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <Wrench size={32} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold brand-title">Sevrito</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8 elegant-text">
              <button onClick={() => scrollToSection('home')} className="hover:text-purple-200 transition font-medium">Home</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-purple-200 transition font-medium">About Us</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-purple-200 transition font-medium">Contact Us</button>
              <button onClick={() => scrollToSection('profile')} className="hover:text-purple-200 transition font-medium">Profile</button>
            </nav>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden bg-white bg-opacity-20 p-2 rounded-lg">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {menuOpen && (
            <nav className="md:hidden mt-4 flex flex-col space-y-3 elegant-text">
              <button onClick={() => scrollToSection('home')} className="text-left py-2 hover:text-purple-200 font-medium">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-left py-2 hover:text-purple-200 font-medium">About Us</button>
              <button onClick={() => scrollToSection('contact')} className="text-left py-2 hover:text-purple-200 font-medium">Contact Us</button>
              <button onClick={() => scrollToSection('profile')} className="text-left py-2 hover:text-purple-200 font-medium">Profile</button>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-grow">
        {activeSection === 'home' && (
          <section className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-12 text-center">
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="glass-effect rounded-2xl p-6 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Home size={32} className="text-white" />
                  </div>
                  <p className="elegant-text font-medium text-gray-700">Home Services</p>
                </div>
                <div className="glass-effect rounded-2xl p-6 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Zap size={32} className="text-white" />
                  </div>
                  <p className="elegant-text font-medium text-gray-700">Electrical</p>
                </div>
                <div className="glass-effect rounded-2xl p-6 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
                  <div className="bg-gradient-to-br from-pink-500 to-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Paintbrush size={32} className="text-white" />
                  </div>
                  <p className="elegant-text font-medium text-gray-700">Painting</p>
                </div>
                <div className="glass-effect rounded-2xl p-6 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Wrench size={32} className="text-white" />
                  </div>
                  <p className="elegant-text font-medium text-gray-700">Repairs</p>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-3xl shadow-2xl p-10 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-5xl font-bold brand-title bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">Request a Service</h2>
                <p className="elegant-text text-gray-600 text-lg">Tell us what you need, and we'll connect you with the best professionals</p>
              </div>

              {submitted && (
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-4 rounded-2xl mb-8 flex items-center shadow-lg">
                  <CheckCircle className="mr-3" size={24} />
                  <span className="elegant-text font-medium">Request submitted successfully! We will contact you soon.</span>
                </div>
              )}

              <div className="space-y-6 elegant-text">
                <div>
                  <label className="block text-gray-700 font-semibold mb-3 text-lg">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-elegant w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-500 bg-white"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-3 text-lg">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-elegant w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-500 bg-white"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-3 text-lg">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-elegant w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-500 bg-white"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-3 text-lg">Service Type</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="input-elegant w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-500 bg-white"
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
                    className="input-elegant w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-500 bg-white"
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
                    className="input-elegant w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-500 bg-white resize-none"
                    placeholder="Describe the service you need in detail..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-5 rounded-2xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="max-w-5xl mx-auto px-4 py-12">
            <div className="glass-effect rounded-3xl shadow-2xl p-10">
              <h2 className="text-5xl font-bold brand-title bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 text-center">About Us</h2>
              <div className="space-y-6 text-gray-700 elegant-text text-lg">
                <p className="leading-relaxed">
                  Welcome to Sevrito, your trusted partner for all home and business service needs. We connect you with qualified, experienced professionals who are ready to help with any task.
                </p>
                <p className="leading-relaxed">
                  With over 10 years of experience in the industry, we have built a network of reliable professionals who are committed to delivering quality service every time. Our mission is to make finding and booking services simple, fast, and stress-free.
                </p>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl">
                    <div className="text-5xl font-bold brand-title text-purple-600 mb-2">500+</div>
                    <div className="text-gray-700 font-medium">Qualified Servicemen</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-pink-100 to-orange-100 rounded-2xl">
                    <div className="text-5xl font-bold brand-title text-pink-600 mb-2">10K+</div>
                    <div className="text-gray-700 font-medium">Jobs Completed</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl">
                    <div className="text-5xl font-bold brand-title text-orange-600 mb-2">98%</div>
                    <div className="text-gray-700 font-medium">Customer Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'contact' && (
          <section className="max-w-5xl mx-auto px-4 py-12">
            <div className="glass-effect rounded-3xl shadow-2xl p-10">
              <h2 className="text-5xl font-bold brand-title bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 text-center">Contact Us</h2>
              <div className="grid md:grid-cols-2 gap-10 elegant-text">
                <div className="space-y-8">
                  <div className="flex items-start bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                    <Phone className="text-purple-600 mt-1 mr-4" size={28} />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2 text-xl">Phone</h3>
                      <p className="text-gray-600 text-lg">+1 (555) 123-4567</p>
                      <p className="text-gray-600">Mon-Fri: 8AM - 8PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-gradient-to-br from-pink-50 to-orange-50 p-6 rounded-2xl">
                    <Mail className="text-pink-600 mt-1 mr-4" size={28} />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2 text-xl">Email</h3>
                      <p className="text-gray-600 text-lg">support@sevrito.com</p>
                      <p className="text-gray-600">info@sevrito.com</p>
                    </div>
                  </div>

                  <div className="flex items-start bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl">
                    <MapPin className="text-orange-600 mt-1 mr-4" size={28} />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2 text-xl">Address</h3>
                      <p className="text-gray-600 text-lg">123 Service Street</p>
                      <p className="text-gray-600">New York, NY 10001</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-2xl">
                  <h3 className="font-semibold text-gray-800 mb-6 text-2xl brand-title">Business Hours</h3>
                  <div className="space-y-4 text-gray-700 text-lg">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-semibold">8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-semibold">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-semibold">10:00 AM - 4:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'profile' && (
          <section className="max-w-5xl mx-auto px-4 py-12">
            <div className="glass-effect rounded-3xl shadow-2xl p-10">
              <div className="flex items-center mb-10">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-8 mr-6 shadow-xl">
                  <User size={56} className="text-white" />
                </div>
                <div>
                  <h2 className="text-5xl font-bold brand-title bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">User Profile</h2>
                  <p className="elegant-text text-gray-600 text-lg mt-2">Manage your account information</p>
                </div>
              </div>

              <div className="space-y-8 elegant-text">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-3 text-lg">Full Name</label>
                    <div className="px-6 py-4 border-2 border-purple-200 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 text-gray-700 text-lg">
                      John Doe
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-3 text-lg">Email</label>
                    <div className="px-6 py-4 border-2 border-purple-200 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 text-gray-700 text-lg">
                      john.doe@example.com
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-3 text-lg">Phone</label>
                    <div className="px-6 py-4 border-2 border-purple-200 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 text-gray-700 text-lg">
                      +1 (555) 987-6543
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-3 text-lg">Member Since</label>
                    <div className="px-6 py-4 border-2 border-purple-200 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 text-gray-700 text-lg">
                      January 2024
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-200 rounded-2xl p-8">
                  <h3 className="font-bold text-gray-800 mb-6 text-2xl brand-title">Account Status</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-700 text-lg">Active Requests</span>
                    <span className="font-bold text-purple-600 text-3xl">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 text-lg">Completed Services</span>
                    <span className="font-bold text-purple-600 text-3xl">8</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12 elegant-text">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-3xl font-bold brand-title mb-4">Sevrito</h3>
              <p className="text-gray-300 leading-relaxed">Your trusted partner for all service needs. Quality work, every time.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-xl">Quick Links</h4>
              <div className="space-y-3">
                <button onClick={() => scrollToSection('home')} className="block text-gray-300 hover:text-white transition">Home</button>
                <button onClick={() => scrollToSection('about')} className="block text-gray-300 hover:text-white transition">About Us</button>
                <button onClick={() => scrollToSection('contact')} className="block text-gray-300 hover:text-white transition">Contact</button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-xl">Services</h4>
              <div className="space-y-2 text-gray-300">
                <p>Plumbing</p>
                <p>Electrical</p>
                <p>Carpentry</p>
                <p>HVAC</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-10 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Sevrito. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}