import { db } from './config';
import { collection, addDoc, getDoc } from 'firebase/firestore';

export async function testFirestore() {
  const testCol = collection(db, 'test');
  const docRef = await addDoc(testCol, { message: 'Hello Firestore!', timestamp: Date.now() });
  const snap = await getDoc(docRef);
  return snap.exists() ? snap.data() : null;
} 