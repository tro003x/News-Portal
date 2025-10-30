import React from "react";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

const FindUs = () => {
  return (
    <div className="font-bold text-accent mt-8">
      Find Us on
      <div>
        <div className="join join-vertical w-full mt-2">
          <a
            href="https://github.com/tro003x"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Github"
            className="btn join-item justify-start bg-base-100"
          >
            <FaGithub className="mr-2" /> Github
          </a>

          <a
            href="https://twitter.com/tro003x"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Twitter"
            className="btn join-item justify-start bg-base-100"
          >
            <FaTwitter className="mr-2" /> Twitter
          </a>

          <a
            href="https://instagram.com/_orit_ro_"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Instagram"
            className="btn join-item justify-start bg-base-100"
          >
            <FaInstagram className="mr-2" /> Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default FindUs;
