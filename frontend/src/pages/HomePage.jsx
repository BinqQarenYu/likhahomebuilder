import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Check, Download, ChevronLeft, ChevronRight, Play, Maximize2, X } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';

const Footer = () => (
  <footer className="bg-black py-8 border-t border-zinc-800">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <p className="text-zinc-500 mb-2">© 2024 LIKHA HOME BUILDERS. All rights reserved.</p>
      <p className="text-zinc-600 text-sm">
        "Steel frame modular homes designed for the future."
      </p>
    </div>
  </footer>
);

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  React.useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [handleNext, isHovered]);

  return (
    <div
      className="relative w-full h-full aspect-[500/903] overflow-hidden group flex items-center justify-center bg-zinc-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative w-full h-full flex items-center justify-center perspective-1000">
        {images.map((img, index) => {
          // Calculate positions for Fan-shape effect
          const isCenter = index === currentIndex;
          const isLeft = index === (currentIndex - 1 + images.length) % images.length;
          const isRight = index === (currentIndex + 1) % images.length;

          let translateClass = "translate-x-full opacity-0 scale-75"; // Default hidden
          let zIndexClass = "z-0";

          if (isCenter) {
            translateClass = "translate-x-0 opacity-100 scale-100";
            zIndexClass = "z-30";
          } else if (isLeft) {
            translateClass = "-translate-x-32 opacity-60 scale-90";
            zIndexClass = "z-10";
          } else if (isRight) {
             translateClass = "translate-x-32 opacity-40 scale-85 -translate-y-4"; // Right on top, lower opacity
             zIndexClass = "z-20"; // Higher z-index than left so it appears 'on top' visually in some layouts, but below center
          }

          return (
            <div
              key={index}
              className={`absolute w-3/4 h-3/4 md:w-2/3 md:h-4/5 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-in-out ${translateClass} ${zIndexClass}`}
            >
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl"
                loading={index === 0 ? "eager" : "lazy"}
              />
              {/* Optional overlay for non-centered images to enhance focus */}
              {!isCenter && <div className="absolute inset-0 bg-black/30 pointer-events-none" />}
            </div>
          );
        })}
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-white transition-opacity z-40"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-white transition-opacity z-40"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {images.map((_, index) => (
           <button
             key={index}
             onClick={() => setCurrentIndex(index)}
             className={`w-2 h-2 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-white ${
               index === currentIndex ? 'bg-white' : 'bg-white/50'
             }`}
             aria-label={`Go to slide ${index + 1}`}
             aria-selected={index === currentIndex}
           />
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  const handlePurchase = () => {
    window.location.href = '#checkout';
  };

  const projects = [
    {
      id: 1,
      title: "Casa LIKHA V1.0 - 45m²",
      description: "1 Suite + 1 Bedroom, Balcony, Integrated Kitchen, Living Room. Ideal for small plots or as a guest house.",
      emoji: "🏡",
      images: [
        "https://images.pexels.com/photos/12610487/pexels-photo-12610487.jpeg",
        "https://images.pexels.com/photos/12610488/pexels-photo-12610488.jpeg",
        "https://images.pexels.com/photos/12610489/pexels-photo-12610489.jpeg"
      ]
    },
    {
      id: 2,
      title: "Casa LIKHA V2.0 - 75m²",
      description: "2 Suites, Large Living Area, Covered Garage, Service Area. Perfect balance of comfort and efficiency.",
      emoji: "🏘️",
      videoSrc: "https://www.facebook.com/reel/1586561168583485"
    },
    {
      id: 3,
      title: "Casa LIKHA V3.0 - 120m²",
      description: "3 Suites (1 Master with Closet), Home Office, Gourmet Area, Pool Deck. The ultimate family residence.",
      emoji: "🏠",
      image: "https://images.pexels.com/photos/12610490/pexels-photo-12610490.jpeg"
    },
    {
      id: 4,
      title: "LIKHA Studio - 30m²",
      description: "Open concept loft, perfect for Airbnb investments or minimalists. Smart storage and multi-functional spaces.",
      emoji: "✨",
      images: [
        "https://images.pexels.com/photos/12610491/pexels-photo-12610491.jpeg",
        "https://images.pexels.com/photos/12610492/pexels-photo-12610492.jpeg",
        "https://images.pexels.com/photos/12610493/pexels-photo-12610493.jpeg"
      ]
    }
  ];

  const whatsIncluded = [
    "Architectural Project (Floor plans, elevations, sections)",
    "Structural Project (Light Steel Frame sizing and detailing)",
    "Foundation Project (Optimized for LSF)",
    "Electrical & Plumbing Projects",
    "3D Renderings & Walkthrough Video",
    "Material Quantities List"
  ];

  const whyPerfect = [
    { icon: "⚡", text: "Fast Construction: Reduce build time by up to 50% compared to traditional methods." },
    { icon: "💰", text: "Cost Predictability: Highly accurate material lists prevent budget overruns." },
    { icon: "🌱", text: "Sustainable: Less waste, better thermal and acoustic insulation." },
    { icon: "🛠️", text: "Ready to Build: Hand these plans to any qualified LSF builder and start tomorrow." }
  ];

  const bonuses = [
    {
      id: 1,
      title: "Smart Home Guide",
      subtitle: "Complete guide on pre-wiring your home for automation.",
      originalPrice: "47",
      image: "https://images.pexels.com/photos/12610494/pexels-photo-12610494.jpeg"
    },
    {
      id: 2,
      title: "Interior Design Concepts",
      subtitle: "Moodboards and furniture layout suggestions for all rooms.",
      originalPrice: "97",
      image: "https://images.pexels.com/photos/12610495/pexels-photo-12610495.jpeg"
    },
    {
      id: 3,
      title: "Builder Vetting Checklist",
      subtitle: "Questions to ask before hiring your LSF contractor.",
      originalPrice: "53",
      image: "https://images.pexels.com/photos/12610496/pexels-photo-12610496.jpeg"
    }
  ];

  const faqs = [
    {
      question: "Can I modify the projects?",
      answer: "Yes, you receive the source files (DWG/RVT) so a local architect can make adjustments to fit your specific plot or local regulations."
    },
    {
      question: "Are these projects approved by my city?",
      answer: "No. You will need a local architect or engineer to sign off and submit the plans to your local municipality, as regulations vary by location."
    },
    {
      question: "Do you offer physical construction?",
      answer: "This package provides the digital blueprints. You will need to hire a local contractor specializing in Light Steel Framing to execute the build."
    }
  ];

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-[#C4D600] selection:text-black">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight" style={{ color: '#C4D600' }}>
            Download the 4 Most Profitable Steel Frame Modular Home Projects in the World Now
          </h1>

          <div className="flex justify-center mb-12">
            <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-1 inline-block transform hover:scale-105 transition-transform">
              <div className="bg-black rounded-xl p-8 border border-red-500/30">
                <div className="flex flex-col items-center gap-4">
                  <div className="inline-block border-2 border-red-500 rounded-xl px-6 py-3">
                    <p className="text-white line-through text-xl mb-1 text-center">U$ 97,00</p>
                    <p className="text-6xl font-black text-red-500">
                      $19,90
                    </p>
                  </div>
                  <Button
                    onClick={handlePurchase}
                    className="text-xl py-6 px-12 font-bold rounded-full w-full"
                    style={{ backgroundColor: '#C4D600', color: '#000' }}
                  >
                    YES, I WANT TO DOWNLOAD
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-white">
            Meet the projects:
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="bg-zinc-900 border-none rounded-3xl overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  <div className="p-8">
                    <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
                      {project.id === 2 ? (
                        <span className="flex items-center justify-between w-full">
                          <span><span>{project.emoji}</span> {project.title}</span>
                          <span className="flex items-center text-sm font-normal text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
                            <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
                            3D Video
                          </span>
                        </span>
                      ) : (
                        <span>
                          <span>{project.emoji}</span> {project.title}
                        </span>
                      )}
                    </h3>
                    <p className="text-white text-base mb-6 text-justify">{project.description}</p>
                  </div>
                  {project.images ? (
                    <div className="w-full bg-black rounded-b-3xl overflow-hidden relative h-[500px]">
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
