import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

const Home = () => {
  redirect("/projects");
  return <div className="mb-2 mt-1 text-2xl font-semibold">Home</div>;
};

export default Home;
