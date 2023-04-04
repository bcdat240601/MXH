import Home from "../../src/components/pages/Home/Home";
import axios from "axios";
import io from "socket.io-client";

const Index = ({ data }: any) => {
  const socket = io("http://127.0.0.1:1337", {
    transports: ["websocket"],
  });
  socket.on("connect", function () {
    console.log("Connected to WS server");

    console.log(socket.connected);
  });
  return (
    <div>
      <Home socket={socket} {...data} />
    </div>
  );
};
export default Index;

export async function getStaticProps() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}posts?populate[comments][populate][0]=user_comment&populate=user_post`
  );

  return {
    props: {
      data,
    },
  };
}
