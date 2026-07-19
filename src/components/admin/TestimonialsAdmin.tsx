import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../../lib/auth-context';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Star } from 'lucide-react';

export default function TestimonialsAdmin() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [rating, setRating] = useState(5);

  const getHeaders = async () => {
    const localToken = localStorage.getItem('adminToken');
    if (localToken === 'Greatvalue123') {
      return { Authorization: `Bearer ${localToken}` };
    }
    
    if (!user) return {};
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['admin-testimonials'],
    queryFn: async () => {
      const res = await axios.get('/api/testimonials');
      return res.data;
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const headers = await getHeaders();
      if (editingTestimonial) {
        return axios.put(`/api/admin/testimonials/${editingTestimonial.id}`, data, { headers });
      }
      return axios.post('/api/admin/testimonials', data, { headers });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['public-testimonials'] });
      closeModal();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number | string) => {
      const headers = await getHeaders();
      return axios.delete(`/api/admin/testimonials/${id}`, { headers });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['public-testimonials'] });
    }
  });

  const openModal = (testimonial: any = null) => {
    setEditingTestimonial(testimonial);
    setRating(testimonial?.rating || 5);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingTestimonial(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: import("react").FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      clientName: formData.get('clientName'),
      company: formData.get('company'),
      review: formData.get('review'),
      location: formData.get('location'),
      rating: rating,
      clientPhoto: '', // optional photo upload can be added later
    };

    mutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-deeppurple">Manage Testimonials</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-olive-dark text-white px-4 py-2 rounded-lg hover:bg-olive-dark transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="bg-ivory rounded-xl shadow-sm border border-lavender-light overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-ivory-dark border-b border-lavender-light">
            <tr>
              <th className="px-6 py-4 font-medium text-olive">Client</th>
              <th className="px-6 py-4 font-medium text-olive">Review</th>
              <th className="px-6 py-4 font-medium text-olive">Rating</th>
              <th className="px-6 py-4 font-medium text-olive text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-lavender-light">
            {isLoading ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-olive">Loading...</td></tr>
            ) : testimonials.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-olive">No testimonials found. Add one!</td></tr>
            ) : (
              testimonials.map((testimonial: any) => (
                <tr key={testimonial.id} className="hover:bg-ivory-dark">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-olive to-deeppurple flex items-center justify-center text-white font-bold">
                        {testimonial.clientName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-deeppurple">{testimonial.clientName}</p>
                        <p className="text-xs text-olive">{testimonial.company}</p>
                        <p className="text-xs text-olive opacity-75">{testimonial.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-olive truncate max-w-xs" title={testimonial.review}>{testimonial.review}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 \${i < testimonial.rating ? 'fill-current' : 'text-lavender'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => openModal(testimonial)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteMutation.mutate(testimonial.id)}
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
              <h3 className="text-xl font-bold">{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
              <button onClick={closeModal} className="p-2 hover:bg-ivory-dark rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="testimonialForm" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-olive mb-2">Client Name</label>
                    <input 
                      required 
                      name="clientName" 
                      defaultValue={editingTestimonial?.clientName}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-olive outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-olive mb-2">Company/Role (Optional)</label>
                    <input 
                      name="company" 
                      defaultValue={editingTestimonial?.company}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-olive outline-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-olive mb-2">Location (Optional)</label>
                  <input 
                    name="location" 
                    defaultValue={editingTestimonial?.location}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-olive outline-none" 
                    placeholder="e.g. Lagos, Nigeria"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-olive mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star className={`w-8 h-8 \${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-lavender'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-olive mb-2">Review</label>
                  <textarea 
                    required 
                    name="review" 
                    defaultValue={editingTestimonial?.review}
                    rows={4} 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-olive outline-none resize-none" 
                  />
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-lavender-light flex justify-end gap-3 bg-ivory-dark rounded-b-2xl">
              <button onClick={closeModal} className="px-4 py-2 text-olive font-medium hover:bg-lavender-light rounded-lg transition-colors">
                Cancel
              </button>
              <button 
                type="submit" 
                form="testimonialForm" 
                disabled={mutation.isPending}
                className="px-4 py-2 bg-olive-dark text-white font-medium rounded-lg hover:bg-olive-dark transition-colors disabled:opacity-50"
              >
                {mutation.isPending ? 'Saving...' : 'Save Testimonial'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
