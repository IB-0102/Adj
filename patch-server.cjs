const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// Update readLocalDb initialization
code = code.replace(
  "messages: []\n    }));",
  `messages: [],
      testimonials: [
        { id: 1, clientName: "Adeola F.", company: "Tech Solutions Lagos", rating: 5, review: "Ibrahim's designs completely transformed our brand identity. Professional, creative, and highly recommended!", location: "Lagos, Nigeria" },
        { id: 2, clientName: "Chukwudi M.", company: "PH Ventures", rating: 5, review: "Working with Ibrahim was a pleasure. He understood our vision perfectly and delivered beyond expectations.", location: "Port Harcourt, Nigeria" },
        { id: 3, clientName: "Oluwaseun A.", company: "Ibadan Creatives", rating: 5, review: "Exceptional graphic design skills! Ibrahim is very attentive to details and delivers high-quality work promptly.", location: "Ibadan, Nigeria" }
      ],
      about: { title: "About Me", content: "I'm a passionate Graphic Designer with a keen eye for aesthetics and a drive to create impactful visual stories. With years of experience in the industry, I specialize in branding, UI/UX design, and digital illustrations. My goal is to help businesses communicate their message effectively through compelling designs." }
    }));`
);

// Add About GET API before Testimonials GET
const aboutApi = `
  app.get("/api/about", async (req, res) => {
    try {
      const supabase = getSupabase();
      if (!supabase) {
        const db = readLocalDb();
        return res.json(db.about || { title: "About Me", content: "Graphic Designer" });
      }
      const { data, error } = await supabase.from('about').select('*').limit(1).single();
      if (error) {
        if (error.code === 'PGRST116') {
          return res.json({ title: "About Me", content: "Graphic Designer" });
        }
        throw error;
      }
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch about" });
    }
  });

  app.put("/api/admin/about", requireAdmin, async (req, res) => {
    try {
      const { title, content } = req.body;
      const supabase = getSupabase();
      if (!supabase) {
        const db = readLocalDb();
        db.about = { title, content };
        writeLocalDb(db);
        return res.json({ success: true });
      }
      // Assuming a single row with id 1 for simplicity
      const { error } = await supabase.from('about').upsert({ id: 1, title, content });
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update about" });
    }
  });
`;

code = code.replace(
  '  app.get("/api/testimonials", async (req, res) => {',
  aboutApi + '\n  app.get("/api/testimonials", async (req, res) => {'
);

// Update Testimonials GET API to use local db
code = code.replace(
  "if (!supabase) return res.json([]);",
  `if (!supabase) {
        const db = readLocalDb();
        return res.json(db.testimonials || []);
      }`
);

// Add Admin API for Testimonials at the end of the file, before the Vite middleware setup
const testimonialsAdminApi = `
  app.post("/api/admin/testimonials", requireAdmin, async (req, res) => {
    try {
      const { clientName, company, rating, review, location, clientPhoto } = req.body;
      const supabase = getSupabase();
      if (!supabase) {
        const db = readLocalDb();
        const newTestimonial = { id: Date.now(), clientName, company, rating, review, location, clientPhoto };
        if (!db.testimonials) db.testimonials = [];
        db.testimonials.push(newTestimonial);
        writeLocalDb(db);
        return res.json({ success: true, id: newTestimonial.id });
      }
      const { error } = await supabase.from('testimonials').insert([{ client_name: clientName, company, rating, review, location, client_photo: clientPhoto }]);
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create testimonial" });
    }
  });

  app.put("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      const id = req.params.id;
      const { clientName, company, rating, review, location, clientPhoto } = req.body;
      const supabase = getSupabase();
      if (!supabase) {
        const db = readLocalDb();
        const index = db.testimonials.findIndex((p) => String(p.id) === String(id));
        if (index !== -1) {
          db.testimonials[index] = { ...db.testimonials[index], clientName, company, rating, review, location, clientPhoto };
          writeLocalDb(db);
        }
        return res.json({ success: true });
      }
      const { error } = await supabase.from('testimonials').update({ client_name: clientName, company, rating, review, location, client_photo: clientPhoto }).eq('id', id);
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update testimonial" });
    }
  });

  app.delete("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      const id = req.params.id;
      const supabase = getSupabase();
      if (!supabase) {
        const db = readLocalDb();
        db.testimonials = db.testimonials.filter((p) => String(p.id) !== String(id));
        writeLocalDb(db);
        return res.json({ success: true });
      }
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete testimonial" });
    }
  });
`;

code = code.replace(
  '  // Vite middleware for development',
  testimonialsAdminApi + '\n  // Vite middleware for development'
);

fs.writeFileSync('server.ts', code);
console.log("Patched server.ts");
