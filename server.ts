import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { requireAuth, requireAdmin } from "./src/middleware/auth";
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

let supabaseClient: any = null;
function getSupabase() {
  if (supabaseClient) return supabaseClient;
  let supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return null;
  }
  supabaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, '');
  supabaseClient = createClient(supabaseUrl, supabaseKey);
  return supabaseClient;
}

// Local DB fallback
const dbPath = process.env.VERCEL ? path.join("/tmp", "local-db.json") : path.join(process.cwd(), "local-db.json");
function readLocalDb() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({
      projects: [
        {
          id: 1000000000001,
          title: "Neon Dreams Branding",
          slug: "neon-dreams-branding",
          description: "A vibrant, multicolor brand identity designed for a modern creative agency.",
          content: "This project involved creating a full visual identity system, including a dynamic logo, color palette, typography, and marketing materials. The goal was to stand out with bold, fluorescent colors.",
          featuredImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
          category: "Brand Identity",
          clientName: "Neon Dreams Agency",
          projectUrl: "",
          completionDate: "2023-10-15"
        },
        {
          id: 1000000000002,
          title: "Fintech App UI/UX",
          slug: "fintech-app-ui",
          description: "Sleek and colorful mobile application interface for a modern financial platform.",
          content: "Designed the user experience and user interface for a new fintech mobile application. Focused on usability, accessibility, and an engaging visual language featuring custom colorful illustrations.",
          featuredImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
          category: "UI/UX Design",
          clientName: "Global Finance Tech",
          projectUrl: "",
          completionDate: "2023-12-01"
        },
        {
          id: 1000000000003,
          title: "Summer Festival Poster",
          slug: "summer-festival-poster",
          description: "High-energy, multicolor poster design for an electronic music festival.",
          content: "Created promotional materials for an outdoor music festival. The design uses vibrant gradients, bold typography, and abstract shapes to capture the energy of the event.",
          featuredImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
          category: "Print Design",
          clientName: "Sunset Events",
          projectUrl: "",
          completionDate: "2024-02-20"
        },
        {
          id: 1000000000004,
          title: "Geometric Logo Collection",
          slug: "geometric-logo-collection",
          description: "A series of colorful, geometric logo marks designed for various tech startups.",
          content: "A showcase of logomarks created over the past year. Each design focuses on simplicity, scalability, and distinct multicolor palettes to create memorable brand signatures.",
          featuredImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
          category: "Logo Design",
          clientName: "Various Startups",
          projectUrl: "",
          completionDate: "2024-03-10"
        },
        {
          id: 1000000000005,
          title: "Abstract 3D Graphics",
          slug: "abstract-3d-graphics",
          description: "Set of 3D rendered abstract compositions used for web backgrounds and marketing.",
          content: "Exploration of 3D forms, lighting, and vibrant materials. These graphics were licensed for use in a global software company's marketing campaign.",
          featuredImage: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop",
          category: "3D Illustration",
          clientName: "TechCorp Inc.",
          projectUrl: "",
          completionDate: "2024-05-05"
        },
        {
          id: 1000000000006,
          title: "Social Media Campaign",
          slug: "social-media-campaign",
          description: "Vibrant and engaging social media post designs for a lifestyle brand.",
          content: "Developed a comprehensive social media template system. The designs utilize striking color combinations and modern typography to increase engagement and brand awareness across platforms.",
          featuredImage: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop",
          category: "Social Media",
          clientName: "Lifestyle Co.",
          projectUrl: "",
          completionDate: "2024-06-15"
        }
      ],
      services: [
        { id: 1, title: 'Brand Identity', description: 'Creating memorable visual identities that perfectly represent your business values and appeal to your target audience.', icon: 'Layout', order_num: 1 },
        { id: 2, title: 'UI/UX Design', description: 'Designing intuitive and engaging digital experiences for web and mobile applications focused on user conversion.', icon: 'Smartphone', order_num: 2 },
      ],
      skills: [
        { id: 1, name: 'Adobe Photoshop', progress: 95, order_num: 1 },
        { id: 2, name: 'Adobe Illustrator', progress: 90, order_num: 2 },
      ],
      messages: [],
      testimonials: [
        { id: 1, clientName: "Adeola F.", company: "Tech Solutions Lagos", rating: 5, review: "Ibrahim's designs completely transformed our brand identity. Professional, creative, and highly recommended!", location: "Lagos, Nigeria" },
        { id: 2, clientName: "Chukwudi M.", company: "PH Ventures", rating: 5, review: "Working with Ibrahim was a pleasure. He understood our vision perfectly and delivered beyond expectations.", location: "Port Harcourt, Nigeria" },
        { id: 3, clientName: "Oluwaseun A.", company: "Ibadan Creatives", rating: 5, review: "Exceptional graphic design skills! Ibrahim is very attentive to details and delivers high-quality work promptly.", location: "Ibadan, Nigeria" }
      ],
      about: { title: "About Me", content: "I'm a passionate Graphic Designer with a keen eye for aesthetics and a drive to create impactful visual stories. With years of experience in the industry, I specialize in branding, UI/UX design, and digital illustrations. My goal is to help businesses communicate their message effectively through compelling designs." }
    }));
  }
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}
function writeLocalDb(data: any) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}


