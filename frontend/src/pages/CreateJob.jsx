import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobAPI } from '../services/api';

export default function CreateJob() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salary: '',
    location: '',
    job_type: 'full-time',
    required_skills: [],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = {
        ...formData,
        salary: Number(formData.salary),
      };

      const response = await jobAPI.createJob(data);
      
      if (response.data.success) {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px', marginTop: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Post a New Job</h1>

      <div className="card">
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full">
              <label>Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Senior React Developer"
                required
              />
            </div>

            <div className="form-group full">
              <label>Job Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                placeholder="Describe the role, responsibilities, and what you're looking for..."
                required
              />
            </div>

            <div className="form-group">
              <label>Salary (USD)</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g., 100000"
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., New York, NY"
                required
              />
            </div>

            <div className="form-group">
              <label>Job Type</label>
              <select
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <div className="form-group full">
              <label>Required Skills (comma-separated)</label>
              <input
                type="text"
                placeholder="e.g., React, Node.js, MongoDB"
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    required_skills: e.target.value
                      .split(',')
                      .map((s) => s.trim())
                      .filter((s) => s),
                  }));
                }}
              />
              <small style={{ color: '#666', marginTop: '0.5rem', display: 'block' }}>
                {formData.required_skills.length > 0 && (
                  <>
                    Selected: {formData.required_skills.join(', ')}
                  </>
                )}
              </small>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ flex: 1 }}
            >
              {loading ? 'Posting...' : 'Post Job'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/')}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
