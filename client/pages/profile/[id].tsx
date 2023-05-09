import { parseCookies } from "@/helpers";
import Profile from "../../src/components/pages/Profile/Profile";
import { useRouter } from "next/router";
import axios from "axios";
import io from "socket.io-client";

const Index = ({
  id,
  user,
  currentUser,
  followers,
  followings,
  likesData,
}: any) => {
  const socket = io("http://127.0.0.1:1337", {
    transports: ["websocket"],
  });
  socket.on("connect", function () {
    console.log("Connected to WS server");
    console.log(socket.connected);
  });
  return (
    <div>
      <Profile
        socket={socket}
        user={user}
        currentUser={currentUser}
        followers={followers}
        followings={followings}
        likes={likesData}
      />
    </div>
  );
};

export default Index;

export async function getServerSideProps(context: any) {
  const id = await context.params;
  const token = parseCookies(context.req);

  const user = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}users/${id.id}?populate[posts][populate][0]=files`,
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );

  const follow = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}users/${id.id}?populate[followers][populate][0]=user_following&populate[followings][populate][0]=user_follower`,
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );

  const currentUser = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}users/me`,
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token.user.replaceAll('"', "")}`,
      },
    }
  );
  const listLike = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}posts?populate=beliked`,
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token.user.replaceAll('"', "")}`,
      },
    }
  );
  return {
    props: {
      id,
      user: user.data,
      currentUser: currentUser.data,
      followers: follow.data.followers,
      followings: follow.data.followings,
      likesData: listLike.data,
    },
  };
}
