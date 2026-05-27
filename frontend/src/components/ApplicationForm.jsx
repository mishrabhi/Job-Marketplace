import { useState } from 'react';
import { applicationAPI } from '../services/api';

export default function ApplicationForm({ jobId, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await applicationAPI.applyForJob({ jobId });
      setSuccess(true);
      setTimeout(() => {
        onSuccess?.();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply for job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>Apply for this job</h3>
      
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">Application submitted successfully!</div>}

      <form onSubmit={handleSubmit}>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          You're about to apply for this position. Once submitted, the company will review your application.
        </p>
        <button
          type="submit"
          className="btn btn-success btn-block"
          disabled={loading || success}
        >
          {loading ? 'Submitting...' : success ? 'Applied!' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}
