import Home from "../../src/components/pages/Home/Home";
import axios from "axios";
const Index = ({ data }: any) => {
  return (
    <div>
      <Home {...data} />
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
