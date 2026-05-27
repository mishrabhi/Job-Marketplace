import { useState, useEffect } from 'react';
import { applicationAPI } from '../services/api';
import { Link } from 'react-router-dom';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await applicationAPI.getMyApplications();
      setApplications(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return '#28a745';
      case 'rejected':
        return '#dc3545';
      case 'reviewed':
        return '#ffc107';
      case 'pending':
      default:
        return '#17a2b8';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem' }}>My Applications</h1>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : applications.length > 0 ? (
        <div className="grid grid-2">
          {applications.map((app) => (
            <div key={app._id} className="card">
              <div style={{ marginBottom: '1rem' }}>
                <Link to={`/job/${app.job._id}`}>
                  <h3 style={{ color: '#007bff', marginBottom: '0.5rem' }}>
                    {app.job?.title || 'Job Title'}
                  </h3>
                </Link>
                <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                  {app.job?.company?.name || 'Company'}
                </p>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                padding: '1rem 0',
                borderTop: '1px solid #eee',
                borderBottom: '1px solid #eee',
                marginBottom: '1rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#999', textTransform: 'uppercase' }}>
                    Match
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#28a745' }}>
                    {app.match_percentage}%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#999', textTransform: 'uppercase' }}>
                    Applied
                  </div>
                  <div style={{ fontSize: '0.95rem' }}>
                    {formatDate(app.applied_date)}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  backgroundColor: getStatusColor(app.status),
                  color: 'white',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  textTransform: 'capitalize'
                }}>
                  {app.status}
                </span>
              </div>

              <Link to={`/job/${app.job._id}`}>
                <button className="btn btn-primary btn-block">
                  View Job
                </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">
          You haven't applied to any jobs yet.
          <br />
          <Link to="/" style={{ color: '#0c5460' }}>Browse jobs now</Link>
        </div>
      )}
    </div>
  );
}
