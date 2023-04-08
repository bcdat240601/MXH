import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../../src/components/pages/Home/Home";
import axios from "axios";
import io from "socket.io-client";

const Index = ({ postData, imgData }: any) => {
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
        <Home socket={socket} posts={postData} images={imgData} />
      </section>
    </>
  );
};
export default Index;

export async function getStaticProps() {
  const posts = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}posts?populate[comments][populate][0]=user_comment&populate=user_post`
  );
  const images = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}posts?populate=files`
  );

  return {
    props: {
      postData: posts.data,
      imgData: images.data,
    },
  };
}
