"use client";

import React, { useState, useContext, useEffect} from "react";
import Sidebar from "@/app/_components/Sidebar.jsx";
import AcceptedJobs from "@/app/_components/AcceptedJobs.jsx";
import MyJobs from "@/app/_components/MyJobs.jsx";
import { AppContext } from "@/app/_context/AppContext";
import Link from "next/link";



const Page = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeComponent, setActiveComponent] = useState("my-jobs");
  const {token} = useContext(AppContext);

  const getMyJobs = async ()=>{
    try{
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/my-jobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
      });
      const data = await res.json();
      if(data?.jobs) setMyJobs(data.jobs);
    }catch(error){
      console.error("Error fetching user's jobs:", error);
    }finally{
      setLoading(false);
    }
  }

  const getAcceptedJobs = async ()=>{
    try{
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/accepted-jobs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "token": token,
          },
        },
      );
      const data = await res.json();
      if(data?.jobs) setAcceptedJobs(data.jobs);
    }catch(error){
      console.error("Error fetching accepted jobs:", error);
    }finally{
      setLoading(false);
    }
  }

useEffect(() => {
    if(token){
      getMyJobs();
      getAcceptedJobs();
    }
  }, [token]);


  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
      </div>
    );
  }

  if(!token){
    return (
      <div className="flex min-h-screen bg-gray-50 ">
        <main className="flex-1 p-6 md:p-10 ml-0">
          <div className="py-20 text-center">
            <p className="text-sm text-gray-400">
              Please login to view your jobs
            </p>
            <button className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
              <Link href="/login?redirect=/my-jobs">Go to Login</Link>
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 ">
      {/* Sidebar */}
      <Sidebar
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 ml-0">
        {activeComponent === "my-jobs" && <MyJobs jobs={myJobs} setJobs={setMyJobs}/>}
        {activeComponent === "accepted-jobs" && <AcceptedJobs jobs={acceptedJobs} />}
      </main>
    </div>
  );
};

export default Page;
