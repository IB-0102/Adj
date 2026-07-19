import { motion } from 'motion/react';
import { Palette, Layers, Share2, FileImage, CreditCard, Presentation, Icon as LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fallbackServices = [
  { icon: 'Palette', title: 'Logo Design', description: 'Unique and memorable logos that represent your brand identity perfectly.' },
  { icon: 'Layers', title: 'Brand Identity', description: 'Comprehensive branding guidelines, color palettes, and typography.' },
  { icon: 'Share2', title: 'Social Media Designs', description: 'Engaging graphics customized for various social media platforms.' },
  { icon: 'FileImage', title: 'Flyers & Posters', description: 'Eye-catching promotional materials for events and marketing campaigns.' },
  { icon: 'CreditCard', title: 'Business Cards', description: 'Professional and premium business card designs that leave a mark.' },
  { icon: 'Presentation', title: 'Presentation Design', description: 'Clean and impactful presentation slides for corporate pitches.' },
];

export default function Services() {
  const { data: services = [] } = useQuery({
    queryKey: ['public-services'],
    queryFn: async () => {
      const res = await axios.get('/api/services');
      return res.data;
    }
  });

  const servicesList = Array.isArray(services) ? services : [];
  const displayServices = servicesList.length > 0 ? servicesList : fallbackServices;

  return (
    <section id="services" className="py-24 bg-ivory-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-deeppurple mb-4">My Services</h2>
          <p className="text-lg text-olive">
            Professional design solutions tailored to elevate your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service: any, idx: number) => {
            const Icon = (Icons as any)[service.icon] || Icons.Palette;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.1, 1) }}
                className="group bg-ivory p-8 rounded-2xl shadow-sm border border-lavender-light hover:shadow-xl hover:border-lavender transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-olive/10 to-deeppurple/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-lavender-light text-olive-dark rounded-xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-r group-hover:from-olive group-hover:to-deeppurple group-hover:text-white transition-colors duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-deeppurple mb-3">{service.title}</h3>
                  <p className="text-olive mb-6">{service.description}</p>
                  <a href="#contact" className="inline-flex items-center text-sm font-semibold text-olive-dark hover:text-deeppurple transition-colors">
                    Learn More <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
