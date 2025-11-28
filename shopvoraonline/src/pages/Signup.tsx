import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Loader2, CheckCircle } from 'lucide-react';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const [resendLoading, setResendLoading] = useState(false);

  const handleResendEmail = async () => {
    setResendLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });
      if (error) throw error;
      alert('Verification email sent!');
    } catch (err: any) {
      alert('Error sending email: ' + err.message);
    } finally {
      setResendLoading(false);
    }
  };

  if (success) {
    return (
      <Layout>
        <SEO title="Sign Up" description="Create a new account" />
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-stone-900 mb-4">Check your email</h1>
            <p className="text-stone-600 mb-8">
              We've sent a verification link to <span className="font-semibold text-stone-900">{email}</span>. 
              Please click the link to verify your account and log in.
            </p>
            <div className="space-y-3">
              <Link 
                to="/login" 
                className="block w-full py-3 bg-stone-900 text-white font-bold rounded-lg hover:bg-stone-800 transition-colors"
              >
                Return to Login
              </Link>
              <button
                onClick={handleResendEmail}
                disabled={resendLoading}
                className="block w-full py-3 bg-white text-stone-600 font-medium rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors disabled:opacity-70 cursor-pointer"
              >
                {resendLoading ? 'Sending...' : 'Resend Verification Email'}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title="Sign Up" description="Create a new account" />
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
          <h1 className="text-3xl font-serif font-bold text-stone-900 mb-6 text-center">Create Account</h1>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                minLength={6}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                minLength={6}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-stone-900 text-white font-bold rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-70 flex justify-center cursor-pointer"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Sign Up'}
            </button>
          </form>

          <p className="mt-6 text-center text-stone-600">
            Already have an account?{' '}
            <Link to="/login" className="text-rose-600 font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
