import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import logo from '../assets/logo.png';

// Footer redesigned to match the provided screenshot: brand + socials, Explore, Resources, Newsletter.
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="bg-neutral text-neutral-content rounded-box">
      <footer className="footer sm:footer-horizontal p-10">
        {/* Brand + Socials */}
        <aside>
          <div className="flex items-center gap-3 mb-2">
            <img src={logo} alt="The Dragon News" className="w-9 h-9 object-contain" />
            <h2 className="text-xl font-semibold">The Dragon News</h2>
          </div>
          <p className="max-w-xs opacity-80">
            Discover, organize, and enjoy news you love.
          </p>
          <div className="flex items-center gap-4 mt-4 text-xl">
            <a href="https://github.com/tro003x" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary">
              <FaGithub />
            </a>
            <a href="https://twitter.com/tro003x" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary">
              <FaTwitter />
            </a>
            <a href="https://instagram.com/_orit_ro_" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary">
              <FaInstagram />
            </a>
          </div>
        </aside>

        {/* Explore */}
        <nav>
          <h6 className="footer-title">Explore</h6>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `link link-hover ${isActive ? 'text-white font-semibold' : 'opacity-90 hover:text-white'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `link link-hover ${isActive ? 'text-white font-semibold' : 'opacity-90 hover:text-white'}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `link link-hover ${isActive ? 'text-white font-semibold' : 'opacity-90 hover:text-white'}`
            }
          >
            Blog
          </NavLink>
        </nav>

        {/* Resources */}
        <nav>
          <h6 className="footer-title">Resources</h6>
          <NavLink
            to="/resources/getting-started"
            className={({ isActive }) =>
              `link link-hover ${isActive ? 'text-white font-semibold' : 'opacity-90 hover:text-white'}`
            }
          >
            Getting started
          </NavLink>
          <NavLink
            to="/resources/faq"
            className={({ isActive }) =>
              `link link-hover ${isActive ? 'text-white font-semibold' : 'opacity-90 hover:text-white'}`
            }
          >
            FAQ
          </NavLink>
          <NavLink
            to="/resources/support"
            className={({ isActive }) =>
              `link link-hover ${isActive ? 'text-white font-semibold' : 'opacity-90 hover:text-white'}`
            }
          >
            Support
          </NavLink>
        </nav>

        {/* Newsletter */}
        <form>
          <h6 className="footer-title">Newsletter</h6>
          <p className="opacity-80 mb-2 max-w-xs">Get updates, no spam.</p>
          <fieldset className="form-control w-80 max-w-xs">
            <label className="label" htmlFor="newsletter-email">
              <span className="label-text text-neutral-content">Your email</span>
            </label>
            <div className="join">
              <input id="newsletter-email" type="email" placeholder="you@example.com" className="input input-bordered join-item w-full" />
              <button type="button" className="btn btn-primary join-item">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </footer>

      <div className="border-t border-base-100/20 mt-2 py-4 text-center text-sm opacity-70">
        © {year} The Dragon News. All rights reserved.
        <span className="mx-2">•</span>
        Built by Auritro Bin Islam
      </div>
    </div>
  );
};

export default Footer;
