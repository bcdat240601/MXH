import React from "react";

import Header from "../../Header";
import Menudesktop from "../../Menudesktop";
import Menumbl from "../../Menumbl";
import Menutablet from "../../Menutablet";
import Feed from "./Feed";
import Leftbar from "./Leftbar";
import Storyslide from "./Storyslide";

// interface Feed {
//   id: number;
//   attributes: {
//     caption: string;
//     createdAt: string;
//     id_post: number;
//     updatedAt: string;
//   };
// }

const Home = ({ data, socket }: any) => {
  console.log(data);
  return (
    <div className="flex h-screen">
      <Menutablet />
      <Menudesktop />
      <main className="flex-1 h-screen overflow-y-scroll md:pt-6 md:grid md:place-items-center gap-y-10">
        <Header />
        <Storyslide />
        <section className="space-y-10">
          {data.map((feed: any) => (
            <div key={feed.id} className="pt-3">
              <Feed socket={socket} {...feed.attributes} />
            </div>
          ))}
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
