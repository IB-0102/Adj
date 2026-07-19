import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Image, Settings, LogOut, Briefcase, FileText, Star, MessageSquare, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };
  
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: Image },
    { name: 'Services', path: '/admin/services', icon: Briefcase },
    { name: 'Skills', path: '/admin/skills', icon: Star },
    { name: 'Testimonials', path: '/admin/testimonials', icon: FileText },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
    { name: 'About', path: '/admin/about', icon: User },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-ivory-dark">
      <aside className="w-64 bg-ivory shadow-md flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-olive to-deeppurple">
            Portfolio Admin
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-lavender-light text-olive-dark font-medium' 
                    : 'text-olive hover:bg-ivory-dark hover:text-deeppurple'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-olive-dark' : 'text-lavender-light'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-lavender-light">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-olive hover:bg-ivory-dark hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 text-lavender-light" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-ivory-dark p-8">
        <Outlet />
      </main>
    </div>
  );
}
