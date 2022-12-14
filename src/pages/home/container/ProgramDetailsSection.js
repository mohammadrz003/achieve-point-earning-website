import React from "react";
import { images } from "../../../constants";

const ProgramDetailsSection = () => {
  return (
    <section className="container flex flex-col lg:flex-row w-full px-5 py-10 mx-auto flex-wrap">
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <img className="w-[60%]" src={images.refferal} alt="refferal" />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center mt-3 lg:mt-0">
        <h3 className="text-center font-semibold text-2xl md:text-[3.2rem]">
          Affiliate Program
        </h3>
        <h3 className="text-center font-bold text-6xl md:text-9xl">Details</h3>
      </div>
      <p className="mt-16 text-xl leading-loose">
        We are announcing our affiliate Program. Achive the beat point to earn
        a big amount. The Ranked person can achieve the biggest point to get
        more reward. Everyone who want to participate in Affiliate program they
        have to follow our basic tasks. It's a chain based program in the
        community. Generate more poin to get the best rank.
      </p>
      <p className="mt-12 text-xl leading-loose">
        Achive Point details :<br />
        Achive Point Earning have it's own Token , Name APE token. We will
        provide our users position depending on their holding of APE and there
        affiliate achievement.
      </p>
    </section>
  );
};

export default ProgramDetailsSection;
