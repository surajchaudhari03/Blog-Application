import React, { useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Siderbar({ categories, sidebarOpen, setSidebarOpen }) {
    const sidebarRef = useRef(null);
    const navigate = useNavigate();

    const handleClickOutside = useCallback((event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setSidebarOpen(false);
        }
    }, [sidebarRef, setSidebarOpen]);

    useEffect(() => {
        if (sidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidebarOpen, handleClickOutside]);

    const handleHomeClick = () => {
        setSidebarOpen(false);
        navigate('/')
    }

    const handleCategoryClick = (category) => {
        setSidebarOpen(false);
        navigate(`/categories/${category.name}/blogs`);
    };

    return (
        <nav>
            <div ref={sidebarRef} className="fixed top-0 left-0 w-48 h-full bg-white shadow-lg rounded-lg z-10 flex flex-col justify-between">
                <div>
                    <div className="flex justify-end p-4">
                        <div className="bg-gray-200 p-2 rounded-full cursor-pointer" onClick={() => setSidebarOpen(false)}>
                            <i className="fas fa-times"></i>
                        </div>
                    </div>
                    <ul className="mt-4">
                        <li className="py-1 cursor-pointer bg-gray-50 p-4 mb-3 hover:bg-gray-100" onClick={handleHomeClick}>
                            <i className="fas fa-home"></i> Home
                        </li>
                        <h3 className='font-bold p-4 pb-2'>Categories</h3>
                        {categories.map((category, index) => (
                            <li
                                key={index}
                                className="py-1 px-4 cursor-pointer hover:text-blue-300"
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="p-4 border-t">
                    <div className="cursor-pointer">
                        <Link to={`/admin`}>
                            <i className="fas fa-sign-in-alt"></i> Admin Login
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Siderbar;