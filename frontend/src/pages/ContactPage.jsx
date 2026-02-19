import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    try {
      await axios.post(`${API}/contact`, formData);
      
      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We will get back to you soon.',
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      const message = error.response?.data?.detail || 'Failed to send message. Please try again.';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office Address',
      content: '123 Construction Ave, Building District, Manila 1234, Philippines',
      link: 'https://maps.google.com',
    },
    {
      icon: Phone,
      title: 'Phone Number',
      content: '+63 (2) 8123-4567',
      link: 'tel:+6328123456',
    },
    {
      icon: Mail,
      title: 'Email Address',
      content: 'info@likhahomebuilders.com',
      link: 'mailto:info@likhahomebuilders.com',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM',
      link: null,
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-zinc-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6" style={{ color: '#C4D600' }}>
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions about our modular home projects? We're here to help you build your dream home.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="bg-zinc-900 border-zinc-800 hover:border-[#C4D600] transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#C4D600' }}>
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-white font-bold mb-2">{info.title}</h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-gray-400 text-sm hover:text-[#C4D600] transition-colors whitespace-pre-line"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-gray-400 text-sm whitespace-pre-line">{info.content}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <Card className="bg-zinc-900 border-2 border-zinc-800">
              <CardContent className="p-8">
                <h2 className="text-3xl font-black text-white mb-6 text-center">
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-white text-sm font-semibold mb-2 block">
                        Full Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="bg-black border-zinc-700 text-white"
                        disabled={loading}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="text-white text-sm font-semibold mb-2 block">
                        Email Address *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="bg-black border-zinc-700 text-white"
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-white text-sm font-semibold mb-2 block">
                        Phone Number
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+63 912 345 6789"
                        className="bg-black border-zinc-700 text-white"
                        disabled={loading}
                      />
                    </div>
                    
                    <div>
                      <label className="text-white text-sm font-semibold mb-2 block">
                        Subject *
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project Inquiry"
                        className="bg-black border-zinc-700 text-white"
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white text-sm font-semibold mb-2 block">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project requirements..."
                      rows={6}
                      className="bg-black border-zinc-700 text-white resize-none"
                      disabled={loading}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full py-6 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: '#C4D600', color: '#000' }}
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-8 text-center">
            Visit Our Office
          </h2>
          <div className="rounded-2xl overflow-hidden border-2 border-zinc-800 h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.64284894427!2d120.86974535!3d14.599511999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca03571ec38b%3A0x69d1d5751069c11f!2sManila%2C%20Metro%20Manila%2C%20Philippines!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;