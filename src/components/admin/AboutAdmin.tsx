import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../../lib/auth-context';
import { supabase } from '../../lib/supabase';
import { CheckCircle2 } from 'lucide-react';

export default function AboutAdmin() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isSuccess, setIsSuccess] = useState(false);

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

  const { data: aboutData, isLoading } = useQuery({
    queryKey: ['admin-about'],
    queryFn: async () => {
      const res = await axios.get('/api/about');
      return res.data;
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const headers = await getHeaders();
      return axios.put('/api/admin/about', data, { headers });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-about'] });
      queryClient.invalidateQueries({ queryKey: ['public-about'] });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }
  });

  const handleSubmit = async (e: import("react").FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      title: formData.get('title'),
      content: formData.get('content'),
    };

    mutation.mutate(data);
  };

  if (isLoading) {
    return <div className="p-8 text-center text-olive">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-deeppurple">Manage About Section</h2>

      <div className="bg-ivory rounded-xl shadow-sm border border-lavender-light overflow-hidden p-6 max-w-3xl">
        {isSuccess && (
          <div className="mb-6 flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">About section updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-olive mb-2">Title</label>
            <input 
              required 
              name="title" 
              defaultValue={aboutData?.title}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-olive outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-olive mb-2">Content</label>
            <textarea 
              required 
              name="content" 
              defaultValue={aboutData?.content}
              rows={10} 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-olive outline-none resize-y" 
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-lavender-light">
            <button 
              type="submit" 
              disabled={mutation.isPending}
              className="px-6 py-2.5 bg-olive-dark text-white font-medium rounded-lg hover:bg-olive transition-colors disabled:opacity-50"
            >
              {mutation.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
