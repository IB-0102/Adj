const fs = require('fs');
const files = [
  'src/components/admin/ProjectsAdmin.tsx',
  'src/components/admin/ServicesAdmin.tsx',
  'src/components/admin/SkillsAdmin.tsx',
  'src/components/admin/TestimonialsAdmin.tsx'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let code = fs.readFileSync(file, 'utf8');
    // Replace the confirm block with just the mutation
    code = code.replace(/onClick=\{\(\) => \{\s*if \(confirm\([^)]+\)\) \{\s*deleteMutation\.mutate\(([^)]+)\);\s*\}\s*\}\}/g, 
                        'onClick={() => deleteMutation.mutate($1)}');
    // For ProjectsAdmin where I already messed it up
    code = code.replace(/onClick=\{\(\) => \{\s*deleteMutation\.mutate\(project\.id\);\s*\}\s*className=/g,
                        'onClick={() => deleteMutation.mutate(project.id)}\n                      className=');
    fs.writeFileSync(file, code);
  }
}
console.log("Fixed deletes");
