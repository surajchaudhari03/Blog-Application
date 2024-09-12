import React from "react";
import { Link } from "react-router-dom";
import getSanitizedParagraphContent from "../SanitizedContent";

const ArticleCard = ({ blog }) => {
    return (
        <article className="pb-4">

            <Link to={`/blogs/${blog.$id}`}>
                <img
                    src={blog.image}
                    alt={blog.imageAlt}
                    className="w-full h-48 object-cover mb-4"
                />
            </Link>
            <span className="bg-zinc-600 text-white px-2 mb-2 capitalize">{blog.category}</span>
            <Link to={`/blogs/${blog.$id}`}>
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
            </Link>
            <p className="text-gray-600 text-sm mb-2">
                <span>{blog.author},</span>{" "}
                <span className="text-gray-400 text">{new Date(blog.createdAt).toDateString("en-US")}</span>
            </p>

            {/* Render the extracted and limited paragraph content */}
            <p className="text-gray-700">
                {getSanitizedParagraphContent(blog.content, 100)}
            </p>
        </article>
    );
};

export default ArticleCard;