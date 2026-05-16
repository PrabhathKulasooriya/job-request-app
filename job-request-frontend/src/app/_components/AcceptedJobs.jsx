import React from "react";
import Link from "next/link";

const statusBadgeColor = {
  Open: "bg-indigo-50 text-indigo-600",
  "In Progress": "bg-amber-50 text-amber-600",
  Closed: "bg-gray-100 text-gray-500",
};

const AcceptedJobs = ({ jobs }) => {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Accepted Jobs</h1>
        <p className="mt-1 text-sm text-gray-400">
          {jobs.length} job{jobs.length !== 1 ? "s" : ""} accepted
        </p>
      </div>

      {/* Empty state — outside the grid */}
      {jobs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400">
          <p className="font-medium">No accepted jobs yet.</p>
          <p className="text-sm mt-1">
            Browse jobs and accept one to get started.
          </p>
        </div>
      )}

      {/* Grid — no status filter, show all assigned jobs */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job, index) => (
          <div
            key={job._id || index}
            className="group relative flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            {/* Top row: badge + arrow */}
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

            {/* Posted by */}
            {job.postedBy && (
              <p className="text-xs text-gray-400">
                Posted by{" "}
                <span className="font-medium text-gray-600">
                  {job.postedBy.name}
                </span>
              </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
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
    </section>
  );
};

export default AcceptedJobs;
