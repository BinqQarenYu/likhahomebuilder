import React, { useState } from 'react';
import { Check, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { Card, CardContent } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      emoji: '🔹',
      title: '1 - A-Frame Chalet (40m²)',
      description: 'Iconic design that attracts guests and enhances the property.',
      image: 'https://images.unsplash.com/photo-1758983065414-0dcda592dcb2',
    },
    {
      id: 2,
      emoji: '🔹',
      title: '2 - Minimalist Loft (38m²)',
      description: 'Modern and functional style, perfect for urban or rural land.',
      image: 'https://images.unsplash.com/photo-1542020405763-3895c2338c91',
    },
    {
      id: 3,
      emoji: '🔹',
      title: '3 - Compact Cabin (18m²)',
      description: 'Small in size, huge in return — ideal for quick rentals.',
      image: 'https://images.unsplash.com/photo-1712924833046-1c54abac2840',
    },
    {
      id: 4,
      emoji: '🔹',
      title: '4 - Modular House (27m²)',
      description: 'Versatile and affordable project with great appeal on Airbnb.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    },
  ];

  const bonuses = [
    {
      id: 1,
      title: 'Bonus #1',
      subtitle: 'Construction checklists and supplier suggestions',
      image: 'https://images.unsplash.com/photo-1744235558674-89a6ed881268',
      originalPrice: '65,00',
    },
    {
      id: 2,
      title: 'Bonus #2',
      subtitle: 'Quick Guide to Steel Frame Execution',
      image: 'https://images.pexels.com/photos/4312841/pexels-photo-4312841.jpeg',
      originalPrice: '65,00',
    },
    {
      id: 3,
      title: 'Bonus #3',
      subtitle: 'List of Recommended Tools and Suppliers',
      image: 'https://images.unsplash.com/photo-1744235558674-89a6ed881268',
      originalPrice: '65,00',
    },
  ];

  const whatsIncluded = [
    'Complete list of materials (with a focus on economy)',
    'Optimized cutting plans with measurements',
    'Step-by-step assembly notebook',
    'Realistic 3D photos of all projects',
    'Architectural projects in PDF and DWG',
  ];

  const whyPerfect = [
    { icon: '📉', text: 'Low cost of execution – without sacrificing quality' },
    { icon: '🏗️', text: 'Optimized designs for fast construction' },
    { icon: '💰', text: 'Full focus on generating passive income with Airbnb' },
    { icon: '💼', text: 'Ideal for beginners or experienced investors' },
    { icon: '🧱', text: 'Developed by an architect with experience in real and profitable projects' },
  ];

  const faqs = [
    {
      question: 'HOW DO I ACCESS THE PRODUCT AFTER PURCHASE?',
      answer: 'Immediately after payment approval, a link to access the download platform will be sent to your registered email.',
    },
    {
      question: 'HOW LONG WILL I HAVE FREE ACCESS?',
      answer: 'You will have one year of access to the platform.',
    },
    {
      question: 'IS THIS PROJECT EASY TO EXECUTE?',
      answer: 'YES DIY Level: ALL LEVELS',
    },
  ];

  const handlePurchase = async () => {
    // For now, show alert - can be replaced with actual purchase flow later
    toast({
      title: 'Purchase Inquiry',
      description: 'Please contact us or fill out the contact form to proceed with your purchase.',
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-12 pb-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight" style={{ color: '#C4D600' }}>
            Download the 4 Most Profitable Steel Frame Modular Home Projects in the World Now
          </h1>
          
          <div className="mb-8 rounded-2xl overflow-hidden max-w-4xl mx-auto">
            <img
              src="https://images.unsplash.com/photo-1622683258861-fb6ff0e13054"
              alt="Modular Homes"
              className="w-full h-auto object-cover"
            />
          </div>

          <h2 className="text-xl md:text-2xl text-white mb-12 max-w-4xl mx-auto leading-relaxed">
            Start generating passive income with Airbnb this month — with ready-made, easy-to-execute projects that fit your budget.
          </h2>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-black border-2 border-white rounded-3xl overflow-hidden">
            <CardContent className="p-8 text-center">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                Combo 4 Complete Projects
              </h3>
              <p className="text-white text-sm mb-6 uppercase tracking-wider">
                OPPORTUNITY FOR A LIMITED TIME
              </p>
              
              <div className="mb-6">
                <div className="inline-block border-2 rounded-xl px-6 py-3" style={{ borderColor: '#C4D600' }}>
                  <p className="text-white line-through text-xl mb-1">U$ 97,00</p>
                  <p className="text-5xl md:text-6xl font-black" style={{ color: '#C4D600' }}>
                    $19,90
                  </p>
                </div>
              </div>

              <p className="text-white text-lg mb-8 uppercase font-semibold">
                LESS THAN U$ 5 EACH PROJECT
              </p>

              <Button
                onClick={handlePurchase}
                className="w-full text-xl py-6 font-bold rounded-full transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#C4D600', color: '#000' }}
              >
                YES, I WANT TO TAKE ADVANTAGE NOW
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What You Will Receive */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ✅ What You Will Receive:
            </h2>
            <p className="text-gray-300 text-lg max-w-4xl mx-auto">
              When you buy today, you get four projects ready for immediate construction, with a total focus on low costs, fast execution, and high profitability for rental on platforms like Airbnb.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12" style={{ color: '#C4D600' }}>
            The 4 Projects Included in the Package:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="bg-black border-2 border-white rounded-3xl overflow-hidden hover:border-[#C4D600] transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-0">
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: '#C4D600' }}>
                      {project.emoji} {project.title}
                    </h3>
                    <p className="text-white text-base mb-6">{project.description}</p>
                  </div>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-white">
            What's Included in Each Project
          </h2>
          <div className="space-y-4">
            {whatsIncluded.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <Check className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#C4D600' }} />
                <p className="text-lg text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Perfect */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-white">
            Why Is This Package Perfect For You?
          </h2>
          <div className="space-y-4">
            {whyPerfect.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <p className="text-lg text-white">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonuses Section */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4" style={{ color: '#C4D600' }}>
            🎁 EXCLUSIVE BONUSES FOR PEOPLE TO BUY TODAY:
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {bonuses.map((bonus) => (
              <Card key={bonus.id} className="bg-black border-2 border-white rounded-3xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={bonus.image}
                      alt={bonus.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-black mb-2" style={{ color: '#C4D600' }}>
                      {bonus.title}
                    </h3>
                    <p className="text-white text-base mb-4">{bonus.subtitle}</p>
                    <p className="text-gray-400 text-sm">
                      ( U$ <span className="line-through">{bonus.originalPrice}</span> por U$ 0,00 )
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-xl text-white font-semibold">Bonus Value:</p>
            <p className="text-2xl text-gray-400">
              ( De U$ <span className="line-through">197</span> por U$ 0,00 )
            </p>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-red-900/30 border-2 border-red-500 rounded-3xl p-8 mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-red-500 mb-4">
              ⚠️ This offer is ending!
            </h2>
            <p className="text-xl text-white mb-3">
              We only release a limited number of downloads of this project per month.
            </p>
            <p className="text-xl text-white">
              ✅ This means that download slots may sell out at any time. Additionally, this special promotion and the 3 exclusive bonuses will only be available for a limited time.
            </p>
          </div>

          <div className="mb-8">
            <img
              src="https://images.pexels.com/photos/12610487/pexels-photo-12610487.jpeg"
              alt="Limited Offer"
              className="w-full h-64 object-cover rounded-2xl"
            />
          </div>

          <Card className="bg-black border-2 border-white rounded-3xl overflow-hidden mb-8">
            <CardContent className="p-8 text-center">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                Combo 4 Complete Projects
              </h3>
              <p className="text-white text-sm mb-6 uppercase tracking-wider">
                OPPORTUNITY FOR A LIMITED TIME
              </p>
              
              <div className="mb-6">
                <div className="inline-block border-2 rounded-xl px-6 py-3" style={{ borderColor: '#C4D600' }}>
                  <p className="text-white line-through text-xl mb-1">U$ 97,00</p>
                  <p className="text-5xl md:text-6xl font-black" style={{ color: '#C4D600' }}>
                    $19,90
                  </p>
                </div>
              </div>

              <p className="text-white text-lg mb-4 uppercase font-semibold">
                LESS THAN U$ 5 EACH PROJECT
              </p>

              <p className="text-sm text-gray-400 mb-8">
                [ This offer is for a limited time only, AT ANY TIME THE PRICE WILL RETURN TO U$ 97.00 ]
              </p>

              <Button
                onClick={handlePurchase}
                className="w-full text-xl py-6 font-bold rounded-full mb-6 transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#C4D600', color: '#000' }}
              >
                YES, I WANT TO TAKE ADVANTAGE NOW
              </Button>

              <div className="space-y-2 text-left">
                <p className="text-white flex items-center gap-2">
                  <span>👉</span> Immediate access after payment
                </p>
                <p className="text-white flex items-center gap-2">
                  <span>📥</span> Files ready for download
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mb-8">
            <img
              src="https://via.placeholder.com/300x60/000000/FFFFFF?text=Secure+Payment"
              alt="Payment Methods"
              className="mx-auto h-16 object-contain"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-white">
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-black border-2 border-white rounded-2xl px-6 data-[state=open]:border-[#C4D600]"
              >
                <AccordionTrigger className="text-left text-lg font-bold text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <Button
              onClick={handlePurchase}
              className="text-xl py-6 px-12 font-bold rounded-full transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#C4D600', color: '#000' }}
            >
              <Download className="mr-2" />
              DOWNLOAD THIS PROJECT
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h3 className="text-xl font-bold text-red-500">PIRACY IS A CRIME</h3>
          <p className="text-sm text-gray-400">
            The sale of these projects may only be made through this website, registered in the name of LIKHA HOME BUILDERS. Any other site where you find this program is FAKE and against the law. Avoid counterfeiting and reject illegal or pirated content.
          </p>
          <p className="text-sm text-gray-500">
            Copyright 2024 – LIKHA HOME BUILDERS ®
          </p>
          <p className="text-sm text-gray-500">All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;