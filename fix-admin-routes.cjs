const fs = require('fs');

// Update App.tsx
let appCode = fs.readFileSync('src/App.tsx', 'utf8');

appCode = appCode.replace(
  "import GenericAdmin from './components/admin/GenericAdmin';",
  `import GenericAdmin from './components/admin/GenericAdmin';
import TestimonialsAdmin from './components/admin/TestimonialsAdmin';
import AboutAdmin from './components/admin/AboutAdmin';`
);

appCode = appCode.replace(
  '<Route path="testimonials" element={<GenericAdmin title="Testimonials" />} />',
  '<Route path="testimonials" element={<TestimonialsAdmin />} />\n              <Route path="about" element={<AboutAdmin />} />'
);

fs.writeFileSync('src/App.tsx', appCode);

// Update AdminLayout.tsx
let layoutCode = fs.readFileSync('src/components/admin/AdminLayout.tsx', 'utf8');

layoutCode = layoutCode.replace(
  "import { LayoutDashboard, Image, Settings, LogOut, Briefcase, FileText, Star, MessageSquare } from 'lucide-react';",
  "import { LayoutDashboard, Image, Settings, LogOut, Briefcase, FileText, Star, MessageSquare, User } from 'lucide-react';"
);

layoutCode = layoutCode.replace(
  "{ name: 'Settings', path: '/admin/settings', icon: Settings },",
  "{ name: 'About', path: '/admin/about', icon: User },\n    { name: 'Settings', path: '/admin/settings', icon: Settings },"
);

fs.writeFileSync('src/components/admin/AdminLayout.tsx', layoutCode);

console.log("Updated Admin routes and layout");
