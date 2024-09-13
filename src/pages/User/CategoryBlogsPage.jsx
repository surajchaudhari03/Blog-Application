import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppwriteFunctions from '../../services/AppwriteFunctions';
import getSanitizedParagraphContent from '../../components/SanitizedContent';

const CategoryBlogsPage = () => {
  const [category, setCategory] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]); // Add a state for categories
  const { categoryName } = useParams(); // Capture categoryName from URL params

  const fetchCategories = async () => {
    const categoriesData = await AppwriteFunctions.listCategories(setCategories);
    return categoriesData;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategoryAndBlogs = async () => {
      try {
        // Fetch particular category and blog related to that category
        // (if use fetchCategories() that will not show blog data)
        AppwriteFunctions.listCategories(async (categories) => {
          const category = categories.find((cat) => cat.name === categoryName);
          if (!category) {
            console.error('Category not found');
            return;
          }
          setCategory(category);

          // Get blogs data using AppwriteFunctions
          AppwriteFunctions.listBlogs(async (blogs) => {
            // Filter the blogs to only include those related to the current category
            const relatedBlogs = blogs.filter((blog) => blog.category === category.name);

            // Updating the blogs state with the filtered blog data
            setBlogs(relatedBlogs);
          });
        });
      } catch (error) {
        console.error('Error fetching category and blogs:', error);
      }
    };

    fetchCategoryAndBlogs();
  }, [categoryName]);

  return (
    <div className="max-w-6xl mx-auto flex flex-col justify-center  px-4 md:flex-row gap-8">
      <section className="full md:w-2/3 mx-auto md:pr-8 border-r border-zinc-200 ">
        <h1 className="heading-font capitalize text-5xl font-bold text-blue-700 m-8">{category?.name}</h1>
        <hr className="mb-4" />

        {blogs.map((blog) => (
          <article key={blog.$id} className="bg-white p-4 mb-4">
            <img src={blog.image} alt={blog.title} className="w-full mb-4" />
            <Link to={`/blogs/${blog.$id}`}>
              <h2 className="heading-font capitalize text-3xl font-semibold text-slate-700 mb-2">{blog.title}</h2>
            </Link>
            <span className="text-blue-700 capitalize">{blog.category}</span>
            <p className='my-4'>{getSanitizedParagraphContent(blog.content, 200)}</p>
            <Link to={`/blogs/${blog.$id}`} >
              <span className="text-blue-700">Read More »</span>
            </Link>
          </article>
        ))}
      </section>
      <section className="full md:w-1/3 px-4 py-8 shadow-white border-t border-zinc-400 md:border-0">
        <div className="mb-8">
          <h2 className="font-serif text-xl font-bold text-slate-700 mb-4">Recent Posts</h2>
          <ul className="text-blue-700">
            {blogs.map((blog) => (
              <Link to={`/blogs/${blog.$id}`}>
                <li key={blog.$id} className='my-3 hover:text-black'>
                  {blog.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold text-gray-800 mb-4">Categories</h2>
          <ul className="text-blue-700">
            {categories.map((category) => (
              <Link to={`/categories/${category.name}/blogs`}>
                <li key={category.$id} className='my-2 hover:text-black'>
                  {category.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CategoryBlogsPage;