const fs = require('fs');
let code = fs.readFileSync('src/components/portfolio/Footer.tsx', 'utf8');

// Replace Social Links
code = code.replace(
  /<div className="flex gap-4">([\s\S]*?)<\/div>/,
  `<div className="flex gap-4">
              <a href="https://www.facebook.com/share/1DDduAqBWR/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-deeppurple-dark flex items-center justify-center hover:bg-olive-dark transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://wa.me/2348064292639" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-deeppurple-dark flex items-center justify-center hover:bg-green-500 transition-colors" title="WhatsApp">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>`
);

// Update Newsletter form
code = code.replace(
  /<form className="flex gap-2">([\s\S]*?)<\/form>/,
  `<form action="https://formsubmit.co/adjim1990@gmail.com" method="POST" className="flex gap-2">
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
            </form>`
);

fs.writeFileSync('src/components/portfolio/Footer.tsx', code);
console.log("Updated Footer");
