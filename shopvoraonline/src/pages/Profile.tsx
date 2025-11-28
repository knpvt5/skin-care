import React from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const fullName = user.user_metadata.full_name || 'User';
  const email = user.email;
  const initial = fullName.charAt(0).toUpperCase();

  return (
    <Layout>
      <SEO title="My Profile" description="Manage your account" />
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
          <h1 className="text-2xl font-serif font-bold text-stone-900 mb-8 text-center">My Profile</h1>
          
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl font-serif font-bold text-rose-600">{initial}</span>
            </div>
            
            <div className="text-center space-y-2 w-full">
              <div>
                <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">Full Name</label>
                <p className="text-lg font-medium text-stone-900">{fullName}</p>
              </div>
              
              <div className="pt-4 border-t border-stone-100">
                <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">Email Address</label>
                <p className="text-lg font-medium text-stone-900">{email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
