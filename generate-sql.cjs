const fs = require('fs');
const db = JSON.parse(fs.readFileSync('local-db.json', 'utf8'));

let sql = `-- Clear existing data to avoid duplicates (optional, you can remove these DELETE statements if you want to keep existing data)
DELETE FROM projects;
DELETE FROM services;
DELETE FROM skills;
DELETE FROM testimonials;
DELETE FROM messages;
DELETE FROM about;

-- Insert Projects
`;

for (const p of db.projects) {
  sql += `INSERT INTO projects (id, title, slug, description, content, featured_image, category, client_name, project_url, completion_date) VALUES (${p.id}, '${p.title.replace(/'/g, "''")}', '${p.slug.replace(/'/g, "''")}', '${p.description.replace(/'/g, "''")}', '${p.content.replace(/'/g, "''")}', '${p.featuredImage ? p.featuredImage.replace(/'/g, "''") : ''}', '${p.category.replace(/'/g, "''")}', '${p.clientName ? p.clientName.replace(/'/g, "''") : ''}', '${p.projectUrl ? p.projectUrl.replace(/'/g, "''") : ''}', '${p.completionDate}');\n`;
}

sql += `\n-- Insert Services\n`;
for (const s of db.services) {
  sql += `INSERT INTO services (id, title, description, icon, order_num) VALUES (${s.id}, '${s.title.replace(/'/g, "''")}', '${s.description.replace(/'/g, "''")}', '${s.icon.replace(/'/g, "''")}', ${s.order_num});\n`;
}

sql += `\n-- Insert Skills\n`;
for (const s of db.skills) {
  sql += `INSERT INTO skills (id, name, progress, order_num) VALUES (${s.id}, '${s.name.replace(/'/g, "''")}', ${s.progress}, ${s.order_num});\n`;
}

sql += `\n-- Insert Testimonials\n`;
for (const t of db.testimonials) {
  sql += `INSERT INTO testimonials (id, client_name, company, rating, review, location, client_photo) VALUES (${t.id}, '${t.clientName.replace(/'/g, "''")}', '${t.company.replace(/'/g, "''")}', ${t.rating}, '${t.review.replace(/'/g, "''")}', '${t.location ? t.location.replace(/'/g, "''") : ''}', '${t.clientPhoto ? t.clientPhoto.replace(/'/g, "''") : ''}');\n`;
}

sql += `\n-- Insert Messages\n`;
for (const m of db.messages) {
  sql += `INSERT INTO messages (id, name, email, phone, subject, message, created_at) VALUES (${m.id}, '${m.name.replace(/'/g, "''")}', '${m.email.replace(/'/g, "''")}', '${m.phone ? m.phone.replace(/'/g, "''") : ''}', '${m.subject.replace(/'/g, "''")}', '${m.message.replace(/'/g, "''")}', '${m.created_at}');\n`;
}

sql += `\n-- Insert About\n`;
if (db.about) {
  sql += `INSERT INTO about (id, title, content) VALUES (1, '${db.about.title.replace(/'/g, "''")}', '${db.about.content.replace(/'/g, "''")}');\n`;
}

fs.writeFileSync('seed.sql', sql);
console.log("SQL generated");
