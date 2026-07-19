const fs = require('fs');
let code = fs.readFileSync('src/components/portfolio/Navbar.tsx', 'utf8');

// Add User icon import
code = code.replace(
  "import { Menu, X } from 'lucide-react';",
  "import { Menu, X, User } from 'lucide-react';"
);

// Replace desktop admin link
code = code.replace(
  /<Link\s+to="\/admin\/login"[\s\S]*?>\s*Admin\s*<\/Link>/,
  `<Link
              to="/admin/login"
              className="p-2 text-olive-dark border border-lavender rounded-full hover:bg-lavender-light transition-colors"
              title="Admin Login"
            >
              <User className="w-5 h-5" />
            </Link>`
);

// Replace mobile admin link
code = code.replace(
  /<Link\s+to="\/admin\/login"[\s\S]*?>\s*Admin Login\s*<\/Link>/,
  `<Link
              to="/admin/login"
              className="flex items-center gap-2 text-base font-medium text-olive-dark"
            >
              <User className="w-5 h-5" /> Admin
            </Link>`
);

// Wait, the user specifically said: "replace the ADMIN with it's icon on the website and remove the word ADMIN". 
// I should remove "Admin" from the mobile link too.
code = code.replace(
  /<User className="w-5 h-5" \/> Admin/,
  `<User className="w-5 h-5" />`
);

fs.writeFileSync('src/components/portfolio/Navbar.tsx', code);
console.log("Updated Navbar");
