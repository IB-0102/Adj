const fs = require('fs');

const dbPath = 'local-db.json';
let db = {};
if (fs.existsSync(dbPath)) {
  try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  } catch(e) {}
}

if (!db.testimonials) {
  db.testimonials = [
    {
      id: 1,
      clientName: "Adeola F.",
      company: "Tech Solutions Lagos",
      rating: 5,
      review: "Ibrahim's designs completely transformed our brand identity. Professional, creative, and highly recommended!",
      location: "Lagos, Nigeria"
    },
    {
      id: 2,
      clientName: "Chukwudi M.",
      company: "PH Ventures",
      rating: 5,
      review: "Working with Ibrahim was a pleasure. He understood our vision perfectly and delivered beyond expectations.",
      location: "Port Harcourt, Nigeria"
    },
    {
      id: 3,
      clientName: "Oluwaseun A.",
      company: "Ibadan Creatives",
      rating: 5,
      review: "Exceptional graphic design skills! Ibrahim is very attentive to details and delivers high-quality work promptly.",
      location: "Ibadan, Nigeria"
    }
  ];
}

if (!db.about) {
  db.about = {
    title: "About Me",
    content: "I'm a passionate Graphic Designer with a keen eye for aesthetics and a drive to create impactful visual stories. With years of experience in the industry, I specialize in branding, UI/UX design, and digital illustrations. My goal is to help businesses communicate their message effectively through compelling designs."
  };
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log("Seeded testimonials and about");
