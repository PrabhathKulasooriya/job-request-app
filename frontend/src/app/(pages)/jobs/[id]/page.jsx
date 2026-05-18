"use client";

import React, { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppContext } from "@/app/_context/AppContext.jsx";
import {
  MapPin,
  Briefcase,
  Calendar,
  DollarSign,
  ArrowLeft,
  Loader2,
  CheckCircle,
  BadgePlus,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const statusColors = {
  Open: "bg-green-50 text-green-700 border-green-200",
  "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
  Closed: "bg-gray-100 text-gray-700 border-gray-300",
};

const JobPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { token } = useContext(AppContext); 

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch individual job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs/${id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        const data = await res.json();
        if (data?.data) setJob(data.data);
      } catch (err) {
        console.error("Error fetching job:", err);
        toast.error("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id]);

  // Handle status update requests
  const handleStatusUpdate = async (nextStatus) => {
    if (!token) {
      toast.error("Please log in to get the job.");
      return;
    }

    try {
      setUpdating(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "token": token,
          },
          body: JSON.stringify({ status: nextStatus }),
        },
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success(`Job status updated to ${nextStatus}!`);
      setJob(data.data); // Update localized state with returned payload
    } catch (err) {
      console.error("Status update error:", err);
      toast.error(err.message || "Failed to update job status.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-sm flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-black animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center p-10 mt-12">
        <p className="text-gray-500 font-medium">Job request not found.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-sm text-black underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col items-center  pt-18 md:pt-24 sm:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Navigation Action */}
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-500 hover:text-black mb-6 inline-flex items-center gap-2 transition-colors font-medium group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Jobs
        </button>

        {/* Core Content Body */}
        <div className="border border-gray-100 p-5 sm:p-8 rounded-2xl shadow-sm bg-white space-y-6">
          {/* Header Context Banner */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-gray-50 pb-6">
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                {job.title}
              </h1>
              <p className="text-sm font-medium text-gray-500">
                {job.company || "Company Confidential"}
              </p>
            </div>

            <span
              className={`self-start text-xs font-semibold px-3 py-1 rounded-full border ${statusColors[job.status] || "bg-gray-100 text-gray-600"}`}
            >
              {job.status}
            </span>
          </div>

          {/* Grid Metadata Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
              <span>{job.location || "Remote / Anywhere"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4 text-gray-400 shrink-0" />
              <span>{job.type || "Full-Time"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <DollarSign className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="font-medium text-gray-900">
                {job.salary || "Undisclosed Compensation"}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
              <span>
                Posted on{" "}
                {new Date(job.createdAt ).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Job Description Text block */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Job Details
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Footer Management & Status Mutations */}
          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-xs text-gray-400">
              {job.assignedTo
                ? "This workflow is currently assigned."
                : "Awaiting assignment."}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {job.status === "Open" && (
                <button
                  onClick={() => handleStatusUpdate("In Progress")}
                  disabled={updating}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-medium px-5 py-2.5 rounded-xl bg-black text-white hover:bg-gray-800 disabled:opacity-50 transition-all duration-200 shadow-sm"
                >
                  {updating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <BadgePlus className="w-5 h-5" />
                  )}
                  Accept Job
                </button>
              )}

              {job.status === "In Progress" && (
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleStatusUpdate("Open")}
                    disabled={updating}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-all"
                  >
                    Release Job
                  </button>
                  <button
                    onClick={() => handleStatusUpdate("Closed")}
                    disabled={updating}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 text-sm font-medium px-5 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 transition-all shadow-sm"
                  >
                    {updating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    Complete & Close
                  </button>
                </div>
              )}

              {job.status === "Closed" && (
                <button
                  disabled
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-medium px-5 py-2.5 rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                >
                  <XCircle className="w-4 h-4" />
                  Job Closed
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
