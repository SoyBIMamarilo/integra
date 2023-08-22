import Loader from "@/components/svg/loader";

const Loading = () => {
  return (
    <>
      <div className="absolute left-1/2 top-1/2 animate-pulse text-2xl text-neutral-700">
        <Loader />
      </div>
    </>
  );
};

export default Loading;
