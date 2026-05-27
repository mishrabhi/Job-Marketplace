import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import JobListing from './pages/JobListing';
import JobDetail from './pages/JobDetail';
import Applications from './pages/Applications';
import CreateJob from './pages/CreateJob';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<JobListing />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/applications"
            element={
              <ProtectedRoute requiredRole="student">
                <Applications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-job"
            element={
              <ProtectedRoute requiredRole="company">
                <CreateJob />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
