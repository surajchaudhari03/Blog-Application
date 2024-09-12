import React, { useState } from 'react';
import { databases } from '../../../services/AppwriteService';
import conf from '../../../services/conf';

const styles = {
  input: 'block w-full p-2 border border-zinc-300 rounded-md focus:ring focus:ring-primary',
  button: 'bg-black hover:bg-gray-800 text-white p-2 mb-4 rounded-md',
  cancelButton: 'bg-zinc-300 text-zinc-700 hover:bg-zinc-400'
};



const AddCategoryForm = ({ fetchCategories }) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    try {
      const categoryData = { name: newCategoryName };
      await databases.createDocument(conf.appwriteDatabaseId, conf.CategoriesCollectionId, 'unique()', categoryData);
      // Fetch updated categories after successful creation
      await fetchCategories();
      setNewCategoryName('');
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };
  const handleShowCreateForm = () => {
    setShowCreateForm(true);
  };

  const handleHideCreateForm = () => {
    setShowCreateForm(false);
  };

  return (
    <div>
      {!showCreateForm ? (
        <button onClick={handleShowCreateForm} className={styles.button}>Create New Category</button>
      ) : (
        <form onSubmit={handleCreateCategory} >
          <h1 className="text-2xl font-bold mb-4">Add New Category</h1>
          <p className="text-muted-foreground mb-6">Create a new category to organize your blogs.</p>
          <label className="block text-sm font-medium text-zinc-700 mb-2" htmlFor="category-name">
            <span className="text-red-500">*</span> Category Name
          </label>
          <input
            type="text"
            id="category-name"
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Enter category name"
            className={styles.input} />
          <div className="mt-4">
            <button
              type="submit"
              className={styles.button}>
              + Add Category
            </button>
            <button
              onClick={handleHideCreateForm}
              className={`${styles.cancelButton} ${styles.button} ml-2`} >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default AddCategoryForm