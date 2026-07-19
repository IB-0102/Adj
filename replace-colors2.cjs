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
    
    // Replace gray and white colors for layout
    content = content.replace(/bg-gray-900/g, 'bg-deeppurple');
    content = content.replace(/bg-gray-800/g, 'bg-deeppurple-dark');
    content = content.replace(/text-gray-400/g, 'text-lavender-light');
    content = content.replace(/border-gray-800/g, 'border-deeppurple-dark');
    content = content.replace(/shadow-gray-200/g, 'shadow-lavender/30');
    content = content.replace(/bg-white/g, 'bg-ivory');
    
    fs.writeFileSync(file, content);
  });
});
