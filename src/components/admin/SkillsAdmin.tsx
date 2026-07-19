import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../../lib/auth-context';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function SkillsAdmin() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);

  const getHeaders = async () => {
    const localToken = localStorage.getItem('adminToken');
    if (localToken === 'Greatvalue123') return { Authorization: `Bearer ${localToken}` };
    return {};
  };

  const { data: skills = [], isLoading } = useQuery({
    queryKey: ['admin-skills'],
    queryFn: async () => {
      const res = await axios.get('/api/skills');
      return res.data;
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const headers = await getHeaders();
      if (editingSkill) {
        return axios.put(`/api/admin/skills/${editingSkill.id}`, data, { headers });
      }
      return axios.post('/api/admin/skills', data, { headers });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-skills'] });
      queryClient.invalidateQueries({ queryKey: ['public-skills'] });
      closeModal();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const headers = await getHeaders();
      return axios.delete(`/api/admin/skills/${id}`, { headers });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-skills'] });
      queryClient.invalidateQueries({ queryKey: ['public-skills'] });
    }
  });

  const openModal = (skill = null) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingSkill(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: import("react").FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      progress: parseInt(formData.get('progress') as string) || 0,
      order_num: parseInt(formData.get('order_num') as string) || 0,
    };
    mutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-deeppurple">Manage Skills</h2>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-olive-dark text-white px-4 py-2 rounded-lg hover:bg-olive transition-colors">
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>

      <div className="bg-ivory rounded-xl shadow-sm border border-lavender-light overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-ivory-dark border-b border-lavender-light">
            <tr>
              <th className="px-6 py-4 font-medium text-olive">Skill Name</th>
              <th className="px-6 py-4 font-medium text-olive">Proficiency (%)</th>
              <th className="px-6 py-4 font-medium text-olive">Order</th>
              <th className="px-6 py-4 font-medium text-olive text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-lavender-light">
            {isLoading ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-olive">Loading...</td></tr>
            ) : skills.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-olive">No skills found.</td></tr>
            ) : (
              skills.map((skill: any) => (
                <tr key={skill.id} className="hover:bg-ivory-dark">
                  <td className="px-6 py-4 font-medium text-deeppurple">{skill.name}</td>
                  <td className="px-6 py-4 text-sm text-olive">
                    <div className="flex items-center gap-2">
                      <span className="w-8">{skill.progress}%</span>
                      <div className="w-24 h-2 bg-lavender rounded-full">
                        <div className="h-full bg-olive-dark rounded-full" style={{ width: `${skill.progress}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-olive">{skill.order_num || skill.order}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => openModal(skill)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => { if(confirm('Delete?')) deleteMutation.mutate(skill.id); }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
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
          <div className="bg-ivory rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-lavender-light">
              <h3 className="text-xl font-bold">{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h3>
              <button onClick={closeModal} className="p-2 hover:bg-ivory-dark rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <form id="skillForm" onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-olive mb-1">Skill Name</label>
                <input required name="name" defaultValue={editingSkill?.name} className="w-full px-4 py-2 border border-lavender rounded-lg focus:ring-2 focus:ring-olive outline-none" placeholder="e.g. Photoshop" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-olive mb-1">Proficiency (%)</label>
                  <input required type="number" min="0" max="100" name="progress" defaultValue={editingSkill?.progress || 80} className="w-full px-4 py-2 border border-lavender rounded-lg focus:ring-2 focus:ring-olive outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-olive mb-1">Display Order</label>
                  <input required type="number" name="order_num" defaultValue={editingSkill?.order_num || editingSkill?.order || 0} className="w-full px-4 py-2 border border-lavender rounded-lg focus:ring-2 focus:ring-olive outline-none" />
                </div>
              </div>
            </form>
            <div className="p-6 border-t border-lavender-light flex justify-end gap-3 bg-ivory-dark">
              <button onClick={closeModal} className="px-4 py-2 text-olive font-medium hover:bg-lavender-light rounded-lg">Cancel</button>
              <button type="submit" form="skillForm" disabled={mutation.isPending} className="px-4 py-2 bg-olive-dark text-white font-medium rounded-lg hover:bg-olive transition-colors disabled:opacity-50">
                {mutation.isPending ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
