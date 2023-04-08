import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../../Header";
import Menudesktop from "../../Menudesktop";
import Menumbl from "../../Menumbl";
import Menutablet from "../../Menutablet";
import Feed from "./Feed";
import Leftbar from "./Leftbar";
import Storyslide from "./Storyslide";

const Home = ({ posts, images, socket }: any) => {
  const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem("account") || "";
    console.log(token);
    if (token === "") router.push("/");
  }, []);

  return (
    <>
      <section className="flex h-screen">
        <Menutablet />
        <Menudesktop />
        <main className="flex-1 h-screen overflow-y-scroll md:pt-6 md:grid md:place-items-center gap-y-10">
          <Header />
          <Storyslide />
          <section className="space-y-10">
            {posts.data.map((feed: any, index: number) => (
              <div key={index} className="pt-3">
                <Feed
                  id_post={index + 1}
                  socket={socket}
                  {...feed.attributes}
                  image={images.data[0].attributes.files}
                />
              </div>
            ))}
          </section>
          <section>
            <div className="h-20 md:hidden"></div>
          </section>
          <Menumbl />
        </main>
        <Leftbar />
      </section>
    </>
  );
};

export default Home;