const app = express();
const PORT = 3000;

  app.set("trust proxy", 1);
  app.use(cors());
  app.use(helmet({
    contentSecurityPolicy: false, // Disabled for dev, Vite needs it
  }));
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use("/api/", apiLimiter);

  // --- PUBLIC API ROUTES ---
  app.get("/api/projects", async (req, res) => {
    try {
      const supabase = getSupabase();
      if (!supabase) {
        return res.json(readLocalDb().projects);
      }
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      const mappedData = data.map((item: any) => ({
        ...item,
        featuredImage: item.featured_image,
        clientName: item.client_name,
        completionDate: item.completion_date,
        projectUrl: item.project_url,
        createdAt: item.created_at,
      }));
      res.json(mappedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/services", async (req, res) => {
    try {
      const supabase = getSupabase();
      if (!supabase) {
        return res.json(readLocalDb().services);
      }
      const { data, error } = await supabase.from('services').select('*').order('order_num', { ascending: true });
      if (error) throw error;
      const mappedData = data.map((item: any) => ({
        ...item,
        order: item.order_num,
      }));
      res.json(mappedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.get("/api/skills", async (req, res) => {
    try {
      const supabase = getSupabase();
      if (!supabase) {
        return res.json(readLocalDb().skills);
      }
      const { data, error } = await supabase.from('skills').select('*').order('order_num', { ascending: true });
      if (error) throw error;
      const mappedData = data.map((item: any) => ({
        ...item,
        order: item.order_num,
      }));
      res.json(mappedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch skills" });
    }
  });


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

  app.get("/api/testimonials", async (req, res) => {
    try {
      const supabase = getSupabase();
      if (!supabase) {
        const db = readLocalDb();
        return res.json(db.testimonials || []);
      }
      const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      const mappedData = data.map((item: any) => ({
        ...item,
        clientName: item.client_name,
        clientPhoto: item.client_photo,
        createdAt: item.created_at,
      }));
      res.json(mappedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;
      try {
        await fetch("https://formsubmit.co/ajax/adjim1990@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
            "Origin": "https://adjim1990-portfolio.com",
            "Referer": "https://adjim1990-portfolio.com/"
          },
          body: new URLSearchParams({
            _template: "table",
            _subject: subject || "New Contact Message",
            name: name || "",
            email: email || "",
            phone: phone || "",
            message: message || ""
          }).toString()
        });
      } catch (e) {
        console.error("Formsubmit error:", e);
      }
      const supabase = getSupabase();
      if (!supabase) {
        const db = readLocalDb();
        const newMessage = { id: Date.now(), name, email, phone, subject, message, created_at: new Date().toISOString() };
        if (!db.messages) db.messages = [];
        db.messages.push(newMessage);
        writeLocalDb(db);
        return res.json({ success: true, message: "Message sent and saved locally!" });
      }
      const { error } = await supabase.from("messages").insert([{ name, email, phone, subject, message }]);
      if (error) throw error;
      res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  // --- ADMIN API ROUTES ---
  // Projects
  app.post("/api/admin/projects", requireAdmin, async (req, res) => {
    try {
      const { title, slug, description, content, featuredImage, category, clientName, projectUrl, completionDate } = req.body;
      const supabase = getSupabase();
      if (!supabase) {
        const db = readLocalDb();
        const newProject = { id: Date.now(), title, slug, description, content, featuredImage, category, clientName, projectUrl, completionDate };
        db.projects.push(newProject);
        writeLocalDb(db);
        return res.json({ success: true, id: newProject.id });
      }
      const { error } = await supabase.from('projects').insert([{ title, slug, description, content, featured_image: featuredImage, category, client_name: clientName, project_url: projectUrl, completion_date: completionDate }]);
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  app.put("/api/admin/projects/:id", requireAdmin, async (req, res) => {
    try {
      const id = req.params.id;
      const { title, slug, description, content, featuredImage, category, clientName, projectUrl, completionDate } = req.body;
      const supabase = getSupabase();
      if (!supabase) {
        const db = readLocalDb();
        const idx = db.projects.findIndex((p: any) => String(p.id) === String(id));
        if (idx !== -1) {
          db.projects[idx] = { ...db.projects[idx], title, slug, description, content, featuredImage, category, clientName, projectUrl, completionDate };
          writeLocalDb(db);
        }
        return res.json({ success: true });
      }
      const { error } = await supabase.from('projects').update({ title, slug, description, content, featured_image: featuredImage, category, client_name: clientName, project_url: projectUrl, completion_date: completionDate, updated_at: new Date() }).eq('id', id);
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update project" });
    }
  });

  app.delete("/api/admin/projects/:id", requireAdmin, async (req, res) => {
    try {
      const id = req.params.id;
      const supabase = getSupabase();
      if (!supabase) {
        const db = readLocalDb();
        db.projects = db.projects.filter((p: any) => String(p.id) !== String(id));
        writeLocalDb(db);
        return res.json({ success: true });
      }
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // Services
  app.post("/api/admin/services", requireAdmin, async (req, res) => {
    try {
      const { title, description, icon, order_num } = req.body;
      const supabase = getSupabase();
      if (!supabase) {
        const db = readLocalDb();
        const newService = { id: Date.now(), title, description, icon, order_num };
        db.services.push(newService);
        writeLocalDb(db);
        return res.json({ success: true, id: newService.id });
      }
      const { error } = await supabase.from('services').insert([{ title, description, icon, order_num }]);
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to create service" });
    }
  });

  app.put("/api/admin/services/:id", requireAdmin, async (req, res) => {
    try {
      const id = req.params.id;
      const { title, description, icon, order_num } = req.body;
      const supabase = getSupabase();
      if (!supabase) {
        const db = readLocalDb();
        const idx = db.services.findIndex((p: any) => String(p.id) === String(id));
        if (idx !== -1) {
          db.services[idx] = { ...db.services[idx], title, description, icon, order_num };
          writeLocalDb(db);
        }
        return res.json({ success: true });
      }
      const { error } = await supabase.from('services').update({ title, description, icon, order_num }).eq('id', id);
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update service" });
    }
  });

  app.delete("/api/admin/services/:id", requireAdmin, async (req, res) => {
    try {
      const id = req.params.id;
      const supabase = getSupabase();
      if (!supabase) {
        const db = readLocalDb();
        db.services = db.services.filter((p: any) => String(p.id) !== String(id));
        writeLocalDb(db);
        return res.json({ success: true });
      }
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete service" });
    }
  });

  // Skills
  app.post("/api/admin/skills", requireAdmin, async (req, res) => {
    try {
      const { name, progress, order_num } = req.body;
      const supabase = getSupabase();
      if (!supabase) {
        const db = readLocalDb();
        const newSkill = { id: Date.now(), name, progress, order_num };
        db.skills.push(newSkill);
        writeLocalDb(db);
        return res.json({ success: true, id: newSkill.id });
      }
      const { error } = await supabase.from('skills').insert([{ name, progress, order_num }]);
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to create skill" });
    }
  });

  app.put("/api/admin/skills/:id", requireAdmin, async (req, res) => {
    try {
      const id = req.params.id;
      const { name, progress, order_num } = req.body;
      const supabase = getSupabase();
      if (!supabase) {
        const db = readLocalDb();
        const idx = db.skills.findIndex((p: any) => String(p.id) === String(id));
        if (idx !== -1) {
          db.skills[idx] = { ...db.skills[idx], name, progress, order_num };
          writeLocalDb(db);
        }
        return res.json({ success: true });
      }
      const { error } = await supabase.from('skills').update({ name, progress, order_num }).eq('id', id);
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update skill" });
    }
  });

  app.delete("/api/admin/skills/:id", requireAdmin, async (req, res) => {
    try {
      const id = req.params.id;
      const supabase = getSupabase();
      if (!supabase) {
        const db = readLocalDb();
        db.skills = db.skills.filter((p: any) => String(p.id) !== String(id));
        writeLocalDb(db);
        return res.json({ success: true });
      }
      const { error } = await supabase.from('skills').delete().eq('id', id);
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete skill" });
    }
  });



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

  app.get("/api/admin/messages", requireAdmin, async (req, res) => {
    try {
      const supabase = getSupabase();
      if (!supabase) {
        return res.json(readLocalDb().messages || []);
      }
      const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      res.json(data);
    } catch (error) {
      console.error("Failed to fetch messages", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vi" + "te");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
