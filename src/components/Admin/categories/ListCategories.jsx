import React, { useState } from 'react';
import { databases } from '../../../services/AppwriteService';
import conf from '../../../services/conf';

const styles = {
    button: 'p-2 rounded',
    accentButton: 'border border-zinc-600 text-zinc-600 hover:bg-zinc-500 hover:text-black mr-3 rounded-md px-4 py-1',
    deleteButton: 'border border-red-500 text-red-500 rounded-md px-4 py-1 hover:bg-red-500 hover:text-black',
    tableCell: 'border-b p-4',
};

const TableCell = ({ children }) => {
    return <td className={styles.tableCell}>{children}</td>;
};

const ListCategories = ({ categories, setCategories, setIsEmpty }) => {
    const [editedCategory, setEditedCategory] = useState({});

    const handleDeleteCategory = async (categoryId) => {
        try {
            await databases.deleteDocument(conf.appwriteDatabaseId, conf.CategoriesCollectionId, categoryId);
            const updatedCategories = categories.filter((category) => category.$id !== categoryId);
            setCategories(updatedCategories);
            setIsEmpty(updatedCategories.length === 0);
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleEditClick = (category) => {
        setEditedCategory(category);
    };

    const handleEditCategory = async (categoryId, newName) => {
        try {
            await databases.updateDocument(conf.appwriteDatabaseId, conf.CategoriesCollectionId, categoryId, { name: newName });
            const updatedCategories = categories.map((category) => (category.$id === categoryId ? { ...category, name: newName } : category));
            setCategories(updatedCategories);
            setEditedCategory({});
        } catch (error) {
            console.error('Error editing category:', error);
        }
    };

    return (
        <table className="min-w-full">
            <thead>
                <tr className="font-bold bg-zinc-100">
                    <TableCell>Name</TableCell>
                    <TableCell>Actions</TableCell>
                </tr>
            </thead>
            <tbody>
                {categories.map((category) => (
                    <tr>
                        <TableCell>
                            {editedCategory.$id === category.$id ? (
                                <input id='input'
                                    type="text"
                                    value={editedCategory.name}
                                    onChange={(e) => setEditedCategory({ ...editedCategory, name: e.target.value })}
                                    className='outline-none border-b border-zinc-500'
                                />
                            ) : (
                                <p>{category.name}</p>
                            )}
                        </TableCell>
                        <TableCell>
                                {editedCategory.$id === category.$id ? (
                                    <button className={styles.accentButton} onClick={() => handleEditCategory(category.$id, editedCategory.name)}>Save</button>
                                ) : (
                                    <button className={styles.accentButton} onClick={() => handleEditClick(category)}>🖊  Edit</button>
                                )}
                                {editedCategory.$id !== category.$id && (
                                    <button className={styles.deleteButton} onClick={() => handleDeleteCategory(category.$id)}>🗑 Delete</button>
                                )}
                        </TableCell>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ListCategories;