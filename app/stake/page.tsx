import Staking from "@/components/staking";

export default async function Page() {
  if (process.env.NEXT_PUBLIC_ENABLE_STAKE !== "TRUE") {
    return (
      <>
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 flex items-center text-4xl font-bold ">
              NFTEarth Staking{" "}
            </h1>
            <p className="mb-2">Staking App for NFTEarth </p>
          </div>
        </div>
        <p className="mt-10">
          Coming Soon
        </p>
        <p className="mt-2">
          Follow{" "}
          <a className="text-[#1da1f2]" href="https://twitter.com/NFTEarth_L2">
            @NFTEarth_L2
          </a>{" "}
          on Twitter for important announcements.
        </p>
      </>
    );
  }

  return <Staking />;
}
