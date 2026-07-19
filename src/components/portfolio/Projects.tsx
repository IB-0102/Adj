import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { X, ExternalLink } from 'lucide-react';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['public-projects'],
    queryFn: async () => {
      const res = await axios.get('/api/projects');
      return res.data;
    }
  });

  const categories = ['All', ...Array.from(new Set(projects.map((p: any) => p.category)))];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter((p: any) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-deeppurple mb-4">Selected Works</h2>
          <p className="text-lg text-olive">
            Explore my recent creative projects and design solutions.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category as string}
              onClick={() => setActiveCategory(category as string)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-deeppurple text-white shadow-md'
                  : 'bg-ivory-dark text-olive hover:bg-lavender-light'
              }`}
            >
              {category as string}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="text-center py-20 text-olive">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-olive">
            No projects available yet. Check back soon!
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project: any) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-ivory-dark aspect-[4/3]"
                  onClick={() => setSelectedProject(project)}
                >
                  <img 
                    src={project.featuredImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deeppurple/90 via-deeppurple/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-olive font-medium text-sm mb-2">{project.category}</span>
                    <h3 className="text-white text-xl font-bold">{project.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-deeppurple/95 backdrop-blur-sm" onClick={() => setSelectedProject(null)} />
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-ivory rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-ivory/50 hover:bg-ivory rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5 text-deeppurple" />
              </button>

              <div className="flex-1 overflow-y-auto">
                <img 
                  src={selectedProject.featuredImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'} 
                  alt={selectedProject.title}
                  className="w-full h-[400px] object-cover"
                />
                
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-lavender text-olive-dark text-xs font-bold rounded-full uppercase tracking-wider">
                      {selectedProject.category}
                    </span>
                    {selectedProject.completionDate && (
                      <span className="text-sm text-olive">{new Date(selectedProject.completionDate).getFullYear()}</span>
                    )}
                  </div>
                  
                  <h3 className="text-3xl font-bold text-deeppurple mb-6">{selectedProject.title}</h3>
                  
                  <div className="prose prose-gray max-w-none">
                    <p className="text-olive leading-relaxed text-lg whitespace-pre-wrap">{selectedProject.description}</p>
                  </div>

                  {selectedProject.projectUrl && (
                    <div className="mt-8">
                      <a 
                        href={selectedProject.projectUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-deeppurple text-white rounded-lg hover:bg-deeppurple-dark transition-colors font-medium"
                      >
                        View Live Project <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
