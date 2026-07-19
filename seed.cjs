const fs = require('fs');
const dbPath = 'local-db.json';

const initialProjects = [
  {
    "id": 1000000000001,
    "title": "Neon Dreams Branding",
    "slug": "neon-dreams-branding",
    "description": "A vibrant, multicolor brand identity designed for a modern creative agency.",
    "content": "This project involved creating a full visual identity system, including a dynamic logo, color palette, typography, and marketing materials. The goal was to stand out with bold, fluorescent colors.",
    "featuredImage": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    "category": "Brand Identity",
    "clientName": "Neon Dreams Agency",
    "projectUrl": "",
    "completionDate": "2023-10-15"
  },
  {
    "id": 1000000000002,
    "title": "Fintech App UI/UX",
    "slug": "fintech-app-ui",
    "description": "Sleek and colorful mobile application interface for a modern financial platform.",
    "content": "Designed the user experience and user interface for a new fintech mobile application. Focused on usability, accessibility, and an engaging visual language featuring custom colorful illustrations.",
    "featuredImage": "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
    "category": "UI/UX Design",
    "clientName": "Global Finance Tech",
    "projectUrl": "",
    "completionDate": "2023-12-01"
  },
  {
    "id": 1000000000003,
    "title": "Summer Festival Poster",
    "slug": "summer-festival-poster",
    "description": "High-energy, multicolor poster design for an electronic music festival.",
    "content": "Created promotional materials for an outdoor music festival. The design uses vibrant gradients, bold typography, and abstract shapes to capture the energy of the event.",
    "featuredImage": "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
    "category": "Print Design",
    "clientName": "Sunset Events",
    "projectUrl": "",
    "completionDate": "2024-02-20"
  },
  {
    "id": 1000000000004,
    "title": "Geometric Logo Collection",
    "slug": "geometric-logo-collection",
    "description": "A series of colorful, geometric logo marks designed for various tech startups.",
    "content": "A showcase of logomarks created over the past year. Each design focuses on simplicity, scalability, and distinct multicolor palettes to create memorable brand signatures.",
    "featuredImage": "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
    "category": "Logo Design",
    "clientName": "Various Startups",
    "projectUrl": "",
    "completionDate": "2024-03-10"
  },
  {
    "id": 1000000000005,
    "title": "Abstract 3D Graphics",
    "slug": "abstract-3d-graphics",
    "description": "Set of 3D rendered abstract compositions used for web backgrounds and marketing.",
    "content": "Exploration of 3D forms, lighting, and vibrant materials. These graphics were licensed for use in a global software company's marketing campaign.",
    "featuredImage": "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop",
    "category": "3D Illustration",
    "clientName": "TechCorp Inc.",
    "projectUrl": "",
    "completionDate": "2024-05-05"
  },
  {
    "id": 1000000000006,
    "title": "Social Media Campaign",
    "slug": "social-media-campaign",
    "description": "Vibrant and engaging social media post designs for a lifestyle brand.",
    "content": "Developed a comprehensive social media template system. The designs utilize striking color combinations and modern typography to increase engagement and brand awareness across platforms.",
    "featuredImage": "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop",
    "category": "Social Media",
    "clientName": "Lifestyle Co.",
    "projectUrl": "",
    "completionDate": "2024-06-15"
  }
];

let db = { projects: [], services: [], skills: [], testimonials: [], messages: [] };
if (fs.existsSync(dbPath)) {
  try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  } catch(e) {}
}

// Check if we need to replace or add
db.projects = initialProjects;

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log("Seeded database");
