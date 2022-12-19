import React from "react";
import Plan from "../../../components/Plan";

const PLANS_DATA = [
  {
    title: "Btc Star",
    starNumber: 1,
    caption: `We have a minute Rank Purchase of 25 APE token. Who will hold around
    25 APE to 249 APE will be a btc 1 Start rank holder.`,
    listItems: [
      "Roi - 1% daily",
      "Refferal Rebeat - 5% instant Comission",
      "2nd Level Refferal Rebeat - 3% instant Comission",
    ],
    buyLink: "/",
  },
  {
    title: "Btc Star",
    starNumber: 2,
    caption: `In btc 2 Start rank Purchase Rank Holder must hold At least 250 APE to 499 APE in his wallet.`,
    listItems: [
      "Roi - 1.1% daily",
      `And BTC Mining system 0.00137 daily 
      (0.5 BTC a Year) That can be withdrawn in a year`,
      `Refferal Rebeat - 5% instant Comission`,
      `2nd Level Refferal Rebeat -  3% instant Comission`,
    ],
    buyLink: "/",
  },
  {
    title: "Btc Star",
    starNumber: 3,
    caption: `Who will hold more than 500 APE token will be granted as a btc 3 Start rank holder.`,
    listItems: [
      "Roi - 1.2% daily",
      `And a BTC Mining system 0.00274 daily ( 1 BTC a year ) that can be withdrawn in a year.`,
      `Refferal Rebeat - 5% instant Comission`,
      `2nd Level Refferal Rebeat -  3% instant Comission`,
    ],
    buyLink: "/",
  },
];

const Category = () => {
  return (
    <section className="container w-full px-5 py-10 mx-auto">
      <h2 className="text-4xl md:text-5xl lg:text-7xl text-[#5A5A5A] text-center">
        Category's
      </h2>
      <p className="text-center text-xl mt-8">
        We have decided our Achievement rank in 3 Step's
      </p>
      <div className="w-full flex flex-col flex-wrap md:flex-row md:justify-center lg:flex-nowrap gap-y-6 lg:gap-y-0 gap-x-5 mt-16">
        {PLANS_DATA.map((value, index) => (
          <div className="w-full md:w-[45%] lg:w-1/3">
            <Plan
              title={value.title}
              starNumber={value.starNumber}
              caption={value.caption}
              listItems={value.listItems}
              buyLink={value.buyLink}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
