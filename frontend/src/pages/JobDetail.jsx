import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobAPI } from '../services/api';
import ApplicationForm from '../components/ApplicationForm';
import { AuthContext } from '../context/AuthContext';

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await jobAPI.getJobById(id);
      setJob(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch job details');
    } finally {
      setLoading(false);
    }
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(salary);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container">
        <div className="alert alert-error">
          {error || 'Job not found'}
        </div>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <button className="btn btn-secondary" onClick={() => navigate('/')}>
        ← Back to Jobs
      </button>

      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', marginTop: '2rem' }}>
        {/* Main Content */}
        <div>
          <div className="card">
            <h1 style={{ marginBottom: '0.5rem' }}>{job.title}</h1>
            <p className="company-name" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
              {job.company?.name}
            </p>

            <div className="job-meta" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div className="meta-item">
                <div className="meta-label">Salary</div>
                <div className="meta-value">{formatSalary(job.salary)}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Location</div>
                <div className="meta-value">{job.location}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Job Type</div>
                <div className="meta-value">{job.job_type}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Posted</div>
                <div className="meta-value">{formatDate(job.posted_date)}</div>
              </div>
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Job Description</h3>
            <p style={{ lineHeight: '1.8', color: '#555' }}>{job.description}</p>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Required Skills</h3>
            {job.required_skills && job.required_skills.length > 0 ? (
              <div className="skills-list">
                {job.required_skills.map((skill) => (
                  <span key={skill._id} className="skill-tag">
                    {skill.name}
                  </span>
                ))}
              </div>
            ) : (
              <p>No specific skills required</p>
            )}

            {job.company && (
              <>
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>About the Company</h3>
                <p style={{ color: '#555' }}>{job.company.description || 'No description provided'}</p>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>
                  <strong>Location:</strong> {job.company.location}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {user && user.role === 'student' ? (
            <ApplicationForm jobId={job._id} onSuccess={() => navigate('/applications')} />
          ) : user && user.role === 'company' ? (
            <div className="card">
              <p style={{ color: '#666' }}>Companies cannot apply for jobs.</p>
            </div>
          ) : (
            <div className="card">
              <p style={{ marginBottom: '1rem', color: '#666' }}>
                Log in as a student to apply for this job.
              </p>
              <button
                className="btn btn-primary btn-block"
                onClick={() => navigate('/login')}
              >
                Login to Apply
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
