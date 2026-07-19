import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: testimonials = [] } = useQuery({
    queryKey: ['public-testimonials'],
    queryFn: async () => {
      const res = await axios.get('/api/testimonials');
      return res.data;
    }
  });

  if (testimonials.length === 0) return null;

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 bg-ivory-dark overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-deeppurple mb-4">Client Testimonials</h2>
          <p className="text-lg text-olive">
            Don't just take my word for it. Here's what my clients have to say.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 z-10">
            <button onClick={prev} className="p-3 bg-ivory rounded-full shadow-md text-lavender-light hover:text-olive-dark transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-10">
            <button onClick={next} className="p-3 bg-ivory rounded-full shadow-md text-lavender-light hover:text-olive-dark transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-hidden px-4 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-ivory rounded-3xl p-8 md:p-12 shadow-xl shadow-lavender/30 relative"
              >
                <Quote className="absolute top-8 left-8 w-12 h-12 text-lavender rotate-180" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="flex items-center gap-1 mb-6 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < testimonials[currentIndex].rating ? 'fill-current' : 'text-lavender'}`} />
                    ))}
                  </div>
                  
                  <p className="text-xl md:text-2xl text-olive font-medium leading-relaxed mb-8">
                    "{testimonials[currentIndex].review}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    {testimonials[currentIndex].clientPhoto ? (
                      <img 
                        src={testimonials[currentIndex].clientPhoto} 
                        alt={testimonials[currentIndex].clientName}
                        className="w-14 h-14 rounded-full object-cover border-2 border-lavender"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-olive to-deeppurple flex items-center justify-center text-white font-bold text-xl">
                        {testimonials[currentIndex].clientName.charAt(0)}
                      </div>
                    )}
                    <div className="text-left">
                      <h4 className="font-bold text-deeppurple">{testimonials[currentIndex].clientName}</h4>
                      {testimonials[currentIndex].company && (
                        <p className="text-sm text-olive">{testimonials[currentIndex].company}</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'bg-olive-dark w-8' : 'bg-lavender hover:bg-olive'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
