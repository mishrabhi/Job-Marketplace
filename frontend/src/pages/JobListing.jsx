import { useState, useEffect, useContext } from 'react';
import { jobAPI } from '../services/api';
import JobCard from '../components/JobCard';
import { AuthContext } from '../context/AuthContext';

export default function JobListing() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    minSalary: '',
    maxSalary: '',
    jobType: '',
    page: 1,
    limit: 10,
  });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await jobAPI.getAllJobs(filters);
      setJobs(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1, // Reset to first page on filter change
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem' }}>Job Listings</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="minSalary"
          placeholder="Min Salary"
          value={filters.minSalary}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxSalary"
          placeholder="Max Salary"
          value={filters.maxSalary}
          onChange={handleFilterChange}
        />
        <select
          name="jobType"
          value={filters.jobType}
          onChange={handleFilterChange}
        >
          <option value="">Job Type</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="internship">Internship</option>
          <option value="contract">Contract</option>
        </select>
      </form>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : jobs.length > 0 ? (
        <div className="grid grid-2">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="alert alert-info">No jobs found. Try adjusting your filters.</div>
      )}
    </div>
  );
}
