import React, { useState, useEffect } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import type { AdminUser } from './types';
import { Loader2 } from 'lucide-react';

interface AdminPortalProps {
  onBackToWebsite: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToWebsite }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string>(() => localStorage.getItem('eclipto_admin_token') || '');
  const [loading, setLoading] = useState<boolean>(true);

  // Verify existing session
  useEffect(() => {
    const verifySession = async () => {
      const storedToken = localStorage.getItem('eclipto_admin_token');
      try {
        const res = await fetch('/api/admin/auth/me', {
          headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : {},
        });
        const data = await res.json();
        if (res.ok && data.ok && data.user) {
          setCurrentUser(data.user);
          if (storedToken) setToken(storedToken);
        } else {
          setCurrentUser(null);
          localStorage.removeItem('eclipto_admin_token');
        }
      } catch (err) {
        console.error('Session verify error:', err);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const handleLoginSuccess = (user: AdminUser, newToken: string) => {
    setCurrentUser(user);
    setToken(newToken);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    }
    localStorage.removeItem('eclipto_admin_token');
    setCurrentUser(null);
    setToken('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080104] text-white flex items-center justify-center font-mono">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF1053]" />
          <span className="text-xs uppercase tracking-widest text-white/60">
            Checking Administrator Session...
          </span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onBackToWebsite={onBackToWebsite}
      />
    );
  }

  return (
    <AdminDashboard
      user={currentUser}
      token={token}
      onLogout={handleLogout}
      onBackToWebsite={onBackToWebsite}
    />
  );
};
