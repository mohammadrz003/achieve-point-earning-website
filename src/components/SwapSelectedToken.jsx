import React, { useState } from "react";

import styles from "./SwapSelectedToken.module.css";
import { images } from "../constants";

const SwapSelectedToken = (props) => {
  const { img, tokenSymbol, name, onChangeHandler, inputValue = "0" } = props;

  const inputChangeHandler = (e) => {
    onChangeHandler(name, e.target.value);
  };

  return (
    <div className="w-full relative">
      <input
        type="number"
        name={name}
        value={inputValue}
        onChange={inputChangeHandler}
        min="0"
        step="0.1"
        className={`${styles.inputNumberHideArrow} w-full focus:outline-none text-right bg-[#e6e6e6] pl-[27%] pr-4 py-6 rounded-3xl`}
      />
      <button
        className="absolute top-1/2 transform -translate-y-1/2 left-3 px-3 py-1.5 rounded-3xl flex items-center space-x-2 bg-white"
        type="button"
      >
        <img src={img} alt="token_logo" className="w-7 h-auto" />
        <span>{tokenSymbol}</span>
      </button>
    </div>
  );
};

export default SwapSelectedToken;
