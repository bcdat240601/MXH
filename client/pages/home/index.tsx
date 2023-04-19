import Home from "../../src/components/pages/Home/Home";
import axios from "axios";
import { useState } from "react";
import io from "socket.io-client";

import { parseCookies } from "@/helpers";
const Index = ({ postData, imgData, userData }: any) => {
  const socket = io("http://127.0.0.1:1337", {
    transports: ["websocket"],
  });
  socket.on("connect", function () {
    console.log("Connected to WS server");

    console.log(socket.connected);
  });
  return (
    <>
      <section>
        <Home
          socket={socket}
          posts={postData}
          images={imgData}
          user={userData}
        />
      </section>
    </>
  );
};
export default Index;

export async function getServerSideProps(ctx: any) {
  const token = parseCookies(ctx.req);

  const posts = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}posts?populate[comments][populate][0]=user_comment&populate=user_post&sort[0]=id%3Adesc`,
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",

        Authorization: `Bearer ${token.user.replaceAll('"', "")}`,
      },
    }
  );
  const images = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}posts?populate=files`,
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token.user.replaceAll('"', "")}`,
      },
    }
  );
  const user = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}users/me`,
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token.user.replaceAll('"', "")}`,
      },
    }
  );

  return {
    props: {
      postData: posts.data,
      imgData: images.data,
      userData: user.data,
    },
  };
}
