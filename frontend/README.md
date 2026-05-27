# Job Marketplace - Frontend

A modern React-based frontend for the Job Marketplace application.

## Features

- **Job Listing**: Browse and filter jobs by location, salary, and job type
- **Job Details**: View detailed job information and company details
- **Job Applications**: Students can apply for jobs with automatic skill matching
- **Application Tracking**: Track the status of submitted applications
- **Job Posting**: Companies can post new job listings
- **Authentication**: JWT-based authentication for students and companies
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- React 18
- React Router v6
- Axios for API calls
- Vite for build tooling

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will run on `http://localhost:3000`

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Navigation.jsx
│   │   ├── JobCard.jsx
│   │   ├── ApplicationForm.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/          # React Context
│   │   └── AuthContext.jsx
│   ├── pages/            # Page components
│   │   ├── JobListing.jsx
│   │   ├── JobDetail.jsx
│   │   ├── Applications.jsx
│   │   ├── CreateJob.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── services/         # API services
│   │   └── api.js
│   ├── styles/           # CSS styles
│   │   └── index.css
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## Routes

- `/` - Job listing page
- `/job/:id` - Job detail page
- `/login` - Login page (students/companies)
- `/register` - Registration page (students/companies)
- `/applications` - My applications (protected, students only)
- `/create-job` - Post a new job (protected, companies only)

## Usage

### For Students
1. Register as a student with name, email, and password
2. Browse available jobs with filters
3. View job details and skill match percentage
4. Apply for jobs that match your skills
5. Track application status in "My Applications"

### For Companies
1. Register as a company with name, email, and description
2. Post new job listings with required skills
3. View job listings and manage applications (future feature)

## API Integration

The frontend connects to the backend API running on `http://localhost:4000/api`

### Available Endpoints
- `POST /auth/student/register` - Register as student
- `POST /auth/student/login` - Login as student
- `POST /auth/company/register` - Register as company
- `POST /auth/company/login` - Login as company
- `GET /jobs` - Get all jobs with filters
- `GET /jobs/:id` - Get job details
- `POST /jobs` - Create a new job
- `POST /applications` - Apply for a job
- `GET /applications` - Get my applications
- `PUT /applications/:id` - Update application status

## Authentication

The frontend uses JWT tokens for authentication. Tokens are stored in localStorage and automatically included in all API requests.

## Styling

The application uses custom CSS with a clean, modern design. All styles are in `src/styles/index.css`.

## Development

To build for production:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Future Enhancements

- Advanced filtering and search capabilities
- Application status notifications
- User profile management
- Job post editing and deletion
- Skills management for students
- Company dashboard with analytics
- Real-time notifications
