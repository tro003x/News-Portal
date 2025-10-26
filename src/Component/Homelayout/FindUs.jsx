import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const FindUs = () => {
  return (
    <div className="font-bold text-accent mt-8">
      Find Us on
      <div>
        <div className="join join-vertical w-full mt-2">
          <button className="btn join-item justify-start bg-base-100"> <FaFacebook></FaFacebook> Facebook</button>
          <button className="btn join-item justify-start bg-base-100"> <FaTwitter></FaTwitter> Twitter</button>
          <button className="btn join-item justify-start bg-base-100"> <FaInstagram></FaInstagram> Instagram</button>
        </div>
      </div>
    </div>
  );
};

export default FindUs;
