import { motion } from 'motion/react';
import { Award, Users, CheckCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function About() {
  const stats = [
    { label: 'Years Experience', value: '5+', icon: Award },
    { label: 'Projects Completed', value: '250+', icon: CheckCircle },
    { label: 'Happy Clients', value: '100+', icon: Users },
  ];

  const { data: aboutData } = useQuery({
    queryKey: ['public-about'],
    queryFn: async () => {
      const res = await axios.get('/api/about');
      return res.data;
    }
  });

  return (
    <section id="about" className="py-24 bg-ivory-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1626544827763-d516dce335e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Graphic Design Process" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-deeppurple mb-6">
              {aboutData?.title || 'About Me'}
            </h2>
            <div className="space-y-6 text-lg text-olive leading-relaxed mb-10 whitespace-pre-wrap">
              {aboutData?.content || 'I am a passionate graphic designer dedicated to helping businesses communicate effectively through creative visual design.'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-ivory p-6 rounded-2xl shadow-sm border border-lavender-light text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-lavender-light text-olive-dark mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-deeppurple mb-1">{stat.value}</div>
                    <div className="text-sm font-medium text-olive">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
