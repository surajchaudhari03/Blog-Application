import React, { useEffect, useState } from 'react';
import AppwriteFunctions from '../../../services/AppwriteFunctions';
import Seachbar from './Searchbar';
import Siderbar from './Siderbar';

const UserHeader = () => {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        AppwriteFunctions.listCategories(setCategories);
        AppwriteFunctions.listBlogs(setBlogs);
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full h-20 bg-white shadow p-4 flex justify-between items-center z-50">
            <div className="flex items-center">
                <div className="bg-black text-white p-2 rounded-full cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <i className="fas fa-bars"></i>
                </div>
                <Seachbar blogs={blogs} />
            </div>
            {sidebarOpen && (
                <Siderbar categories={categories} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            )}
        </header>
    );
}

export default UserHeader;