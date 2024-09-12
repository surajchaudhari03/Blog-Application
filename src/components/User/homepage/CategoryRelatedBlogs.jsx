import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleCard from '../ArticleCard';
import AppwriteFunctions from '../../../services/AppwriteFunctions';

const CategoryRelatedBlogs = () => {
    const [categories, setCategories] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        AppwriteFunctions.listCategories(setCategories)
        AppwriteFunctions.listBlogs(setBlogs)
    }, []);

    const handleCategoryClick = (category) => {
        navigate(`/categories/${category.name}/blogs`);
    };

    return (
        <section>
            {categories.map((category) => {
                const relatedBlogs = blogs.filter((blog) => blog.category === category.name);
                if (relatedBlogs.length === 0) {
                    return null;
                }

                return (
                    <div className=" max-w-6xl mx-auto px-4 py-8 border-b">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-4xl text-slate-800 font-bold title capitalize">{category.name}</h2>
                            <button
                                onClick={() => handleCategoryClick(category)}
                                className=" text-slate-800 font-semibold hover:text-blue-600"
                            >
                                View All <i className="fas fa-arrow-right"></i>
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedBlogs.slice(0, 3).map((blog, index) => (
                                <ArticleCard key={index} blog={blog} />
                            ))}
                        </div>
                    </div>
                );
            })}

        </section>
    );
};

export default CategoryRelatedBlogs;