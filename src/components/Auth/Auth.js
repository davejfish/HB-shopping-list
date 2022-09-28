import { NavLink, Redirect, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './Auth.css';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { authUser } from '../../services/auth';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { type } = useParams();

  const { user, setUser } = useContext(UserContext);

  const submitAuth = async () => {
    // TODO
    const response = await authUser(email, password, type);
    setUser(response);
    setEmail('');
    setPassword('');
  };

  if (user) {
    return <Redirect to='/items'/>;
  } 

  return (
    <div className="auth box">
      <nav className="panel is-success">
        <div className="panel-heading">Welcome to Alchemy Shopping List</div>
        <div className="panel-tabs">
          <NavLink
            className="is-size-6 has-text-weight-bold"
            to="/auth/sign-in"
            activeClassName="is-active"
          >
            Sign In
          </NavLink>
          <NavLink
            className="is-size-6 has-text-weight-bold"
            to="/auth/sign-up"
            activeClassName="is-active"
          >
            Sign Up
          </NavLink>
        </div>
        <div className="panel-block">
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faLock} />
              </span>
            </div>
          </div>
        </div>
        <div className="control">
          <button onClick={submitAuth} className="button is-success mt-2 mb-2">
            Submit
          </button>
        </div>
      </nav>
    </div>
  );
}
