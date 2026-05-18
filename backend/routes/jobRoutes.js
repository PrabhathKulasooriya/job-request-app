import express from 'express';
import auth from '../middleware/auth.js';
import {
  createJobRequest,
  getAllJobRequests,
  getJobRequestById,
  updateJobRequestStatus,
  deleteJobRequest
} from "../api/jobRequests.js";

const jobsRouter = express.Router();

jobsRouter.post('/', auth, createJobRequest);
jobsRouter.get('/',  getAllJobRequests);
jobsRouter.get('/:id',  getJobRequestById);
jobsRouter.patch('/:id', auth, updateJobRequestStatus);
jobsRouter.delete('/:id', auth, deleteJobRequest);

export default jobsRouter;