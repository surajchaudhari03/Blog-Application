import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { databases } from '../../services/AppwriteService';
import conf from '../../services/conf';
import { Query } from 'appwrite';

const styles = {
  createButton: 'bg-black hover:bg-gray-700 text-white p-2 mt-4 md:m-0 rounded-md',
  editButton: 'border border-zinc-600 text-zinc-600 hover:bg-zinc-500 hover:text-black mr-3 rounded-md px-4 py-1'
};

const TableCell = ({ children }) => {
  return <td className='border-b p-4'>{children}</td>;
};

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogResponse = await databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.BlogsCollectionId,
          [Query.orderDesc('createdAt')]
        );

        const categoryResponse = await databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.CategoriesCollectionId
        );

        setBlogs(blogResponse.documents);
        setCategories(categoryResponse.documents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const categoryMatches = !filterCategory || blog.category === filterCategory || (blog.relatedCategories && blog.relatedCategories.includes(filterCategory));
      const searchMatches = !searchTerm || blog.title.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatches && searchMatches;
    });
  }, [blogs, filterCategory, searchTerm]);

  const handleBlogCreation = () => {
    navigate('/admin/blogs/create');
  }

  return (
    <section className='flex justify-center'>
      <div className="w-full md:w-2/3">
        <h1 className='text-2xl font-bold'>Blogs Management</h1>
        <div className='flex flex-wrap justify-between my-8'>
          <div className=''>
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='bg-zinc-100 px-2 py-1 mr-1 outline-none'
            />
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className='bg-zinc-100 px-2 py-1 outline-none'
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.$id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleBlogCreation} className={styles.createButton}>Create New Blog</button>
        </div>
        <table className='min-w-full'>
          <thead>
            <tr className="font-bold bg-zinc-100">
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.map(blog => (
              <tr key={blog.$id}>
                <TableCell>
                  <Link to={`/blogs/${blog.$id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>
                  <Link to={`/admin/blogs/${blog.$id}/edit`} className={styles.editButton}>Edit</Link>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default BlogListPage;