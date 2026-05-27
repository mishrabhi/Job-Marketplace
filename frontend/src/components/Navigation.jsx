import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navigation() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <div className="container">
        <Link to="/" className="logo">
          JobMarket
        </Link>
        <ul>
          <li>
            <Link to="/">Jobs</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/applications">My Applications</Link>
              </li>
              {user.role === 'company' && (
                <li>
                  <Link to="/create-job">Post Job</Link>
                </li>
              )}
              <li>
                <span>{user.name}</span>
              </li>
              <li>
                <button className="btn btn-secondary" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
