import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppwriteFunctions from "../../../services/AppwriteFunctions";

const Latest = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        AppwriteFunctions.listBlogs(setBlogs)


      } catch (error) {
        console.error('Error fetching latest blogs:', error);
      }
    };

    fetchLatestBlogs();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-0 pt-4 pb-12 flex flex-wrap border-b  border-zinc-600">
      {blogs.length > 0 && (
        <section
          className="relative w-full md:w-1/2 h-96 md:h-auto"
          style={{ backgroundImage: `url(${blogs[0].image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
        >
          <article className="absolute bottom-0 left-0 text-white p-4">
            <span className="bg-zinc-600 text-xs px-2 py-0.5 mb-2 uppercase">{blogs[0].category}</span>

            <Link to={`/blogs/${blogs[0].$id}`}>
              <h2 className="text-2xl font-bold">{blogs[0].title}</h2>
            </Link>
            <p className="text-sm mt-2">
              <span className="mr-2">{blogs[0].author},</span>
              <span>{new Date(blogs[0].createdAt).toLocaleString()}</span>
            </p>
          </article>
        </section>
      )
      }
      <section className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-4 flex flex-col justify-between">
        {blogs.slice(1, 4).map((blog, index) => (
          <article key={blog.$id} className={`flex ${index !== blogs.slice(1, 4).length - 1 ? 'mb-4' : ''} flex-1`}>
            <div className="w-1/3">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            </div>
            <div className="ml-4 flex-1">
              <span className={`bg-zinc-600 text-xs text-white px-2 py-0.5 mb-2 uppercase`}>{blog.category}</span>
              <Link to={`/blogs/${blog.$id}`} >
                <h3 className="text-lg font-bold">{blog.title}</h3>
              </Link>
              <p className="text-sm">{new Date(blog.createdAt).toLocaleString()}</p>
            </div>
          </article>
        ))}
      </section>
    </section >
  );
};

export default Latest;