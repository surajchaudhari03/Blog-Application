import React, { useState, useEffect } from 'react';
import AddCategoryForm from '../../components/Admin/categories/AddCategoryForm';
import ListCategories from '../../components/Admin/categories/ListCategories';
import AppwriteFunctions from '../../services/AppwriteFunctions';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const fetchCategories = async () => {
    AppwriteFunctions.listCategories(setCategories)
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section>
      <div className='w-full md:w-2/3 mx-auto'>
        <h1 className="text-2xl font-bold">Category Management</h1>
        <p className="my-5">As an admin, you can manage categories here.</p>
        <AddCategoryForm fetchCategories={() => fetchCategories()} />
        {isEmpty ? (
          <p>No categories found.</p>
        ) : (
          <ListCategories categories={categories} setCategories={setCategories} setIsEmpty={setIsEmpty} />
        )}
      </div>
    </section>
  );
};


export default CategoriesPage;