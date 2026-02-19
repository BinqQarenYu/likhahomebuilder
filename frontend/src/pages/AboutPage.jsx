import React from 'react';
import { Check, Users, Award, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  const values = [
    {
      icon: Award,
      title: 'Quality Craftsmanship',
      description: 'We deliver superior quality in every project, ensuring durability and excellence.',
    },
    {
      icon: Target,
      title: 'Customer Focus',
      description: 'Your dream home is our priority. We listen, understand, and deliver beyond expectations.',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Utilizing modern steel frame technology and sustainable building practices.',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our experienced architects and builders bring decades of combined expertise.',
    },
  ];

  const stats = [
    { number: '500+', label: 'Homes Built' },
    { number: '15+', label: 'Years Experience' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '50+', label: 'Team Members' },
  ];

  const milestones = [
    { year: '2009', event: 'Founded Likha Home Builders with a vision to revolutionize modular construction' },
    { year: '2012', event: 'Completed 100th project and expanded to steel frame construction' },
    { year: '2016', event: 'Awarded "Best Modular Home Builder" by Philippine Construction Association' },
    { year: '2020', event: 'Launched Airbnb-focused project designs, helping clients generate passive income' },
    { year: '2024', event: 'Reached 500+ completed homes and established as industry leader' },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-zinc-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6" style={{ color: '#C4D600' }}>
            Building Dreams Since 2009
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            At Likha Home Builders, we specialize in creating affordable, high-quality modular homes using advanced steel frame technology. Our mission is to make homeownership accessible while delivering exceptional craftsmanship.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-black mb-2" style={{ color: '#C4D600' }}>
                  {stat.number}
                </div>
                <div className="text-white text-lg font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8 text-center">
            Our Story
          </h2>
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p>
              Founded in 2009, Likha Home Builders emerged from a simple yet powerful vision: to make quality housing accessible to everyone. Our founder, architect Maria Santos, recognized that traditional construction methods were often expensive, time-consuming, and wasteful.
            </p>
            <p>
              With a background in sustainable architecture and a passion for innovation, we pioneered the use of steel frame modular construction in the Philippines. This approach not only reduces construction time by 50% but also delivers stronger, more durable homes at a fraction of the traditional cost.
            </p>
            <p>
              Today, we're proud to have built over 500 homes across the Philippines, helping families achieve their dream of homeownership. Our projects have evolved to include Airbnb-ready designs, enabling our clients to generate passive income while enjoying modern, comfortable living spaces.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="bg-zinc-900 border-zinc-800 hover:border-[#C4D600] transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#C4D600' }}>
                      <Icon className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-3">{value.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-12 text-center">
            Our Journey
          </h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center border-4" style={{ borderColor: '#C4D600', backgroundColor: '#000' }}>
                    <span className="text-xl font-black" style={{ color: '#C4D600' }}>
                      {milestone.year}
                    </span>
                  </div>
                </div>
                <div className="flex-1 pt-4">
                  <p className="text-white text-lg leading-relaxed">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8 text-center">
            Why Choose Likha Home Builders?
          </h2>
          <div className="space-y-4">
            {[
              'Proven track record with 500+ successful projects',
              'Advanced steel frame technology for stronger, longer-lasting homes',
              'Cost-effective solutions without compromising quality',
              'Fast construction timelines (50% faster than traditional methods)',
              'Complete project packages with architectural plans and material lists',
              'Specialized Airbnb-ready designs for investment properties',
              'Expert team of licensed architects and experienced builders',
              'Comprehensive after-sales support and warranty',
              'Sustainable building practices with minimal environmental impact',
              'Flexible designs that can be customized to your needs',
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <Check className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#C4D600' }} />
                <p className="text-lg text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Meet Our Leadership
          </h2>
          <p className="text-gray-300 text-lg mb-12 max-w-3xl mx-auto">
            Our leadership team brings together decades of experience in architecture, construction, and real estate development.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Maria Santos', role: 'Founder & CEO', description: 'Licensed Architect with 20+ years experience' },
              { name: 'Juan Dela Cruz', role: 'Chief Operating Officer', description: 'Expert in modular construction and project management' },
              { name: 'Ana Rodriguez', role: 'Head of Design', description: 'Specializing in sustainable and innovative home designs' },
            ].map((member, index) => (
              <Card key={index} className="bg-black border-zinc-800">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4" style={{ backgroundColor: '#C4D600' }}></div>
                  <h3 className="text-white font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-[#C4D600] font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;