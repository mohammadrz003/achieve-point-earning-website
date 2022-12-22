import React from "react";
import Layout from "../../components/Layout";
import { images } from "../../constants";

const TABLE_DATA = [100, 250, 400, 550, 700, 850, 1000, 1150, 1300, 1500];

const RefferalDetailsPage = () => {
  return (
    <Layout>
      <section className="container max-w-screen-md flex flex-col w-full px-5 py-10 mx-auto flex-wrap">
        <h1 className="text-6xl font-semibold text-[#5A5A5A]">
          Refferal Details
        </h1>
        <p className="mt-10 text-lg leading-relaxed">
          Rank Holder or Non Holder both can participate in Achive Point
          Refferal. Everyone who create account under his link and start Rank
          Purchase will be counted as successful Rank to get Comission.
        </p>
        <p className="mt-10 text-lg leading-relaxed">
          Achive Point Earning Details :<br />
          Our app/website are prepared for the Affiliate program. People who
          joined the Rank Achievement program or didn't join the program both
          can earn fron Achievement Earnings from his daily Roi.
        </p>
        <p className="mt-9 text-lg font-light italic leading-relaxed">
          Example:- If anyone is not interested to Rank Up his team , Making
          refferal he also can Earn only from his achievement purchase. Make a
          purchase start getting your daily roi depending on your Rank.{" "}
        </p>
        <p className="mt-9 text-lg leading-relaxed">
          Rank Upgrade Details:
          <br />
          Everyone who have Purchased Rank can Upgrade that By making refferal.
          Every 10 Refferal under him can give him a Monthly reward structure. (
          2nd level directly don't count in this Rank Monthly salary ) also
          Chance to get the top 5 Winner reward and Lucky Winner Reward for 10
          Ranked Purchase every month
        </p>
        <p className="mt-8 text-lg leading-relaxed">
          And depending on Refferal count we will provide a Ranking Point to get
          Ranked Salary. Per 10 Refferal= 1 Ranking Point
        </p>
        <h5 className="mt-7 font-semibold text-xl">
          Salary for Rank Poin Gainers{" "}
        </h5>
        <div className="w-full flex mt-7">
          <div className="w-fit">
            <table className="table p-4 bg-white rounded-lg shadow w-full">
              <thead>
                <tr>
                  <th className="text-left border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    Rank Point
                  </th>
                  <th className="text-left border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    Monthly Salary
                  </th>
                </tr>
              </thead>
              <tbody>
                {TABLE_DATA.map((value, index) => (
                  <tr key={index} className="text-gray-700">
                    <td className="border-b-2 p-4 dark:border-dark-5">
                      {index + 1}
                    </td>
                    <td className="border-b-2 p-4 dark:border-dark-5">
                      {value}$
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="hidden md:flex flex-1 items-center">
            <img className="w-full h-auto" src={images.headerLogo} alt="logo" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RefferalDetailsPage;
