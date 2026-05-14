import JobRequestModel from "../models/jopRequestModel.js";

// Create a new job request
export const createJobRequest = async (req, res) => {
  const { title, description, category, location } = req.body;

  if (!title || !description || !category || !location) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const newJobRequest = new JobRequestModel({
      title,
      description,
      category,
      location,
      postedBy: req.user,
      status: "Open",
    });

    await newJobRequest.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Job request created successfully",
        data: newJobRequest,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error creating job request",
        error: error.message,
      });
  }
};

// Get all jobs
export const getAllJobRequests = async (req, res) => {
  try {
    const { category, status } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;

    const jobRequests = await JobRequestModel.find(filter)
      .populate("postedBy", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: jobRequests });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching job requests",
        error: error.message,
      });
  }
};

// Get a single job by ID
export const getJobRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const jobRequest = await JobRequestModel.findById(id)
      .populate("postedBy", "name email")
      .populate("assignedTo", "name email");

    if (!jobRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Job request not found" });
    }

    res.status(200).json({ success: true, data: jobRequest });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching job request",
        error: error.message,
      });
  }
};

// Update job status
export const updateJobRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["Open", "In Progress", "Closed"];
  if (!validStatuses.includes(status)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid status value" });
  }

  try {
    const jobRequest = await JobRequestModel.findById(id);
    if (!jobRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Job request not found" });
    }

    if (status === "Closed") {
      if (!jobRequest.assignedTo) {
        return res
          .status(400).json({success: false,message: "Cannot close a job that hasn't been accepted yet",});
      }
      if (jobRequest.assignedTo.toString() !== req.user && jobRequest.postedBy.toString() !== req.user) {
        return res.status(403).json({success: false,message: "Not authorized to close this job"});
      }
    }

    jobRequest.status = status;
    if (status === "In Progress") jobRequest.assignedTo = req.user;
    if (status === "Open") jobRequest.assignedTo = null;

    await jobRequest.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Status updated successfully",
        data: jobRequest,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating job request status",
        error: error.message,
      });
  }
};

// Delete a job request
export const deleteJobRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const jobRequest = await JobRequestModel.findById(id);
    if (!jobRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Job request not found" });
    }

    if (jobRequest.postedBy.toString() !== req.user) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to delete this job" });
    }

    await JobRequestModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Job request deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error deleting job request",
        error: error.message,
      });
  }
};
