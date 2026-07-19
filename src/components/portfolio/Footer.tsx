import { Facebook, Instagram, Twitter, Linkedin, ArrowUp, MessageCircle } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-deeppurple text-white pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <a href="#" className="text-3xl font-bold tracking-tighter text-white mb-6 inline-block">
              IBRAHIM<span className="text-transparent bg-clip-text bg-gradient-to-r from-olive to-deeppurple">.</span>
            </a>
            <p className="text-lavender-light leading-relaxed max-w-md mb-8">
              Helping businesses build memorable brands through creative, modern, and professional graphic design solutions. Let's create something amazing together.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1DDduAqBWR/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-deeppurple-dark flex items-center justify-center hover:bg-olive-dark transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://wa.me/2348064292639" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-deeppurple-dark flex items-center justify-center hover:bg-green-500 transition-colors" title="WhatsApp">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4 text-lavender-light">
              <li><a href="#about" className="hover:text-olive transition-colors">About Me</a></li>
              <li><a href="#services" className="hover:text-olive transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-olive transition-colors">Portfolio</a></li>
              <li><a href="#contact" className="hover:text-olive transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Newsletter</h4>
            <p className="text-lavender-light mb-4">Subscribe to get the latest design news and updates.</p>
            <form action="https://formsubmit.co/adjim1990@gmail.com" method="POST" className="flex gap-2">
              <input type="hidden" name="_captcha" value="false" />
              <input 
                type="email" 
                name="email"
                required
                placeholder="Email address" 
                className="w-full bg-deeppurple-dark border-none rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-olive outline-none"
              />
              <button 
                type="submit" 
                className="bg-gradient-to-r from-olive to-deeppurple px-4 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-deeppurple-dark flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-olive text-sm">
            © {new Date().getFullYear()} Ibrahim Odetunde. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-deeppurple-dark flex items-center justify-center hover:bg-olive-dark transition-colors text-white"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
