import express from 'express';
import { loginUser, registerUser, getUserJobs, getAcceptedJobs } from '../api/userApi.js';
import auth from '../middleware/auth.js';

const userRouter = express.Router();


userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.get('/my-jobs', auth, getUserJobs);
userRouter.get('/accepted-jobs', auth, getAcceptedJobs);


export default userRouter;