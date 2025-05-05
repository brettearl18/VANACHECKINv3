'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export default function FirebaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, 
        (user) => {
          setConnectionStatus('connected');
          console.log('Firebase connection successful:', user ? 'User logged in' : 'No user logged in');
        },
        (error) => {
          setConnectionStatus('error');
          setError(error.message);
          console.error('Firebase connection error:', error);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      setConnectionStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Firebase initialization error:', err);
    }
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto mt-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Firebase Connection Test</h2>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              connectionStatus === 'checking' ? 'bg-yellow-400' :
              connectionStatus === 'connected' ? 'bg-green-400' :
              'bg-red-400'
            }`}></div>
            <span className="font-medium">
              {connectionStatus === 'checking' ? 'Checking connection...' :
               connectionStatus === 'connected' ? 'Connected to Firebase' :
               'Connection failed'}
            </span>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded">
              <p className="font-medium">Error:</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="text-sm text-gray-600">
            <p>Project ID: vanacheckinv3</p>
            <p>Auth Domain: vanacheckinv3.firebaseapp.com</p>
          </div>
        </div>
      </div>
    </div>
  );
} 