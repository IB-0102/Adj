import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Services from './Services';
import Projects from './Projects';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Portfolio() {
  return (
    <div className="bg-ivory min-h-screen text-deeppurple font-sans selection:bg-lavender selection:text-deeppurple">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      
      <a
        href="https://wa.me/2348064292639"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition-transform hover:scale-110 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        title="Chat with me on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
