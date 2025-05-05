import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAd7UXVmRnjKlkKS1QarP8h9pF3tVUJ0EM",
  authDomain: "vanacheckinv3.firebaseapp.com",
  projectId: "vanacheckinv3",
  storageBucket: "vanacheckinv3.firebasestorage.app",
  messagingSenderId: "227509919265",
  appId: "1:227509919265:web:d0a4709cf42af13a654d60",
  measurementId: "G-9TN7Q0Y13L"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);

export { app, db, analytics, auth }; 