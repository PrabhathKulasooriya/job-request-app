"use client";

import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { AppContext } from "@/app/_context/AppContext";
import CreateJobModal from "@/app/_components/CreateJobModal";
import toast from "react-hot-toast";

const CATEGORIES = [
  "All",
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Cleaning",
  "Painting",
  "Moving",
  "Other",
];
const STATUSES = ["All", "Open", "In Progress", "Closed"];

const statusBadgeColor = {
  Open: "bg-indigo-50 text-indigo-600",
  "In Progress": "bg-amber-50 text-amber-600",
  Closed: "bg-gray-100 text-gray-500",
};




const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const { token } = useContext(AppContext);

  const getAllJobs = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (category !== "All") params.append("category", category);
      if (status !== "All") params.append("status", status);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs?${params.toString()}`,
        { headers: { "Content-Type": "application/json" } },
      );
      const data = await res.json();
      if (data?.data) setJobs(data.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, [category, status]);

  const handleJobCreated = (newJob) => {
    setJobs((prev) => [newJob, ...prev]);
  };
  
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      {showModal && (
        <CreateJobModal
          onClose={() => setShowModal(false)}
          onJobCreated={handleJobCreated}
        />
      )}

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        {" "}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Browse Jobs</h1>
          <p className="mt-1 text-sm text-gray-400">
            {loading
              ? "Loading..."
              : `${jobs.length} job${jobs.length !== 1 ? "s" : ""} found`}
          </p>
        </div>
        {token ? (
          <button
            onClick={() => setShowModal(true)}
            className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-600"
          >
            + Post a Job
          </button>
        ) : (
          <button
            onClick={() => toast.error("Please login to post a job.")}
            className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-600"
          >
            + Post a Job
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Category
          </span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  category === cat
                    ? "bg-gray-900 text-white"
                    : "border border-gray-200 bg-white text-gray-500 hover:border-gray-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Status
          </span>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  status === s
                    ? "bg-gray-900 text-white"
                    : "border border-gray-200 bg-white text-gray-500 hover:border-gray-400"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
        </div>
      )}

      {/* Empty state */}
      {!loading && jobs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400">
          <p className="text-4xl mb-3">📭</p>
          <p className="font-medium">No jobs match your filters.</p>
          <p className="text-sm mt-1">Try a different category or status.</p>
        </div>
      )}

      {/* Grid */}
      {!loading && jobs.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <div
              key={job._id || index}
              className="group relative flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {/* Badge + arrow */}
              <div className="flex items-start justify-between">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${
                    statusBadgeColor[job.status] ?? "bg-gray-100 text-gray-500"
                  }`}
                >
                  {job.status}
                </span>
                <span className="text-xl text-gray-300 transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-indigo-500">
                  ↗
                </span>
              </div>

              {/* Title & description */}
              <div className="flex-1">
                <h3 className="text-lg font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-indigo-700">
                  {job.title}
                </h3>
                <p className="mt-2 line-clamp-3 leading-relaxed text-sm text-gray-500">
                  {job.description}
                </p>
              </div>

              {/* Category tag */}
              {job.category && (
                <span className="w-fit rounded-md border border-gray-100 bg-gray-50 px-2 py-1 text-xs text-gray-400">
                  {job.category}
                </span>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{job.location ?? "Remote"}</span>
                  </div>
                  {job.postedBy && (
                    <p className="text-xs text-gray-400">
                      by{" "}
                      <span className="font-medium text-gray-600">
                        {job.postedBy.name}
                      </span>
                    </p>
                  )}
                </div>

                <Link
                  href={`/jobs/${job._id}`}
                  className="rounded-xl bg-gray-900 px-4 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:bg-indigo-600"
                >
                  View Job
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllJobs;
