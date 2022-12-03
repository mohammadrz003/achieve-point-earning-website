import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";

const Cta = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="container w-full px-5 py-10 mx-auto">
      <div className="w-full max-w-md p-3 rounded-lg shadow mx-auto flex flex-nowrap gap-x-1">
        <div className="flex-1 relative">
          <AiOutlineMail className="absolute w-5 h-5 left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            className="w-full focus:outline-none h-full rounded-lg px-2 pl-9"
            placeholder="Type your email here"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <button className="w-fit rounded-lg bg-blue-600 text-white font-medium px-4 py-2">
          Sign Up
        </button>
      </div>
      <h3 className="text-center mt-5 text-[#989898] text-xl">Subscribe for free to receive offers and updates</h3>
    </section>
  );
};

export default Cta;
