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
import Header from '../components/Header';
import Footer from '../components/Footer';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full aspect-[500/903] overflow-hidden group">
      <div
        className="flex transition-transform duration-500 ease-out w-full h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Slide ${i + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#C4D600] hover:text-black border-2 border-transparent z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#C4D600] hover:text-black border-2 border-transparent z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-5 left-0 right-0 px-4 z-10 flex flex-wrap justify-center gap-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-[#C4D600] scale-125' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Tell the Facebook SDK to look for and "wake up" the videos on the page
  React.useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  const projects = [
    {
      id: 1,
      emoji: '🔹',
      title: '1 - The Oasis of Autonomy',
      description: 'True luxury isn’t found in excess; it’s found in independence. Imagine a dwelling that doesn’t just sit on the land, but survives with it. Tucked behind the protective shadow of ancient boulders, this off-grid sanctuary is a testament to the harmony between brutal nature and refined engineering.',
      image: null,
      videoSrc: 'https://www.facebook.com/reel/1488990142658620/',
    },
    {
      id: 2,
      emoji: '🔹',
      title: '2 - The Tropical Pavilion',
      description: 'Expansive wrap-around decking extends the living area into the canopy, doubling the usable footprint of the home. An overhanging, angled roofline provides essential solar shading and efficient rainwater runoff, perfect for tropical climates.',
      image: null,
      videoSrc: 'https://www.facebook.com/reel/1801707910382021/',
    },
    {
      id: 3,
      emoji: '🔹',
      title: '3 - The Sanctuary in Stone',
      description: 'A modern retreat that rises from the earth, blending raw geological power with sophisticated minimalism. Strategically positioned to harness natural light while providing a fortress of tranquility, this design redefines the boundary between the wild and the refined.',
      image: null,
      videoSrc: 'https://www.facebook.com/reel/896609346553070/',
      link: 'https://www.facebook.com/reel/896609346553070',
    },
    {
      id: 4,
      emoji: '🔹',
      title: '4 - The Quiet Architecture',
      description: 'Living Architecture: A lush green roof that provides natural insulation and integrates the structure into the surrounding meadow. Transparent Living: Floor-to-ceiling glass walls that invite the landscape inside, making the mountains and fields a living part of the home.',
      image: null,
      videoSrc: 'https://www.facebook.com/reel/1831145384224834/',
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
      <Header />

      {/* Hero Section */}
      <section className="relative pt-12 pb-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight" style={{ color: '#C4D600' }}>
            Download the 4 Most Profitable Steel Frame Modular Home Projects in the World Now
          </h1>

          <div className="mb-8 rounded-2xl overflow-hidden max-w-[320px] mx-auto bg-black border-2 border-[#C4D600]">
            <ImageCarousel
              images={[
                '/carousel/122.jpg',
                '/carousel/123.jpg',
                '/carousel/124.jpg',
                '/carousel/126.jpg',
                '/carousel/126A.jpg',
                '/carousel/128A.jpg',
                '/carousel/128B.jpg',
                '/carousel/128D.jpg',
                '/carousel/129A.jpg',
                '/carousel/129C.jpg',
                '/carousel/130A.jpg',
                '/carousel/130B.jpg',
                '/carousel/130C.jpg',
                '/carousel/131A.jpg',
                '/carousel/131B.jpg',
                '/carousel/131C.jpg',
                '/carousel/132A.jpg',
                '/carousel/132B.jpg',
                '/carousel/file_1772370111389.jpg',
                '/carousel/file_1772370122487.jpg'
              ]}
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
                      {project.link ? (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">
                          <span>{project.emoji}</span> {project.title}
                        </a>
                      ) : (
                        <span className="flex items-center gap-2">
                          <span>{project.emoji}</span> {project.title}
                        </span>
                      )}
                    </h3>
                    <p className="text-white text-base mb-6 text-justify">{project.description}</p>
                  </div>
                  {project.images ? (
                    <div className="w-full bg-black rounded-b-3xl overflow-hidden relative">
                      <ImageCarousel images={project.images} />
                    </div>
                  ) : project.videoSrc ? (
                    <div className={`w-full aspect-[9/16] bg-black rounded-b-3xl overflow-hidden relative flex justify-center overflow-hidden ${[1, 2].includes(project.id) ? 'items-end' : 'items-center'}`}>
                      <div
                        className="fb-video"
                        data-href={project.videoSrc}
                        data-width="500"
                        data-show-text="false"
                        data-autoplay="false"
                        data-muted="true"
                        style={{
                          transform: 'scale(1.15)',
                          transformOrigin: [1, 2].includes(project.id) ? 'bottom center' : 'center'
                        }}>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full aspect-[9/16] bg-black rounded-b-3xl overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
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
      </section >

      {/* Why Perfect */}
      < section className="py-16 px-4" >
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
      </section >

      {/* Bonuses Section */}
      < section className="py-16 px-4 bg-zinc-900" >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4" style={{ color: '#C4D600' }}>
            🎁 EXCLUSIVE BONUSES FOR PEOPLE TO BUY TODAY:
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {bonuses.map((bonus) => (
              <Card key={bonus.id} className="bg-black border-2 border-white rounded-3xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    {/* ⚡ Bolt: Lazy load below-the-fold images */}
                    <img
                      src={bonus.image}
                      alt={bonus.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
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
      </section >

      {/* Urgency Section */}
      < section className="py-16 px-4" >
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
            {/* ⚡ Bolt: Lazy load below-the-fold images */}
            <img
              src="https://images.pexels.com/photos/12610487/pexels-photo-12610487.jpeg"
              alt="Limited Offer"
              className="w-full h-64 object-cover rounded-2xl"
              loading="lazy"
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
            {/* ⚡ Bolt: Lazy load below-the-fold images */}
            <img
              src="https://via.placeholder.com/300x60/000000/FFFFFF?text=Secure+Payment"
              alt="Payment Methods"
              className="mx-auto h-16 object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </section >

      {/* FAQ Section */}
      < section className="py-16 px-4 bg-zinc-900" >
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
      </section >

      <Footer />
    </div >
  );
};

export default HomePage;