const fs = require('fs');

const dbPath = 'local-db.json';
if (fs.existsSync(dbPath)) {
  let db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  // Remove project 1784205110116 (Logo 2)
  db.projects = db.projects.filter(p => p.id !== 1784205110116 && p.title !== "identity branding" && p.title !== "identity logo 2");
  
  // Add new project
  db.projects.push({
    id: Date.now(),
    title: "Captivating and attractive multicolor designs",
    slug: "multicolor-designs",
    description: "Captivating and attractive multicolor designs.",
    content: "A collection of captivating and attractive multicolor designs created for various clients.",
    featuredImage: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&auto=format&fit=crop",
    category: "Brand Identity",
    clientName: "Multiple Clients",
    projectUrl: "",
    completionDate: "2024-06-01"
  });

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  console.log("Updated projects");
}
