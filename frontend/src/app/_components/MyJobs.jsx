import React, { useState, useContext } from "react";
import { AppContext } from "../_context/AppContext";
import Link from "next/link";
import toast from "react-hot-toast";
import CreateJobModal from "./CreateJobModal";

const MyJobs = ({ jobs, setJobs }) => {
  const { token } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleJobCreated = (newJob) => {
    setJobs((prev) => [newJob, ...prev]);
  };

 const handleDelete = async (jobId) => {
   toast(
     (t) => (
       <div className="flex flex-col gap-2">
         <p className="text-sm font-semibold text-gray-800">Delete this job?</p>
         <p className="text-xs text-gray-400">This action cannot be undone.</p>
         <div className="flex gap-2 mt-1">
           <button
             onClick={async () => {
               toast.dismiss(t.id);
               try {
                 setDeletingId(jobId);
                 const res = await fetch(
                   `${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs/${jobId}`,
                   { method: "DELETE", headers: { token } },
                 );
                 const data = await res.json();
                 if (data?.success) {
                   setJobs((prev) => prev.filter((j) => j._id !== jobId));
                   toast.success("Job deleted.");
                 } else {
                   toast.error(data?.message || "Failed to delete job.");
                 }
               } catch (err) {
                 console.error("Error deleting job:", err);
                 toast.error("Something went wrong.");
               } finally {
                 setDeletingId(null);
               }
             }}
             className="flex-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 transition"
           >
             Delete
           </button>
           <button
             onClick={() => toast.dismiss(t.id)}
             className="flex-1 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-200 transition"
           >
             Cancel
           </button>
         </div>
       </div>
     ),
     { duration: Infinity }, 
   );
 };

  const statusBadgeColor = {
    Open: "bg-indigo-50 text-indigo-600",
    "In Progress": "bg-amber-50 text-amber-600",
    Closed: "bg-gray-100 text-gray-500",
  };

  return (
    <>
      {showModal && (
        <CreateJobModal
          onClose={() => setShowModal(false)}
          onJobCreated={handleJobCreated}
        />
      )}

      <section className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Jobs</h1>
            <p className="mt-1 text-sm text-gray-400">
              {jobs.length} job{jobs.length !== 1 ? "s" : ""} posted
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-600"
          >
            + Post a Job
          </button>
        </div>

        {/* Empty state */}
        {jobs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400">
            <p className="font-medium">No jobs posted yet.</p>
            <p className="text-sm mt-1">Click "Post a Job" to get started.</p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => {
            const canDelete = job.status === "Open" || job.status === "Closed";
            const isDeleting = deletingId === job._id;

            return (
              <div
                key={job._id || index}
                className="group relative flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* Top row: badge + arrow */}
                <div className="flex items-start justify-between">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${
                      statusBadgeColor[job.status] ??
                      "bg-gray-100 text-gray-500"
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

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  {/* Location */}
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

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {canDelete ? (
                      <button
                        onClick={() => handleDelete(job._id)}
                        disabled={isDeleting}
                        className="rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-100 disabled:opacity-50"
                      >
                        {isDeleting ? "..." : "Delete"}
                      </button>
                    ) : (
                      // In Progress — show a disabled hint instead
                      <span className="rounded-xl bg-gray-50 px-3 py-2 text-xs font-medium text-gray-300 cursor-not-allowed">
                        In Progress
                      </span>
                    )}
                    <Link
                      href={`/jobs/${job._id}`}
                      className="rounded-xl bg-gray-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-600"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default MyJobs;
