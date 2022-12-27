import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import toast from "react-hot-toast";
import axios from "axios";

import { API, images } from "../../constants";
import { useSelector } from "react-redux";

const SignupPage = () => {
  const navigate = useNavigate();
  const walletState = useSelector((state) => state.wallet);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    referedBy: "",
    name: "",
  });

  const changeInputHandler = (e) => {
    const { name } = e.target;
    setInputValues((prevState) => {
      return { ...prevState, [name]: e.target.value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const userAccountSchema = {
      name: inputValues.name,
      email: inputValues.email,
      password: inputValues.password,
      Wallet: walletState.walletAddress,
      referedBy: inputValues.referedBy,
    };

    try {
      const { data } = await axios.post(
        `${API.API_URL}/auth/signup`,
        userAccountSchema
      );
      toast.success(data.message);
      setIsSubmitted(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsSubmitted(false);
    }
  };

  return (
    <section className="min-h-screen w-full flex justify-center items-center p-5">
      <div className="w-full max-w-screen-md rounded-xl shadow-lg px-5 py-10 flex flex-col items-center">
        <div className="flex gap-x-3">
          <img className="w-20 h-auto" src={images.logo} alt="logo" />
          <div className="flex flex-col items-start">
            <span className="font-bold text-blue-500 text-2xl">Hey There</span>
            <span className="text-sm">Please create your account.</span>
          </div>
        </div>
        <div className="w-full flex justify-between items-center mt-10 max-w-md gap-x-4">
          <Link
            to="/login"
            className="flex-1 border border-blue-500 text-center rounded-full text-blue-500 px-4 py-2"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="flex-1 bg-blue-500 text-center rounded-full text-white px-4 py-2"
          >
            Sign up
          </Link>
        </div>
        <form
          className="mt-14 w-full max-w-md space-y-2"
          onSubmit={submitHandler}
        >
          <div className="w-full">
            <input
              className="w-full border-b-2 border-b-gray-200 focus:outline-none py-3"
              type="text"
              name="name"
              placeholder="Name"
              onChange={changeInputHandler}
              value={inputValues.name}
            />
          </div>
          <div className="w-full">
            <input
              className="w-full border-b-2 border-b-gray-200 focus:outline-none py-3"
              type="email"
              name="email"
              placeholder="Email"
              onChange={changeInputHandler}
              value={inputValues.email}
            />
          </div>
          <div className="w-full">
            <input
              className="w-full border-b-2 border-b-gray-200 focus:outline-none py-3"
              type="password"
              name="password"
              placeholder="Password"
              onChange={changeInputHandler}
              value={inputValues.password}
            />
          </div>
          <div className="w-full">
            <input
              className="w-full border-b-2 border-b-gray-200 focus:outline-none py-3"
              type="text"
              name="referedBy"
              placeholder="Referral code (optional)"
              onChange={changeInputHandler}
              value={inputValues.referedBy}
            />
          </div>
          <div className="w-full flex items-center justify-between text-[#4D4F5C] pt-7">
            <div className="flex items-center gap-x-3">
              <input
                type="checkbox"
                name="check-box"
                id="check-box"
                className="form-tick rounded-lg bg-white bg-check h-4 w-4 border border-gray-300 checked:bg-blue-500 checked:border-transparent focus:outline-none"
              />
              <label htmlFor="check-box" className="text-sm">
                Remember me
              </label>
            </div>
          </div>
          <button
            disabled={isSubmitted}
            type="submit"
            className="disabled:cursor-not-allowed disabled:opacity-70 w-full border bg-blue-500 text-center rounded-full text-white px-4 py-2"
          >
            Sign up
          </button>
        </form>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 font-semibold flex items-center mt-7"
        >
          <IoIosArrowBack className="w-7 h-7" />
          <span>Go back</span>
        </button>
      </div>
    </section>
  );
};

export default SignupPage;
