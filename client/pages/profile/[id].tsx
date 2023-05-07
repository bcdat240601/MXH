import { parseCookies } from "@/helpers";
import Profile from "../../src/components/pages/Profile/Profile";
import { useRouter } from "next/router";
import axios from "axios";

const Index = ({ id, user, currentUser }: any) => {
  return (
    <div>
      <Profile user={user} currentUser={currentUser} />
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

  const currentUser = await axios.get(
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
      id,
      user: user.data,
      currentUser: currentUser.data,
    },
  };
}
