const fs = require('fs');
const path = require('path');

const walk = (dir, done) => {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(file => {
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          if (file.endsWith('.tsx') || file.endsWith('.css')) {
            results.push(file);
          }
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

walk('./src', (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace text and bg colors
    content = content.replace(/pink-500/g, 'olive');
    content = content.replace(/pink-600/g, 'olive-dark');
    content = content.replace(/pink-400/g, 'olive');
    content = content.replace(/pink-700/g, 'olive-dark');
    content = content.replace(/purple-600/g, 'deeppurple');
    content = content.replace(/purple-500/g, 'deeppurple');
    content = content.replace(/pink-50/g, 'lavender-light');
    content = content.replace(/pink-100/g, 'lavender');
    content = content.replace(/purple-50/g, 'lavender-light');
    content = content.replace(/purple-100/g, 'lavender');
    
    // Replace gray and white colors for layout
    content = content.replace(/bg-white/g, 'bg-ivory');
    content = content.replace(/bg-gray-50/g, 'bg-ivory-dark');
    content = content.replace(/bg-gray-100/g, 'bg-ivory-dark');
    content = content.replace(/text-gray-900/g, 'text-deeppurple');
    content = content.replace(/text-gray-800/g, 'text-deeppurple');
    content = content.replace(/text-gray-700/g, 'text-olive');
    content = content.replace(/text-gray-600/g, 'text-olive');
    content = content.replace(/text-gray-500/g, 'text-olive');
    
    fs.writeFileSync(file, content);
  });
});
