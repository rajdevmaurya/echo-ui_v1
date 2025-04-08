import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { JobContext } from '../context/JobContext';
import M from 'materialize-css';
import TopHeader from './TopHeader';
import Search from '../UI/Search';
import CartIcon from '../UI/CartIcon'; // Import CartIcon component
import SiteLogo from '../../assets/echo_logo.png';
import classes from './Header.module.css';
import navigationLinks from './helper/navigationLinks';
import UserDropdown from './helper/UserDropdown';
import { adminDropdownOptions, dropdownOptions, sidebarDropdownOptions } from './helper/dropdownOptions';

const closeAllDropdowns = () => {
  document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
    const instance = M.Dropdown.getInstance(trigger);
    if (instance) instance.close();
  });
};

const Header = () => {
  const { getUser, userIsAuthenticated, userLogout } = useAuth();
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const { searchJob } = useContext(JobContext);
  const location = useLocation();

  useEffect(() => {
    closeAllDropdowns();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    let isMounted = true;

    const checkAuthentication = async () => {
      const isAuthenticated = await userIsAuthenticated();
      if (isMounted) setAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const userData = await getUser();
        if (isMounted) setUser(userData);
      } else {
        if (isMounted) setUser(null);
      }
    };

    checkAuthentication();

    return () => {
      isMounted = false;
    };
  }, [getUser, userIsAuthenticated]);

  useEffect(() => {
    // Initialize Materialize components
    const sidenavElems = document.querySelectorAll('.sidenav');
    const sidebarDropdownElems = document.querySelectorAll('.sidenav .dropdown-trigger');
    const dropdownElems = document.querySelectorAll('.primary-menu .dropdown-trigger');
    const adminDropdownElems = document.querySelectorAll('.admin-dropdown .dropdown-trigger');

    const sidenavInstances = M.Sidenav.init(sidenavElems);
    const sidebarDropdownInstances = M.Dropdown.init(sidebarDropdownElems, sidebarDropdownOptions);
    const dropdownInstances = M.Dropdown.init(dropdownElems, dropdownOptions);
    const adminDropdownInstances = M.Dropdown.init(adminDropdownElems, adminDropdownOptions);

    return () => {
      sidenavInstances.forEach(instance => instance.destroy());
      sidebarDropdownInstances.forEach(instance => instance.destroy());
      dropdownInstances.forEach(instance => instance.destroy());
      adminDropdownInstances.forEach(instance => instance.destroy());
    };
  }, [authenticated, user]);

  const handleLoginLogout = () => {
    if (authenticated) {
      userLogout();
      M.toast({ html: 'Logout successful!', classes: 'green' });
    } else {
      window.location.href = '/login';
    }
  };

  const username = authenticated && user ? user.name : 'Guest';
  const logInOutText = authenticated ? 'Logout' : 'Login';

  const generateNavList = (menuType) => {
    return navigationLinks
      .filter(({ roles }) => (authenticated ? roles.includes(user?.role) : roles.includes("GUEST")))
      .map(({ path, label, dropdown }) => {
        if (dropdown) {
          const dropdownId = `dropdown-${label.toLowerCase().replace(/\s+/g, "-")}-${menuType}`;
          return (
            <li key={dropdownId}>
              <NavLink to={path || ''} className="dropdown-trigger" data-target={dropdownId} end>
                {label} <i className="material-icons right">arrow_drop_down</i>
              </NavLink>
              <ul id={dropdownId} className="dropdown-content">
                {dropdown.map(({ path, label }) => (
                  <li key={path}>
                    <NavLink to={path} 
                      end
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default navigation if needed
                        const instance = M.Dropdown.getInstance(document.getElementById(dropdownId));
                        if (instance) instance.close(); // Close dropdown after clicking
                        window.location.href = path; // Navigate to the selected path
                      }}>
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          );
        }
        return <li key={path}><NavLink to={path} end>{label}</NavLink></li>;
      });
  };

  const loginLogoutLink = <Link to="#" onClick={handleLoginLogout}>
    {authenticated ? <i className="material-icons left">exit_to_app</i> : <i className="material-icons left">person</i>} {logInOutText}
  </Link>;

  return (
    <React.Fragment>
      <header className={`${classes.header}`}>
        <TopHeader />
        <nav className="nav-extended transparent">
          <div className={`${classes['top-nav']}`}>
            <div className={`${classes['container']} container`}>
              <Link to="/" className={`${classes['brand-logo']} brand-logo`}>
                <img src={SiteLogo} alt='Echo Health care' />
                <span className="sr-only">Echo Health care</span>
              </Link>  
              <Search searchJob={searchJob} key={location.pathname} />
              {/* Mobile Menu Trigger */}
              <CartIcon />
              <a href="#!" data-target="mobile-menu" className="sidenav-trigger hide-on-large-only">
                <i className="material-icons">menu</i>
              </a>
            </div>          
          </div>

          {/* Navigation Links */}
          <div className={`${classes['bottom-nav']}`}>
            <div className={`${classes['container']} container`}>
              <ul className="hide-on-med-and-down primary-menu">
                {generateNavList("desktop")}
                
              </ul>
              <UserDropdown user={user} authenticated={authenticated} onLoginLogout={handleLoginLogout} />
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Sidenav */}
      <ul className={`${classes.sidenav} sidenav`} id="mobile-menu">
        <li>
          <Link to="/" className={`${classes['brand-logo']} brand-logo`} style={{ backgroundColor: 'var(--primary-color)' }}>
            <img src={SiteLogo} alt='Echo Health care' />
            <span className="sr-only">Echo Health care</span>
          </Link>
        </li>
        <li className="greeting">Hi {username}</li>
        {generateNavList("mobile")}
        <li><Link to="/cart"><i className="material-icons left">shopping_cart</i> Cart</Link></li> {/* Add Cart link to mobile menu */}
        <li>{loginLogoutLink}</li>
      </ul>
    </React.Fragment>
  );
};

export default Header;