import React from "react";

const Footer = () => {
    const links = [
        {
            name: "HOME",
            route: "/"
        },
        {
            name: "ABOUT",
            route: "/about"
        },
        {
            name: "CONTACT", 
            route: "/contact"
        },
    ];
    const socialLinks = [
        { href: "https://www.linkedin.com/in/surajchaudhari03/", icon: "fab fa-linkedin" },
        { href: "https://github.com/theprogramer86", icon: "fab fa-github" }
    ];

    return (
        <footer className="w-full relative bottom-0 text-center py-4 mt-8 border-t border-zinc-400 bg-gray-200">
            <nav className="mb-4">
                <ul className="flex justify-center space-x-6 text-gray-400">
                    {links.map((link, index) => (
                        <li key={index}>
                            <a href={link.route} className="hover:underline">
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="flex justify-center space-x-4 mb-4">
                {socialLinks.map((social, index) => (
                    <a key={index} href={social.href} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-300">
                        <i className={social.icon}></i>
                    </a>
                ))}
            </div>
            <p className="text-gray-500 text-sm">
                Copyright ©2024 All rights reserved | made with <i className="fas fa-heart text-gray-500"></i> by <a href="https://github.com/theprogramer86" className="text-blue-400 hover:text-blue-200">theprogrammer86</a>
            </p>
        </footer>
    );
};

export default Footer;