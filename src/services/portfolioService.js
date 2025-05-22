import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, where } from 'firebase/firestore';

// Get all portfolio items
const getPortfolioItems = async (categoryId = null) => {
  try {
    const portfolioRef = collection(db, 'portfolio');
    let q;
    
    if (categoryId) {
      q = query(
        portfolioRef,
        where('categoryIds', 'array-contains', categoryId),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(portfolioRef, orderBy('createdAt', 'desc'));
    }
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting portfolio items: ", error);
    throw error;
  }
};

// Add new portfolio item
const addPortfolioItem = async (itemData) => {
  try {
    const docRef = await addDoc(collection(db, 'portfolio'), {
      ...itemData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding portfolio item: ", error);
    throw error;
  }
};

// Update portfolio item
const updatePortfolioItem = async (id, itemData) => {
  try {
    const itemRef = doc(db, 'portfolio', id);
    await updateDoc(itemRef, {
      ...itemData,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating portfolio item: ", error);
    throw error;
  }
};

// Delete portfolio item
const deletePortfolioItem = async (id) => {
  try {
    await deleteDoc(doc(db, 'portfolio', id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting portfolio item: ", error);
    throw error;
  }
};

// Get portfolio items by category
const getPortfolioItemsByCategory = async (categoryId) => {
  try {
    const portfolioRef = collection(db, 'portfolio');
    const q = query(
      portfolioRef,
      where('categoryIds', 'array-contains', categoryId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting portfolio items by category: ", error);
    throw error;
  }
};

export {
  getPortfolioItems,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  getPortfolioItemsByCategory
};
