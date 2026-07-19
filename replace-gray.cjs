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
    
    content = content.replace(/border-gray-100/g, 'border-lavender-light');
    content = content.replace(/border-gray-200/g, 'border-lavender');
    content = content.replace(/border-gray-300/g, 'border-lavender');
    content = content.replace(/bg-gray-200/g, 'bg-lavender-light');
    content = content.replace(/bg-gray-300/g, 'bg-lavender');
    content = content.replace(/text-gray-200/g, 'text-lavender');
    
    fs.writeFileSync(file, content);
  });
});
