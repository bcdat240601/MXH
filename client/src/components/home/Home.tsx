import React from "react";
import Header from "../Header";
import Menudesktop from "../Menudesktop";
import Menumbl from "../Menumbl";
import Menutablet from "../Menutablet";
import Feed from "./Feed";
import Leftbar from "./Leftbar";
import Storyslide from "./Storyslide";

const Home = () => {
  return (
    <div className="flex h-screen">
      <Menutablet />
      <Menudesktop />
      <main className="flex-1 h-screen overflow-y-scroll md:pt-6 md:grid md:place-items-center gap-y-10">
        <Header />
        <Storyslide />
        <section className="">
          <div className="pt-3">
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
          <div className="h-20 md:hidden"></div>
        </section>
        <Menumbl />
      </main>
      <Leftbar />
    </div>
  );
};

export default Home;
