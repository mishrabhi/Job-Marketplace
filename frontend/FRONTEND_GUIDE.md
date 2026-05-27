# Frontend Implementation Guide

## Overview

A complete React frontend for the Job Marketplace application with full authentication, job browsing, filtering, and application management.

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx          # Navigation bar with auth links
│   │   ├── JobCard.jsx             # Job listing card component
│   │   ├── ApplicationForm.jsx     # Job application form
│   │   └── ProtectedRoute.jsx      # Route protection wrapper
│   ├── context/
│   │   └── AuthContext.jsx         # Authentication state management
│   ├── pages/
│   │   ├── JobListing.jsx          # Main job listing page
│   │   ├── JobDetail.jsx           # Individual job detail page
│   │   ├── Applications.jsx        # My applications page
│   │   ├── CreateJob.jsx           # Post new job page
│   │   ├── Login.jsx               # Login page
│   │   └── Register.jsx            # Registration page
│   ├── services/
│   │   └── api.js                  # API service with axios
│   ├── styles/
│   │   └── index.css               # Global styles
│   ├── App.jsx                     # Main app component with routing
│   └── main.jsx                    # React DOM entry point
├── index.html                      # HTML template
├── vite.config.js                  # Vite configuration
├── package.json                    # Dependencies
├── .gitignore                      # Git ignore rules
├── .env.example                    # Environment variables example
├── README.md                       # Frontend readme
└── .DS_Store
```

## Components

### Navigation.jsx
- Displays app logo and navigation links
- Shows user name and logout button when authenticated
- Different links for students vs companies
- Responsive navigation

### JobCard.jsx
- Reusable component for displaying job listings
- Shows job title, company, salary, location
- Displays skill match percentage
- Links to job detail page
- Salary formatting

### ApplicationForm.jsx
- Simple form to submit job application
- Loading and error states
- Success message on submission
- Redirects to applications page after success

### ProtectedRoute.jsx
- Wraps protected pages requiring authentication
- Redirects to login if not authenticated
- Supports role-based access (student/company)
- Shows loading spinner while checking auth

## Pages

### JobListing.jsx
- Browse all jobs with pagination
- Search and filter functionality:
  - Location search
  - Salary range (min/max)
  - Job type filter
- Grid layout for job cards
- Loading and error states
- Empty state message

### JobDetail.jsx
- Full job information display
- Company details
- Required skills list
- Apply button for authenticated students
- Back to jobs navigation
- Login prompt for unauthenticated users
- Formatted dates and salaries

### Applications.jsx
- Lists all submitted applications for student
- Shows:
  - Job title and company
  - Application status (pending/reviewed/accepted/rejected)
  - Skill match percentage
  - Application date
- Color-coded status badges
- Links to job details
- Empty state with browse jobs link

### CreateJob.jsx
- Form to post new job listing (company only)
- Fields:
  - Job title
  - Description (textarea)
  - Salary
  - Location
  - Job type dropdown
  - Required skills
- Input validation
- Error handling
- Redirect to home on success

### Login.jsx
- Toggle between student and company login
- Email and password fields
- Remember me functionality
- Link to registration page
- Error messages
- Loading state during submission

### Register.jsx
- Role selection (student/company)
- Common fields:
  - Name
  - Email
  - Password
  - Confirm password
- Student-specific fields:
  - Experience level dropdown
- Company-specific fields:
  - Description
  - Location
- Form validation
- Error handling

## Services

### api.js
Axios instance with interceptors:
- Base URL configuration
- JWT token injection in headers
- Auth endpoints (register/login)
- Job endpoints (CRUD operations)
- Application endpoints

## Context

### AuthContext.jsx
State management for authentication:
- Stores user data and token
- Login/logout functions
- Persistent storage in localStorage
- Loading state for initial auth check
- Provides auth state to entire app

## Styling

### index.css
Comprehensive CSS covering:
- Global styles and resets
- Navigation styling
- Card components
- Forms and inputs
- Buttons with hover effects
- Search and filter bars
- Alert messages
- Loading spinners
- Grid layouts
- Responsive design
- Color scheme:
  - Primary: #007bff (blue)
  - Success: #28a745 (green)
  - Danger: #dc3545 (red)
  - Secondary: #6c757d (gray)

## Routing

```
/                  → JobListing (public)
/job/:id           → JobDetail (public)
/login             → Login (public)
/register          → Register (public)
/applications      → Applications (protected, student only)
/create-job        → CreateJob (protected, company only)
```

## Authentication Flow

1. User registers on `/register`
2. Form validates input
3. Sends POST request to backend
4. Backend returns token and user data
5. Frontend stores token in localStorage
6. User redirected to home page
7. Subsequent requests include token in Authorization header
8. Token automatically injected by axios interceptor

## API Integration

### Base Configuration
```javascript
const API_BASE_URL = 'http://localhost:4000/api';
```

### Request Interceptor
Automatically adds JWT token to all requests:
```javascript
Authorization: Bearer {token}
```

### Endpoints Used

**Auth**
- POST `/auth/student/register`
- POST `/auth/student/login`
- POST `/auth/company/register`
- POST `/auth/company/login`

**Jobs**
- GET `/jobs?location=&minSalary=&maxSalary=&jobType=`
- GET `/jobs/:id`
- POST `/jobs`
- PUT `/jobs/:id`
- DELETE `/jobs/:id`

**Applications**
- POST `/applications`
- GET `/applications`
- PUT `/applications/:id`

## State Management

### AuthContext
- Manages user authentication state
- Provides login/logout functions
- Persists to localStorage
- Used by ProtectedRoute and Navigation

### Component-level state
- Form inputs
- Loading states
- Error messages
- Data fetching states

## Error Handling

- Form validation before submission
- Try-catch blocks around API calls
- User-friendly error messages
- Alert components for different message types
- Console logging for debugging

## Performance Features

- Lazy loading with React Router
- Conditional rendering
- CSS animations and transitions
- Responsive grid layouts
- Efficient re-renders with Context

## Browser Compatibility

- Works on all modern browsers
- Mobile-responsive design
- Touch-friendly interface
- Tested on Chrome, Firefox, Safari, Edge

## Development Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create `.env` file:
```
VITE_API_URL=http://localhost:4000/api
```

## Key Features Implemented

✅ Complete authentication system
✅ Job browsing with filters
✅ Job details view
✅ Application submission
✅ Application tracking
✅ Job posting (companies)
✅ Role-based access control
✅ JWT token management
✅ Responsive design
✅ Error handling and validation
✅ Loading states
✅ Skill match calculation
✅ Formatted dates and currency

## Future Enhancement Opportunities

- [ ] Search by job title/keyword
- [ ] Saved jobs/bookmarks
- [ ] Advanced filters (experience level, etc.)
- [ ] Notification system
- [ ] User profile page
- [ ] Resume upload
- [ ] Application comments
- [ ] Email notifications
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Analytics dashboard
- [ ] Real-time updates with WebSockets

## Testing Scenarios

### Student Flow
1. Register as student
2. Browse jobs
3. Filter jobs
4. View job details
5. Apply for job
6. View applications
7. Check status

### Company Flow
1. Register as company
2. Post a job
3. View posted jobs
4. View applications (future)

### Authentication Flow
1. Register with invalid email
2. Register with weak password
3. Login with wrong credentials
4. Logout and verify redirect
5. Access protected route without auth

## Debugging Tips

- Check browser console for errors
- Verify backend is running on port 4000
- Check network tab for API calls
- Verify token in localStorage
- Check authContext state in React DevTools
