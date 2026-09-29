import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TestimonialMarquee from '@/components/TestimonialMarquee';
import Stats from '@/components/Stats';
import Assistant from '@/components/Assistant';
import Features from '@/components/Features';
import Modules from '@/components/Modules';
import Testimonials from '@/components/Testimonials';
import Security from '@/components/Security';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';

function AppContent() {
  const { isAdmin, loading } = useAuth();
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    const checkRoute = () => {
      const hash = window.location.hash.toLowerCase();
      setIsAdminRoute(hash === '#admin' || hash.startsWith('#admin/'));
    };
    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    return () => window.removeEventListener('hashchange', checkRoute);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-50">
        <div className="text-dark-400">Carregando...</div>
      </div>
    );
  }

  if (isAdminRoute) {
    if (!isAdmin) {
      return <AdminLogin />;
    }
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <TestimonialMarquee />
        <Stats />
        <Assistant />
        <Features />
        <Modules />
        <Testimonials />
        <Security />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
