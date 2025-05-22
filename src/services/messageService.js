import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

// Odeslání nové zprávy
export const sendMessage = async (messageData) => {
  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      ...messageData,
      createdAt: new Date().toISOString(),
      read: false
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error sending message: ", error);
    return { success: false, error };
  }
};

// Získání všech zpráv (pouze pro admina)
export const getMessages = async () => {
  try {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting messages: ", error);
    return [];
  }
};
