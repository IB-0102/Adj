require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://coovqkfreywkhlcxjstd.supabase.co';
// fix url if it has /rest/v1/ at the end
const cleanUrl = supabaseUrl.replace('/rest/v1/', '');
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvb3Zxa2ZyZXl3a2hsY3hqc3RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyOTc1NTQsImV4cCI6MjA5OTg3MzU1NH0.5tR5YFBq3RnveVoff44FkBEOJIRA11r7pGTG3-d2cfc';

const supabase = createClient(cleanUrl, supabaseKey);

async function seed() {
  try {
    const dbRaw = fs.readFileSync('./local-db.json', 'utf8');
    const db = JSON.parse(dbRaw);

    console.log("Seeding projects...");
    for (const project of db.projects || []) {
      const { id, ...rest } = project; // might want to keep ID or let it auto-increment? If the schema uses bigserial for id, we can omit it or include it. Let's include it so links work, but wait, the ID in json is a large timestamp. Supabase bigserial can handle it.
      const { error } = await supabase.from('projects').upsert({
        id: project.id,
        title: project.title,
        slug: project.slug,
        description: project.description,
        content: project.content,
        featured_image: project.featuredImage, // mapping camelCase to snake_case if schema is snake case. Wait! What is the schema?
        category: project.category,
        client_name: project.clientName,
        project_url: project.projectUrl,
        completion_date: project.completionDate
      });
      if (error) console.error("Error inserting project", project.id, error);
    }

    console.log("Seeding services...");
    for (const service of db.services || []) {
      const { error } = await supabase.from('services').upsert({
        id: service.id,
        title: service.title,
        description: service.description,
        icon: service.icon,
        order_num: service.order_num
      });
      if (error) console.error("Error inserting service", service.id, error);
    }

    console.log("Seeding skills...");
    for (const skill of db.skills || []) {
      const { error } = await supabase.from('skills').upsert({
        id: skill.id,
        name: skill.name,
        progress: skill.progress,
        order_num: skill.order_num
      });
      if (error) console.error("Error inserting skill", skill.id, error);
    }

    console.log("Seeding messages...");
    for (const message of db.messages || []) {
      const { error } = await supabase.from('messages').upsert({
        id: message.id,
        name: message.name,
        email: message.email,
        phone: message.phone,
        subject: message.subject,
        message: message.message,
        created_at: message.created_at
      });
      if (error) console.error("Error inserting message", message.id, error);
    }

    console.log("Seeding testimonials...");
    for (const testimonial of db.testimonials || []) {
      const { error } = await supabase.from('testimonials').upsert({
        id: testimonial.id,
        client_name: testimonial.clientName,
        company: testimonial.company,
        rating: testimonial.rating,
        review: testimonial.review,
        location: testimonial.location,
        client_photo: testimonial.clientPhoto
      });
      if (error) console.error("Error inserting testimonial", testimonial.id, error);
    }

    console.log("Seeding about...");
    if (db.about) {
      const { error } = await supabase.from('about').upsert({
        id: 1,
        title: db.about.title,
        content: db.about.content
      });
      if (error) console.error("Error inserting about", error);
    }

    console.log("Seeding complete!");
  } catch (err) {
    console.error("Fatal error during seeding:", err);
  }
}

seed();
