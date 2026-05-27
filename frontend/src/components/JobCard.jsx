import { Link } from 'react-router-dom';

export default function JobCard({ job, matchPercentage }) {
  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(salary);
  };

  return (
    <div className="card job-card">
      <div className="job-header">
        <div>
          <Link to={`/job/${job._id}`}>
            <h2 className="job-title">{job.title}</h2>
          </Link>
          <p className="company-name">{job.company?.name || 'Company'}</p>
        </div>
        {matchPercentage !== undefined && (
          <div className="match-badge">
            {matchPercentage}% Match
          </div>
        )}
      </div>

      <div className="job-meta">
        <div className="meta-item">
          <div className="meta-label">Salary</div>
          <div className="meta-value">{formatSalary(job.salary)}</div>
        </div>
        <div className="meta-item">
          <div className="meta-label">Location</div>
          <div className="meta-value">{job.location}</div>
        </div>
        <div className="meta-item">
          <div className="meta-label">Type</div>
          <div className="meta-value">{job.job_type}</div>
        </div>
      </div>

      <p className="job-description">{job.description.substring(0, 150)}...</p>

      {job.required_skills && job.required_skills.length > 0 && (
        <div className="skills-list">
          {job.required_skills.map((skill) => (
            <span key={skill._id} className="skill-tag">
              {skill.name}
            </span>
          ))}
        </div>
      )}

      <Link to={`/job/${job._id}`}>
        <button className="btn btn-primary">View Details</button>
      </Link>
    </div>
  );
}
