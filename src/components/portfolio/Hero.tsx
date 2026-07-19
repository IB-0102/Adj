import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center pt-20 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-lavender/50 rounded-full blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-lavender/50 rounded-full blur-3xl opacity-50 transform -translate-x-1/2 translate-y-1/4"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="text-olive font-medium tracking-widest uppercase mb-4 text-sm">
              Creative Graphic Designer
            </h2>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-deeppurple mb-6">
              Hi, I'm Ibrahim Odetunde.
            </h1>
            <p className="text-lg sm:text-xl text-olive mb-10 leading-relaxed">
              I create powerful visual designs that help businesses build strong brands, attract customers, and stand out from the competition.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/2348064292639"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-olive to-deeppurple text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-olive/25"
              >
                Hire Me
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ivory text-deeppurple border border-lavender font-medium hover:bg-ivory-dark transition-colors shadow-sm"
              >
                View Portfolio
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-80 sm:w-[300px] sm:h-[400px] lg:w-[400px] lg:h-[550px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-olive to-deeppurple rounded-[2rem] blur-2xl opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 rounded-[2rem] bg-ivory shadow-2xl overflow-hidden border-4 border-white">
                <img 
                  src="https://i.ibb.co/BHrDWFBs/file-000000005cd0620ab922dd61154b19d6.jpg" 
                  alt="Ibrahim Odetunde"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
