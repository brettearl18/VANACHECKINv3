import { db } from './config';
import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export async function getUsers() {
  const usersCol = collection(db, 'users');
  const userSnapshot = await getDocs(usersCol);
  return userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function createUser(data: any) {
  const usersCol = collection(db, 'users');
  const docRef = await addDoc(usersCol, data);
  return { id: docRef.id, ...data };
}

export async function updateUser(id: string, data: any) {
  const userDoc = doc(db, 'users', id);
  await updateDoc(userDoc, data);
}

export async function deleteUser(id: string) {
  const userDoc = doc(db, 'users', id);
  await deleteDoc(userDoc);
} 