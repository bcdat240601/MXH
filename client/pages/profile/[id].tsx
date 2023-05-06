import Profile from "../../src/components/pages/Profile/Profile";
import { useRouter } from "next/router";
const Index = ({}: any) => {
  const router = useRouter();
  const idUrl = router.query.id;
  return (
    <div>
      <Profile />
    </div>
  );
};

export default Index;
