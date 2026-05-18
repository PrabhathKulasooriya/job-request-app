# Job Request App — GlobalTNA Technical Assessment

A full-stack mini service request board where homeowners can post service requests and tradespeople can browse, view, and update job statuses.

---

## Tech Stack

**Frontend:** Next.js, Tailwind CSS  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Auth:** JWT

---

## Features

- Browse all jobs with category and status filters
- Paginated job list (20 at a time) with a Load More button
- Post new service requests (authenticated users only)
- Update job status from the job details page
- Delete jobs (authenticated users only)

---

## Environment Variables

**Backend** — `backend/.env`
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**Frontend** — `frontend/.env.local`
```
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
```

---

## Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/job-request-app.git
cd job-request-app

# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

---

## Database Seeding (Optional)

Inserts 25 sample jobs for testing. Run from the `backend` directory:

```bash
node seed.js
```

> **Warning:** This clears all existing job records before seeding. Comment out `JobRequest.deleteMany()` in `seed.js` to skip the wipe.

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/jobs` | Get all jobs (`?category`, `?status`, `?page`) | No |
| GET | `/api/jobs/:id` | Get a single job | No |
| POST | `/api/jobs` | Create a job | Yes |
| PATCH | `/api/jobs/:id` | Update job status | Yes |
| DELETE | `/api/jobs/:id` | Delete a job | Yes |
