import HomePage from "@/components/HomePage/HomePage";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const Home = async () => {
  const session = await getServerSession(authOptions);
  //console.log(session);
  return (
    <main>
      <HomePage />
    </main>
  );
};

export default Home;
