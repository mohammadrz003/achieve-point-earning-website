import React from "react";
import Layout from "../../components/Layout";
import Category from "./container/Category";
import Cta from "./container/Cta";
import HeroSection from "./container/HeroSection";
import ProgramDetailsSection from "./container/ProgramDetailsSection";

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <ProgramDetailsSection />
      <Category />
      <Cta />
    </Layout>
  );
};

export default HomePage;
