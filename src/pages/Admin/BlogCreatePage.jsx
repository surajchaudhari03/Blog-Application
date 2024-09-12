import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { databases, storage } from '../../services/AppwriteService';
import conf from '../../services/conf';
import JoditEditor from 'jodit-react';
import AppwriteFunctions from '../../services/AppwriteFunctions';

const styles = {
  label: 'block text-sm font-medium mb-2',
  input: 'outline-none mt-1 block w-full p-2 border rounded-md',
  createButton: 'bg-black hover:bg-gray-800 text-white text-sm p-2 rounded-md',
  cancelButton: 'bg-zinc-300 text-zinc-700 hover:bg-zinc-400 text-sm rounded-md p-2'
};

const BlogCreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState({
    imageUrl: '',
    imageId: ''
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const editor = useRef(null);

  useEffect(() => {
    AppwriteFunctions.listCategories(setCategories)
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Get the uploaded file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const blogData = {
        title,
        content,
        author,
        image: image.imageUrl,  // Store the file URL in the document
        category: selectedCategory,
        createdAt: new Date().toLocaleString(),
      };

      await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.BlogsCollectionId,
        'unique()',
        blogData
      );

      if (image) {
        // Upload image to Appwrite storage
        const fileResponse = await storage.createFile(conf.BlogImagesBucketId, 'unique()', image);
        image.imageId = fileResponse.$id; // Store the image file ID

        // Generate the image URL using getFileView
        image.imageUrl = storage.getFileView(conf.BlogImagesBucketId, fileResponse.$id);
      }

      alert('Blog created successfully!');
      navigate('/admin/blogs');

    } catch (error) {
      console.error('Error creating blog:', error);
      alert('An error occurred while creating the blog. Please try again.');
    }
  };


  const handleCancel = () => {
    navigate('/admin/blogs');
  };

  return (
    <section id='main' className="max-w-7xl mx-auto p-6 rounded-lg">
      <h1 className="text-3xl font-semibold mb-4">Create Blog</h1>
      <p className="text-sm mb-6">Create a new blog post by filling out the form below.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className={styles.label}><span className='text-red-500'>*</span> Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className="mb-4">
          <JoditEditor
            ref={editor}
            value={content}
            onChange={newContent => setContent(newContent)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className={styles.label}><span className='text-red-500'>*</span> Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div>
          <label>Upload Image</label>
          <input type="file" onChange={handleImageChange} />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className={styles.label}><span className='text-red-500'>*</span> Category</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
            className="outline-none bg-zinc-100 px-3 py-1 rounded-md"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.$id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center mt-12">
          <button type="submit" className={styles.createButton}>Create Blog</button>
          <button
            onClick={handleCancel}
            className={`${styles.cancelButton} ml-3`} >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default BlogCreatePage;