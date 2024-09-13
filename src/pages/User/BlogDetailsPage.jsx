import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { databases } from '../../services/AppwriteService';
import conf from '../../services/conf';
import DOMPurify from 'dompurify';
import '../../App.css'

const BlogDetailsPage = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await databases.getDocument(conf.appwriteDatabaseId, conf.BlogsCollectionId, blogId);
        setBlog(response);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  // Sanitize the content before rendering
  const sanitizedContent = DOMPurify.sanitize(blog.content);

  return (
    <main className='flex justify-center'>
      <div className='max-w-6xl p-4 md:p-16'>
        <h1 className='font-semibold text-4xl'>{blog.title}</h1>
        <p className='mt-2'>By {blog.author}</p>
        <p>{new Date(blog.createdAt).toLocaleString()}</p>
        <div className='w-full object-cover box-border my-10'>
          {/* Display the image if the blog has an image */}
          {blog.image && <img src={blog.image} alt={blog.title} />}
        </div>

        {/* Render sanitized HTML content */}
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      </div>
    </main>
  );
};

export default BlogDetailsPage;