import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { databases, storage } from '../../services/AppwriteService';
import conf from '../../services/conf';

const styles = {
  label: 'block text-sm font-medium mb-2',
  input: 'outline-none mt-1 block w-full p-2 border rounded-md',
  createButton: 'border border-zinc-700 hover:bg-black hover:text-white text-sm p-2 rounded-md',
  deleteButton: 'border border-red-500 text-sm text-red-500 rounded-md px-4 py-1 hover:bg-red-500 hover:text-black'
};

const BlogEditPage = () => {
  const editor = useRef(null);
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState({
    imageUrl: '',
    imageId: ''
  }); 
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newImage, setNewImage] = useState(null); // Track new image file

  useEffect(() => {
    const fetchBlogAndCategories = async () => {
      try {
        const [blogResponse, categoriesResponse] = await Promise.all([
          databases.getDocument(conf.appwriteDatabaseId, conf.BlogsCollectionId, blogId),
          databases.listDocuments(conf.appwriteDatabaseId, conf.CategoriesCollectionId),
        ]);

        // Set blog data
        setBlog(blogResponse);
        setTitle(blogResponse.title);
        setContent(blogResponse.content);
        setAuthor(blogResponse.author);
        setSelectedCategory(blogResponse.category);
        setImage({ 
          imageUrl: blogResponse.image, 
          imageId: blogResponse.imageId || '' 
        });

        // Set categories
        setCategories(categoriesResponse.documents);
      } catch (error) {
        console.error('Error fetching blog or categories:', error);
        alert('Something went wrong. Please try again later.');
      }
    };

    fetchBlogAndCategories();
  }, [blogId]);

  console.log(blog);  // added because netlify giving error as " 'blog' is assigned a value but never used" 

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = image.imageUrl;
    let imageId = image.imageId;

    if (newImage) {
      // If there's a new image, delete the old one (if it exists)
      if (imageId) {
        await storage.deleteFile(conf.BlogImagesBucketId, imageId);
      }
      // Upload the new image
      const fileResponse = await storage.createFile(conf.BlogImagesBucketId, 'unique()', newImage);
      imageId = fileResponse.$id;
      imageUrl = storage.getFileView(conf.BlogImagesBucketId, imageId);
    }

    const updatedBlog = {
      title,
      content,
      author,
      image: imageUrl, // Update with the new image URL or keep the old one
      category: selectedCategory,
      createdAt: new Date().toDateString(),
    };

    try {
      await databases.updateDocument(conf.appwriteDatabaseId, conf.BlogsCollectionId, blogId, updatedBlog);
      alert('Blog updated successfully!');
      navigate('/admin/blogs');
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('An error occurred while updating the blog. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        // Delete the blog image if it exists
        if (image.imageId) {
          await storage.deleteFile(conf.BlogImagesBucketId, image.imageId);
        }
        await databases.deleteDocument(conf.appwriteDatabaseId, conf.BlogsCollectionId, blogId);
        navigate('/admin/blogs');
        setTimeout(() => {
          alert('Blog deleted successfully!');
        }, 100);
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  return (
    <section className="max-w-7xl mx-auto p-6 bg-card rounded-lg">
      <h1 className="text-3xl font-semibold mb-4">Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className={styles.label}><span className="text-red-500">*</span> Title</label>
          <input
            type="text"
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
          <label htmlFor="author" className={styles.label}><span className="text-red-500">*</span> Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className="mb-4">
          <label className={styles.label}><span className="text-red-500">*</span> Current Image</label>
          {image.imageUrl && <img src={image.imageUrl} alt="Blog" className="mb-4 w-64 h-auto" />}
          <input
            type="file"
            onChange={e => setNewImage(e.target.files[0])} // Set new image when uploaded
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className={styles.label}><span className="text-red-500">*</span> Category</label>
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
          <button type="submit" className={styles.createButton}>Update Blog</button>
          <button
            type="button"
            onClick={handleDelete}
            className={`${styles.deleteButton} ml-3`} >
            Delete
          </button>
        </div>
      </form>
    </section>
  );
};

export default BlogEditPage;
