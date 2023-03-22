import React from "react";
import Header from "../Header";
import Menumbl from "../Menumbl";
import Feed from "./Feed";
import Storyslide from "./Storyslide";

const Home = () => {
  return (
    <div>
      <Header />
      <Storyslide />
      <section>
        <div className="pt-10">
          <Feed />
        </div>
        <div className="pt-10">
          <Feed />
        </div>
        <div className="pt-10">
          <Feed />
        </div>
        <div className="pt-10">
          <Feed />
        </div>
      </section>
      <section>
        <div className="h-20"></div>
      </section>
      <Menumbl />
    </div>
  );
};

export default Home;
