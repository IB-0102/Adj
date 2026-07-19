import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../../lib/auth-context';
import { supabase } from '../../lib/supabase';
import { Image, Briefcase, Star, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  
  const getAuthHeader = async () => {
    const localToken = localStorage.getItem('adminToken');
    if (localToken === 'Greatvalue123') return { Authorization: `Bearer ${localToken}` };
    if (!user) return {};
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchStats = async () => {
    const headers = await getAuthHeader();
    const [projectsRes, servicesRes, skillsRes, msgsRes] = await Promise.all([
      axios.get('/api/projects'),
      axios.get('/api/services'),
      axios.get('/api/skills'),
      axios.get('/api/admin/messages', { headers })
    ]);
    
    return {
      projectsCount: projectsRes.data.length,
      servicesCount: servicesRes.data.length,
      skillsCount: skillsRes.data.length,
      messagesCount: msgsRes.data.length
    };
  };

  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: fetchStats,
  });

  if (isLoading) return <div>Loading dashboard...</div>;

  const statCards = [
    { name: 'Total Projects', value: stats?.projectsCount || 0, icon: Image, color: 'bg-blue-500' },
    { name: 'Services', value: stats?.servicesCount || 0, icon: Briefcase, color: 'bg-green-500' },
    { name: 'Skills', value: stats?.skillsCount || 0, icon: Star, color: 'bg-yellow-500' },
    { name: 'Total Messages', value: stats?.messagesCount || 0, icon: MessageSquare, color: 'bg-olive' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-deeppurple">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-ivory rounded-xl shadow-sm p-6 flex items-center gap-4 border border-lavender-light">
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg text-white ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-olive">{stat.name}</p>
                <p className="text-2xl font-bold text-deeppurple">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="bg-ivory rounded-xl shadow-sm p-6 border border-lavender-light">
        <h3 className="text-lg font-bold text-deeppurple mb-4">Welcome back, Admin!</h3>
        <p className="text-olive">
          Use the sidebar to manage your portfolio content, including projects, skills, services, and testimonials.
          Changes you make here will instantly reflect on your live portfolio.
        </p>
      </div>
    </div>
  );
}
