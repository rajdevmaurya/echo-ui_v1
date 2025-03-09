import React from 'react';
import { Link } from 'react-router-dom';

const UserDropdown = ({ user, authenticated, onLoginLogout }) => {
  const username = authenticated && user ? user.name : 'Guest';
  const isAdmin = authenticated && user && user.role === 'ADMIN';
  const logInOutText = authenticated ? 'Logout' : 'Login';

  return (
    <div className="admin-dropdown">
      {authenticated
        ?
        <>
          <Link to="#" className="right hide-on-med-and-down dropdown-trigger" data-target="adminDropdown">
            Hi, {username} <i className="material-icons right">arrow_drop_down</i>
          </Link>
          <ul id="adminDropdown" className="dropdown-content">
            {authenticated && (
              <>
                <li><Link to="/"><i className="material-icons left">person</i> My Profile</Link></li>
                {!isAdmin && <li><Link to="/my-orders"><i className="material-icons left">track_changes</i> Track Your Service Request</Link></li>}
              </>
            )}
            <li>
              <Link to="#" onClick={onLoginLogout}>
                <i className="material-icons left">{authenticated ? 'exit_to_app' : 'person'}</i> {logInOutText}
              </Link>
            </li>
          </ul>
        </>
        :
        <Link to="/login" onClick={onLoginLogout}>
          <i style={{ marginRight: '0.5rem' }} className="material-icons left">{authenticated ? 'exit_to_app' : 'person'}</i> {logInOutText}
        </Link>
      }
    </div>
  );
};

export default UserDropdown;
