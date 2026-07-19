-- Clear existing data to avoid duplicates (optional, you can remove these DELETE statements if you want to keep existing data)
DELETE FROM projects;
DELETE FROM services;
DELETE FROM skills;
DELETE FROM testimonials;
DELETE FROM messages;
DELETE FROM about;

-- Insert Projects
INSERT INTO projects (id, title, slug, description, content, featured_image, category, client_name, project_url, completion_date) VALUES (1000000000003, 'Summer Festival Poster', 'summer-festival-poster', 'High-energy, multicolor poster design for an electronic music festival.', 'Created promotional materials for an outdoor music festival. The design uses vibrant gradients, bold typography, and abstract shapes to capture the energy of the event.', 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop', 'Print Design', 'Sunset Events', '', '2024-02-20');
INSERT INTO projects (id, title, slug, description, content, featured_image, category, client_name, project_url, completion_date) VALUES (1000000000004, 'Geometric Logo Collection', 'geometric-logo-collection', 'A series of colorful, geometric logo marks designed for various tech startups.', 'A showcase of logomarks created over the past year. Each design focuses on simplicity, scalability, and distinct multicolor palettes to create memorable brand signatures.', 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop', 'Logo Design', 'Various Startups', '', '2024-03-10');
INSERT INTO projects (id, title, slug, description, content, featured_image, category, client_name, project_url, completion_date) VALUES (1000000000005, 'Abstract 3D Graphics', 'abstract-3d-graphics', 'Set of 3D rendered abstract compositions used for web backgrounds and marketing.', 'Exploration of 3D forms, lighting, and vibrant materials. These graphics were licensed for use in a global software company''s marketing campaign.', 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop', '3D Illustration', 'TechCorp Inc.', '', '2024-05-05');
INSERT INTO projects (id, title, slug, description, content, featured_image, category, client_name, project_url, completion_date) VALUES (1784301770058, 'Captivating and attractive multicolor designs', 'multicolor-designs', 'Captivating and attractive multicolor designs.', 'A collection of captivating and attractive multicolor designs created for various clients.', 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&auto=format&fit=crop', 'Brand Identity', 'Multiple Clients', '', '2024-06-01');

-- Insert Services
INSERT INTO services (id, title, description, icon, order_num) VALUES (1, 'Brand Identity', 'Creating memorable visual identities that perfectly represent your business values and appeal to your target audience.', 'Layout', 1);
INSERT INTO services (id, title, description, icon, order_num) VALUES (2, 'UI/UX Design', 'Designing intuitive and engaging digital experiences for web and mobile applications focused on user conversion.', 'Smartphone', 2);
INSERT INTO services (id, title, description, icon, order_num) VALUES (1784216425962, 'Logo Design', 'We detailed logo design for your brand ', 'Palette', 3);

-- Insert Skills
INSERT INTO skills (id, name, progress, order_num) VALUES (1, 'Adobe Photoshop', 95, 1);
INSERT INTO skills (id, name, progress, order_num) VALUES (2, 'Adobe Illustrator', 90, 2);
INSERT INTO skills (id, name, progress, order_num) VALUES (1784194870801, 'Logo designer figma', 80, 86);

-- Insert Testimonials
INSERT INTO testimonials (id, client_name, company, rating, review, location, client_photo) VALUES (1, 'Adeola F.', 'Tech Solutions Lagos', 5, 'Ibrahim''s designs completely transformed our brand identity. Professional, creative, and highly recommended!', 'Lagos, Nigeria', '');
INSERT INTO testimonials (id, client_name, company, rating, review, location, client_photo) VALUES (2, 'Chukwudi M.', 'PH Ventures', 5, 'Working with Ibrahim was a pleasure. He understood our vision perfectly and delivered beyond expectations.', 'Port Harcourt, Nigeria', '');
INSERT INTO testimonials (id, client_name, company, rating, review, location, client_photo) VALUES (3, 'Oluwaseun A.', 'Ibadan Creatives', 5, 'Exceptional graphic design skills! Ibrahim is very attentive to details and delivers high-quality work promptly.', 'Ibadan, Nigeria', '');

-- Insert Messages
INSERT INTO messages (id, name, email, phone, subject, message, created_at) VALUES (1784196748426, 'Server Test', 'test@test.com', '123', 'Hello', 'Activating form', '2026-07-16T10:12:28.426Z');
INSERT INTO messages (id, name, email, phone, subject, message, created_at) VALUES (1784197083153, 'Az', 'odetunde.ibrahim@yahoo.com', '2345', 'Logo design', 'I need design', '2026-07-16T10:18:03.153Z');
INSERT INTO messages (id, name, email, phone, subject, message, created_at) VALUES (1784198258801, 'Akin', 'odetunde.ibrahim@yahoo.com', '213', 'Design', 'I want an urgent design', '2026-07-16T10:37:38.801Z');
INSERT INTO messages (id, name, email, phone, subject, message, created_at) VALUES (1784198668264, 'Server Test', 'test@test.com', '123', 'Hello', 'Testing the formsubmit message body', '2026-07-16T10:44:28.264Z');
INSERT INTO messages (id, name, email, phone, subject, message, created_at) VALUES (1784198784382, 'Server Test URL Encoded', 'test@test.com', '123', 'Hello', 'This is a URL encoded test from the dev server', '2026-07-16T10:46:24.382Z');
INSERT INTO messages (id, name, email, phone, subject, message, created_at) VALUES (1784199041996, 'Boss', 'odetunde.ibrahim@yahoo.com', '', 'Logo design', 'I need a logo design', '2026-07-16T10:50:41.996Z');

-- Insert About
INSERT INTO about (id, title, content) VALUES (1, 'About Me', 'I''m a passionate Graphic Designer with a keen eye for aesthetics and a drive to create impactful visual stories. With years of experience in the industry, I specialize in branding, UI/UX design, and digital illustrations. My goal is to help businesses communicate their message effectively through compelling designs.');
