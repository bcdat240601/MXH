import Profile from "../../src/components/pages/Profile/Profile";
import { useRouter } from "next/router";
import axios from "axios";
const Index = ({ id, user }: any) => {
  return (
    <div>
      <Profile user={user} />
    </div>
  );
};

export default Index;

export async function getServerSideProps(context: any) {
  const id = await context.params;
  const user = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}users/${id.id}?populate[posts][populate][0]=files`,
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );
  return {
    props: {
      id,
      user: user.data,
    },
  };
}
