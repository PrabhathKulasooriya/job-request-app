import Image from "next/image";
import AllJobs from "@/app/_components/AllJobs.jsx";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans pt-12 ">
      <AllJobs />
    </div>
  );
}
