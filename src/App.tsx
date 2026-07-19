import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Portfolio from './components/portfolio/Portfolio';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import ProjectsAdmin from './components/admin/ProjectsAdmin';
import ServicesAdmin from './components/admin/ServicesAdmin';
import SkillsAdmin from './components/admin/SkillsAdmin';
import GenericAdmin from './components/admin/GenericAdmin';
import TestimonialsAdmin from './components/admin/TestimonialsAdmin';
import AboutAdmin from './components/admin/AboutAdmin';
import Login from './components/admin/Login';
import { AuthProvider, useAuth } from './lib/auth-context';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: import("react").ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  
  return <>{children}</>;
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            
            <Route path="/admin/login" element={<Login />} />
            
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="projects" element={<ProjectsAdmin />} />
              <Route path="services" element={<ServicesAdmin />} />
              <Route path="skills" element={<SkillsAdmin />} />
              <Route path="testimonials" element={<TestimonialsAdmin />} />
              <Route path="about" element={<AboutAdmin />} />
              <Route path="messages" element={<GenericAdmin title="Messages" />} />
              <Route path="settings" element={<GenericAdmin title="Settings" />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}
