const fs = require('fs');
let code = fs.readFileSync('src/components/admin/ProjectsAdmin.tsx', 'utf8');

const newCode = `import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../../lib/auth-context';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export default function ProjectsAdmin() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const getHeaders = async () => {
    const localToken = localStorage.getItem('adminToken');
    if (localToken === 'Greatvalue123') {
      return { Authorization: \`Bearer \${localToken}\` };
    }
    
    if (!user) return {};
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    return token ? { Authorization: \`Bearer \${token}\` } : {};
  };

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const res = await axios.get('/api/projects');
      return res.data;
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const headers = await getHeaders();
      if (editingProject) {
        return axios.put(\`/api/admin/projects/\${editingProject.id}\`, data, { headers });
      }
      return axios.post('/api/admin/projects', data, { headers });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['public-projects'] });
      closeModal();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number | string) => {
      const headers = await getHeaders();
      return axios.delete(\`/api/admin/projects/\${id}\`, { headers });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['public-projects'] });
    }
  });

  const openModal = (project: any = null) => {
    setEditingProject(project);
    setUploadedImage(project?.featuredImage || null);
    setUploadProgress(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingProject(null);
    setUploadedImage(null);
    setUploadProgress(null);
    setIsModalOpen(false);
  };

  const handleImageSelect = (e: import("react").ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress(0);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        const reader = new FileReader();
        reader.onload = () => {
          setUploadedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }, 150);
  };

  const handleSubmit = async (e: import("react").FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      title: formData.get('title'),
      category: formData.get('category'),
      description: formData.get('description'),
      clientName: formData.get('clientName'),
      slug: formData.get('title')?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-') || '',
      featuredImage: uploadedImage || '',
    };

    mutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-deeppurple">Manage Projects</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-olive-dark text-white px-4 py-2 rounded-lg hover:bg-olive-dark transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="bg-ivory rounded-xl shadow-sm border border-lavender-light overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-ivory-dark border-b border-lavender-light">
            <tr>
              <th className="px-6 py-4 font-medium text-olive">Project</th>
              <th className="px-6 py-4 font-medium text-olive">Category</th>
              <th className="px-6 py-4 font-medium text-olive text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-lavender-light">
            {isLoading ? (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-olive">Loading...</td></tr>
            ) : projects.length === 0 ? (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-olive">No projects found. Add one!</td></tr>
            ) : (
              projects.map((project: any) => (
                <tr key={project.id} className="hover:bg-ivory-dark">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {project.featuredImage ? (
                        <img src={project.featuredImage} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <div className="w-12 h-12 bg-ivory-dark rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-lavender-light" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-deeppurple">{project.title}</p>
                        <p className="text-sm text-olive truncate max-w-xs">{project.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-lavender-light text-olive-dark text-xs font-medium rounded-full">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => openModal(project)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this project?')) {
                          deleteMutation.mutate(project.id);
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deeppurple/50 backdrop-blur-sm">
          <div className="bg-ivory rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-lavender-light">
              <h3 className="text-xl font-bold">{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
              <button onClick={closeModal} className="p-2 hover:bg-ivory-dark rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="projectForm" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-olive mb-2">Project Title</label>
                    <input 
                      required 
                      name="title" 
                      defaultValue={editingProject?.title}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-olive outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-olive mb-2">Category</label>
                    <input 
                      required 
                      name="category" 
                      defaultValue={editingProject?.category}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-olive outline-none" 
                      placeholder="e.g. Logo Design"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-olive mb-2">Client Name (Optional)</label>
                  <input 
                    name="clientName" 
                    defaultValue={editingProject?.clientName}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-olive outline-none" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-olive mb-2">Description</label>
                  <textarea 
                    required 
                    name="description" 
                    defaultValue={editingProject?.description}
                    rows={4} 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-olive outline-none resize-none" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-olive mb-2">Featured Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-lavender border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-lavender-light" />
                      <div className="flex text-sm text-olive">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-ivory rounded-md font-medium text-olive-dark hover:text-olive focus-within:outline-none">
                          <span>Upload a file</span>
                          <input id="file-upload" name="image" type="file" accept="image/*" className="sr-only" onChange={handleImageSelect} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-olive">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                  
                  {uploadProgress !== null && (
                    <div className="mt-4 bg-lavender-light rounded-full h-3 w-full overflow-hidden">
                      <div 
                        className="bg-green-500 h-full transition-all duration-200" 
                        style={{ width: \`\${uploadProgress}%\` }}
                      ></div>
                    </div>
                  )}
                  {uploadProgress !== null && (
                    <p className="text-sm text-olive text-center mt-2">
                      {uploadProgress < 100 ? \`Uploading: \${uploadProgress}%\` : \`Upload Complete: 100%\`}
                    </p>
                  )}

                  {uploadedImage && uploadProgress === 100 && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-green-600 bg-green-50 py-2 rounded-lg">
                      <CheckCircle2 className="w-5 h-5" /> 
                      <span className="font-medium">Image Uploaded Successfully</span>
                    </div>
                  )}

                  {uploadedImage && (
                    <div className="mt-4">
                      <p className="text-sm text-olive mb-2">Current Image:</p>
                      <img src={uploadedImage} alt="Current" className="h-32 rounded-lg object-cover" />
                    </div>
                  )}
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-lavender-light flex justify-end gap-3 bg-ivory-dark rounded-b-2xl">
              <button onClick={closeModal} className="px-4 py-2 text-olive font-medium hover:bg-lavender-light rounded-lg transition-colors">
                Cancel
              </button>
              <button 
                type="submit" 
                form="projectForm" 
                disabled={mutation.isPending || (uploadProgress !== null && uploadProgress < 100)}
                className="px-4 py-2 bg-olive-dark text-white font-medium rounded-lg hover:bg-olive-dark transition-colors disabled:opacity-50"
              >
                {mutation.isPending ? 'Saving...' : 'Save Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`;

fs.writeFileSync('src/components/admin/ProjectsAdmin.tsx', newCode);
console.log("Updated!");
