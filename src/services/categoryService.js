import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';

// Get all categories
const getCategories = async () => {
  try {
    const categoriesRef = collection(db, 'categories');
    const q = query(categoriesRef, orderBy('name'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting categories: ", error);
    throw error;
  }
};

// Add new category
const addCategory = async (categoryData) => {
  try {
    const docRef = await addDoc(collection(db, 'categories'), {
      ...categoryData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding category: ", error);
    throw error;
  }
};

// Update category
const updateCategory = async (id, categoryData) => {
  try {
    const categoryRef = doc(db, 'categories', id);
    await updateDoc(categoryRef, {
      ...categoryData,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating category: ", error);
    throw error;
  }
};

// Delete category
const deleteCategory = async (id) => {
  try {
    await deleteDoc(doc(db, 'categories', id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting category: ", error);
    throw error;
  }
};

export {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory
};
