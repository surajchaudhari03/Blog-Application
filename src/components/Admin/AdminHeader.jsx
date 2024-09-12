import React, { useState } from 'react'
import ProfileLogo from '../../assets/profile-logo.jpeg'
import BlogLogo from '../../assets/blog-logo.png'
import { Link } from 'react-router-dom'

const styles = {
    navbar: 'fixed top-0 bg-white flex p-4 border-b z-50',
    links: 'text-black text-md hover:text-zinc-500 text-nowrap ml-8',
    mobileMenu: 'block px-4 text-zinc-700 cursor-pointer'
}

const AdminHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className='fixed top-0 w-full'>
            <nav className='flex justify-between py-4 px-8   bg-red-100'>
                <div className="flex items-center">
                    <Link to='/admin'><img aria-hidden="true" alt="logo" src={BlogLogo} className="h-10 w-10" /></Link>
                </div>
                <div className="hidden md:flex">
                    <a href="/admin/blogs" className={styles.links}>
                        Manage Blogs
                    </a>
                    <a href="/admin/categories" className={styles.links}>
                        Manage Categories
                    </a>
                    <a href="/admin/queries" className={styles.links}>
                        Manage Queries
                    </a>
                    <a href="/admin/profile" className={`${styles.links} flex align-middle`}>
                        Profile
                        <img src={ProfileLogo} alt="logo" className='w-8 h-8 rounded-full ml-1' />
                    </a>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        <i className="fas fa-bars text-gray-600"></i>
                    </button>
                </div>
                {menuOpen && (
                    <>
                        {/* overlay styles */}
                        <div className='fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 z-40 md:hidden' />

                        <div className="absolute right-6 top-1 mt-2 w-48 flex flex-col justify-center text-center bg-slate-200 shadow-lg rounded-md py-10 z-50 md:hidden">
                            <div className="absolute top-1 right-2 flex text-center">
                                <i
                                    className="fas fa-times text-black text-xl cursor-pointer"
                                    onClick={() => setMenuOpen(false)}
                                ></i>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <a href="/admin/blogs" className={styles.mobileMenu}>
                                    Manage Blogs
                                </a>
                                <a href="/admin/categories" className={styles.mobileMenu}>
                                    Manage Categories
                                </a>
                                <a href="/admin/queries" className={styles.mobileMenu}>
                                    Manage Queries
                                </a>
                                <a href="/admin/profile" className={styles.mobileMenu} >
                                    Profile
                                </a>
                            </div>
                        </div>
                    </>
                )}
            </nav>
        </header>
    )
}

export default AdminHeader;