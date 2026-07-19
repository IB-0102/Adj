const fs = require('fs');
const db = JSON.parse(fs.readFileSync('local-db.json', 'utf8'));

let sql = `
-- 1. DROP EXISTING TABLES TO FIX SCHEMA ISSUES
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS about;

-- 2. CREATE TABLES WITH CORRECT SCHEMA
CREATE TABLE projects (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT,
  description TEXT,
  content TEXT,
  featured_image TEXT,
  category TEXT,
  client_name TEXT,
  project_url TEXT,
  completion_date TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE services (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  order_num INTEGER
);

CREATE TABLE skills (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  progress INTEGER,
  order_num INTEGER
);

CREATE TABLE testimonials (
  id BIGINT PRIMARY KEY,
  client_name TEXT,
  company TEXT,
  rating INTEGER,
  review TEXT,
  location TEXT,
  client_photo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE messages (
  id BIGINT PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  subject TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE about (
  id BIGINT PRIMARY KEY,
  title TEXT,
  content TEXT
);

-- 3. DISABLE ROW LEVEL SECURITY (Allows your website to read/write without authentication)
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE services DISABLE ROW LEVEL SECURITY;
ALTER TABLE skills DISABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE about DISABLE ROW LEVEL SECURITY;

-- 4. INSERT DATA
`;

for (const p of db.projects) {
  sql += `INSERT INTO projects (id, title, slug, description, content, featured_image, category, client_name, project_url, completion_date) VALUES (${p.id}, '${p.title.replace(/'/g, "''")}', '${p.slug.replace(/'/g, "''")}', '${p.description.replace(/'/g, "''")}', '${p.content.replace(/'/g, "''")}', '${p.featuredImage ? p.featuredImage.replace(/'/g, "''") : ''}', '${p.category.replace(/'/g, "''")}', '${p.clientName ? p.clientName.replace(/'/g, "''") : ''}', '${p.projectUrl ? p.projectUrl.replace(/'/g, "''") : ''}', '${p.completionDate}');\n`;
}

sql += `\n`;
for (const s of db.services) {
  sql += `INSERT INTO services (id, title, description, icon, order_num) VALUES (${s.id}, '${s.title.replace(/'/g, "''")}', '${s.description.replace(/'/g, "''")}', '${s.icon.replace(/'/g, "''")}', ${s.order_num});\n`;
}

sql += `\n`;
for (const s of db.skills) {
  sql += `INSERT INTO skills (id, name, progress, order_num) VALUES (${s.id}, '${s.name.replace(/'/g, "''")}', ${s.progress}, ${s.order_num});\n`;
}

sql += `\n`;
for (const t of db.testimonials) {
  sql += `INSERT INTO testimonials (id, client_name, company, rating, review, location, client_photo) VALUES (${t.id}, '${t.clientName.replace(/'/g, "''")}', '${t.company.replace(/'/g, "''")}', ${t.rating}, '${t.review.replace(/'/g, "''")}', '${t.location ? t.location.replace(/'/g, "''") : ''}', '${t.clientPhoto ? t.clientPhoto.replace(/'/g, "''") : ''}');\n`;
}

sql += `\n`;
for (const m of db.messages) {
  sql += `INSERT INTO messages (id, name, email, phone, subject, message, created_at) VALUES (${m.id}, '${m.name.replace(/'/g, "''")}', '${m.email.replace(/'/g, "''")}', '${m.phone ? m.phone.replace(/'/g, "''") : ''}', '${m.subject.replace(/'/g, "''")}', '${m.message.replace(/'/g, "''")}', '${m.created_at}');\n`;
}

sql += `\n`;
if (db.about) {
  sql += `INSERT INTO about (id, title, content) VALUES (1, '${db.about.title.replace(/'/g, "''")}', '${db.about.content.replace(/'/g, "''")}');\n`;
}

fs.writeFileSync('setup-supabase.sql', sql);
console.log("Full SQL generated");
