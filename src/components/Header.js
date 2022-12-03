import React from "react";

import { images } from "../constants";

const Header = () => {
  return (
    <section>
      <header className="mx-auto container flex justify-between items-center px-5 py-3">
        <div className="flex items-center space-x-3">
          <img className="w-14 h-auto" src={images.logo} alt="logo" />
          <h1 className="font-bold">Achieve Point Earning</h1>
        </div>

        <ul className="flex space-x-3 items-center font-normal">
          <li className="px-3 py-1.5 cursor-pointer">Home</li>
          <li className="px-3 py-1.5 cursor-pointer">Mining</li>
          <li className="px-3 py-1.5 cursor-pointer">Refferal Details</li>
          <li className="px-3 py-1.5 cursor-pointer">Support</li>
          <li className="px-3 py-1.5 cursor-pointer">About us</li>
        </ul>
      </header>
    </section>
  );
};

export default Header;
