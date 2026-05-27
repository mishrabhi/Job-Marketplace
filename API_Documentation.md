# Job Marketplace - Complete Setup Guide

A full-stack job marketplace application where companies post jobs and students apply with skill matching.

## Project Overview

This project consists of:
- **Backend**: Node.js/Express API with MongoDB
- **Frontend**: React application with routing and authentication

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following:
```
MONGO_URI=mongodb://localhost:27017/job_marketplace
JWT_SECRET=your_secret_key_here
PORT=4000
```

4. Start the server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:4000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Technology Stack

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- CORS enabled
- Input validation

### Frontend
- React 18
- React Router v6
- Axios for HTTP requests
- Context API for state management
- Vite for build tooling

## Database Schema

### Collections

**Companies**
```json
{
  "_id": "ObjectId",
  "name": "Company Name",
  "email": "company@email.com",
  "password": "hashed_password",
  "description": "Company description",
  "location": "City, Country",
  "role": "company",
  "createdAt": "timestamp"
}
```

**Students**
```json
{
  "_id": "ObjectId",
  "name": "Student Name",
  "email": "student@email.com",
  "password": "hashed_password",
  "skills": ["skill_id1", "skill_id2"],
  "levels": "beginner|intermediate|advanced",
  "role": "student",
  "createdAt": "timestamp"
}
```

**Jobs**
```json
{
  "_id": "ObjectId",
  "title": "Job Title",
  "description": "Job Description",
  "company": "company_id",
  "salary": 100000,
  "location": "City, Country",
  "required_skills": ["skill_id1", "skill_id2"],
  "job_type": "full-time|part-time|internship|contract",
  "posted_date": "timestamp",
  "createdAt": "timestamp"
}
```

**Applications**
```json
{
  "_id": "ObjectId",
  "student": "student_id",
  "job": "job_id",
  "status": "pending|reviewed|accepted|rejected",
  "match_percentage": 85,
  "applied_date": "timestamp",
  "createdAt": "timestamp"
}
```

**Skills**
```json
{
  "_id": "ObjectId",
  "name": "Skill Name",
  "createdAt": "timestamp"
}
```

## API Endpoints

### Authentication
- `POST /api/auth/student/register` - Register as student
- `POST /api/auth/student/login` - Login as student
- `POST /api/auth/company/register` - Register as company
- `POST /api/auth/company/login` - Login as company

### Jobs
- `POST /api/jobs` - Create job (company only)
- `GET /api/jobs` - List all jobs with filters
- `GET /api/jobs/:id` - Get job details
- `PUT /api/jobs/:id` - Update job (company only)
- `DELETE /api/jobs/:id` - Delete job (company only)

### Applications
- `POST /api/applications` - Apply for job (student only)
- `GET /api/applications` - Get my applications (student only)
- `PUT /api/applications/:id` - Update application status (company only)

## Features

### For Students
✅ User registration and login
✅ Browse and search jobs
✅ Filter by location, salary, job type
✅ View job details
✅ Apply for jobs
✅ Skill match percentage calculation
✅ Track application status

### For Companies
✅ User registration and login
✅ Post new job listings
✅ View job listings
✅ Manage job postings
✅ View applications (future feature)

## Frontend Pages

1. **Job Listing** (`/`)
   - Search and filter jobs
   - View job cards with match percentage
   - Paginated results

2. **Job Detail** (`/job/:id`)
   - Full job description
   - Company information
   - Required skills
   - Apply form

3. **My Applications** (`/applications`)
   - List of submitted applications
   - Application status
   - Skill match percentage
   - View job link

4. **Create Job** (`/create-job`)
   - Post new job listing
   - Set salary, location, job type
   - Add required skills

5. **Login** (`/login`)
   - Login as student or company
   - JWT token management

6. **Register** (`/register`)
   - Register as student or company
   - Form validation

## Authentication Flow

1. User registers with email and password
2. Password is hashed with bcryptjs
3. User logs in and receives JWT token
4. Token is stored in localStorage
5. Token is included in Authorization header for protected routes
6. Backend verifies token on each request

## Key Features Implementation

### Skill Matching
- Calculates match percentage based on student's skills vs job's required skills
- Formula: (matched_skills / total_required_skills) * 100
- Displayed in job cards and applications

### Search & Filter
- Filter jobs by location (regex search)
- Filter by salary range (min/max)
- Filter by job type
- Pagination support

### Role-Based Access
- Student can only apply for jobs
- Student cannot see company endpoints
- Company can only post jobs
- Company cannot see student endpoints

## Error Handling

- Validation errors on form submission
- API error messages displayed to user
- Loading states for async operations
- Error alerts with helpful messages

## Future Enhancements

- [ ] Advanced search with multiple filters
- [ ] Job saved/bookmarks
- [ ] Application notifications
- [ ] Company dashboard with analytics
- [ ] Email notifications
- [ ] Resume upload
- [ ] Video interviews
- [ ] Admin dashboard
- [ ] Payment integration
- [ ] Real-time notifications with WebSockets

## Troubleshooting

### Backend won't start
- Ensure MongoDB is running: `mongod`
- Check `.env` file has correct MONGO_URI
- Ensure PORT 4000 is available

### Frontend won't connect to backend
- Verify backend is running on port 4000
- Check API URL in `src/services/api.js`
- Ensure CORS is enabled in backend

### Login/Register not working
- Check JWT_SECRET in backend `.env`
- Verify user credentials are correct
- Check browser console for error messages

## File Structure

```
Job_Marketplace/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Running Tests

### Backend Tests (Future)
```bash
cd backend
npm test
```

### Frontend Tests (Future)
```bash
cd frontend
npm test
```

## Deployment

### Backend Deployment (Heroku/Render)
1. Set environment variables on platform
2. Push to Git repository
3. Platform automatically deploys

### Frontend Deployment (Vercel/Netlify)
1. Run `npm run build`
2. Deploy `dist` folder
3. Update API URL to production backend

## Contributors

- Project Lead: [Your Name]
- Backend Developer: [Your Name]
- Frontend Developer: [Your Name]

## License

MIT License - feel free to use this project for learning purposes.
