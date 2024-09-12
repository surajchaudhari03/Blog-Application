import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Searchbar({ blogs }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const navigate = useNavigate();

    const searchResultsRef = useRef(null);

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredBlogs([]);
        } else {
            const filtered = blogs.filter((blog) =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredBlogs(filtered);
            setSelectedIndex(-1);
        }
    }, [searchTerm, blogs]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (selectedIndex >= 0 && selectedIndex < filteredBlogs.length) {
                navigate(`/blogs/${filteredBlogs[selectedIndex].$id}`);
            }
        } else if (event.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) => (prevIndex + 1) % filteredBlogs.length);
        } else if (event.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) => (prevIndex - 1 + filteredBlogs.length) % filteredBlogs.length);
        }
    };

    const handleClickOutside = (event) => {
        if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
            setFilteredBlogs([]);
        }
    };

    useEffect(() => {
        if (filteredBlogs.length > 0) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [filteredBlogs]);

    return (
        <div className="w-2/3 flex items-center space-x-2 md:mb-0">
            <i
                className="fas fa-search text-gray-400 cursor-pointer relative bottom-1 left-6"
                onClick={() => setSearchTerm(searchTerm)}
            ></i>
            <input
                type="text"
                placeholder="Search..."
                className="text-zinc-600 font-semibold border-b border-gray-600 focus:outline-none px-6 bg-transparent pb-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
            />

            {filteredBlogs.length > 0 && (
                <ul ref={searchResultsRef} className="max-w-md absolute top-16 left-4 right-0 p-4 bg-white shadow-md z-50">
                    {filteredBlogs.map((blog, index) => (
                        <li
                            key={index}
                            className={`mb-4 ${selectedIndex === index ? 'bg-gray-200' : ''}`}
                        >
                            <Link to={`/blogs/${blog.$id}`}>
                                <h2 className="text-sm font-bold mb-2">{blog.title}</h2>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
}

export default Searchbar;