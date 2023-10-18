import Loader from "@/components/svg/loader";

const Loading = () => {
  return (
    <>
      <div className="absolute left-1/2 top-1/2 z-10 animate-pulse text-2xl text-neutral-700">
        <Loader />
        <p>Loading...</p>
      </div>
    </>
  );
};

export default Loading;