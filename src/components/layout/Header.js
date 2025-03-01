import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { JobContext } from '../context/JobContext';
import M from 'materialize-css';
import TopHeader from './TopHeader';
import Search from '../UI/Search';
import SiteLogo from '../../assets/echo_logo.png';
import classes from './Header.module.css';

const dropdownOptions = {
  coverTrigger: false,
  constrainWidth: false,
  closeOnClick: false,
  hover: true,
};

const sidebarDropdownOptions = {
  ...dropdownOptions,
  closeOnClick: true,
  inDuration: 3000,
  outDuration: 2000,
  onOpenStart: (el) => window.innerWidth <= 992 && el.closest("li")?.classList.add("dropdown-expanded"),
  onCloseEnd: (el) => window.innerWidth <= 992 && el.closest("li")?.classList.remove("dropdown-expanded"),
};

const Header = () => {
  const { getUser, userIsAuthenticated, userLogout } = useAuth();
  const { searchJob } = useContext(JobContext);
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    searchJob('');
  }, [location.pathname, searchJob]);

  useEffect(() => {
    (async () => {
      const isAuthenticated = await userIsAuthenticated();
      setAuthenticated(isAuthenticated);
      setUser(isAuthenticated ? await getUser() : null);
    })();
  }, [userIsAuthenticated, getUser]);

  useEffect(() => {
    const elems = {
      sidenav: document.querySelectorAll('.sidenav'),
      sidebarDropdown: document.querySelectorAll('.sidenav .dropdown-trigger'),
      dropdown: document.querySelectorAll('.primary-menu .dropdown-trigger'),
      adminDropdown: document.querySelectorAll('.admin-dropdown .dropdown-trigger'),
    };

    const instances = {
      sidenav: M.Sidenav.init(elems.sidenav),
      sidebarDropdown: M.Dropdown.init(elems.sidebarDropdown, sidebarDropdownOptions),
      dropdown: M.Dropdown.init(elems.dropdown, dropdownOptions),
      adminDropdown: M.Dropdown.init(elems.adminDropdown, { ...dropdownOptions, alignment: 'right' }),
    };

    return () => Object.values(instances).forEach(inst => inst.forEach(i => i.destroy()));
  }, [authenticated, user]);

  //const handleLoginLogout = () => {
   // authenticated ? userLogout() && M.toast({ html: 'Logout successful!', classes: 'green' }) : window.location.href = '/login';
  //};

  const handleLoginLogout = async () => {
    if (authenticated) {
      await userLogout();
      M.toast({ html: 'Logout successful!', classes: 'green' });
    } else {
      window.location.href = '/login';
    }
  };
  

  const username = user?.name || 'Guest';
  const logInOutText = authenticated ? 'Logout' : 'Login';

  const navigationLinks = useMemo(() => [
    {
      path: "/collection", label: "Medical Devices", roles: ["GUEST", "USER", "STAFF", "ADMIN"],
      dropdown: [
        { path: "/collection/le", label: "Lab Equipments" },
        { path: "/collection/de", label: "Dental Equipments" },
        { path: "/collection/xray", label: "X-Ray" },
        { path: "/collection/usm", label: "Ultrasound Machines" },
      ]
    },
    {
      path: "/collection/tools", label: "Tools", roles: ["GUEST", "USER", "STAFF", "ADMIN"],
      dropdown: [
        { path: "/collection/opt", label: "Orthopedic Power Tools" },
        { path: "/collection/sis", label: "Surgical Instrument Sets" },
        { path: "/collection/sm", label: "Sports Medicine" },
      ]
    },
    { path: "/collection/tms", label: "Trolley & Mounting", roles: ["GUEST", "USER", "STAFF", "ADMIN"] },
    //{ path: "/staff", label: "Staff", roles: ["STAFF", "ADMIN"], dropdown: [{ path: "/staff", label: "Update Details" }] },
    { path: "/admin", label: "Admin Master", roles: ["ADMIN"], dropdown: [{ path: "/admin", label: "Add/Update Details" }, { path: "/c", label: "All Service Request" }] },
    { path: "/collection", label: "Sales & Services", roles: ["GUEST", "USER", "STAFF", "ADMIN"] },
  ], []);

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

  const loginLogoutLink = (
    <Link to="#" onClick={handleLoginLogout}>
      <i className="material-icons left">{authenticated ? "exit_to_app" : "person"}</i> {logInOutText}
    </Link>
  );

  return (
    <>
      <header className={classes.header}>
        <TopHeader />
        <nav className="nav-extended transparent">
          <div className={classes['top-nav']}>
            <div className={`${classes.container} container`}>
              <Link to="/" className={`${classes['brand-logo']} brand-logo`}>
                <img src={SiteLogo} alt="Echo Health care" />
                <span className="sr-only">Echo Health care</span>
              </Link>
              <Search searchJob={searchJob} key={location.pathname} />
              <a href="#!" data-target="mobile-menu" className="sidenav-trigger hide-on-large-only">
                <i className="material-icons">menu</i>
              </a>
            </div>
          </div>

          <div className={classes['bottom-nav']}>
            <div className={`${classes.container} container`}>
              <ul className="hide-on-med-and-down primary-menu">{generateNavList("desktop")}</ul>
              <div className="admin-dropdown">
                <Link to="#" className={`right hide-on-med-and-down dropdown-trigger ${classes['user-welcome']}`} data-target="adminDropdown">
                  Hi, {username} <i className="material-icons right">arrow_drop_down</i>
                </Link>
                <ul id="adminDropdown" className="dropdown-content">
                  {authenticated && <li><Link to="/"><i className="material-icons left">person</i> My Profile</Link></li>}
                  <li>{loginLogoutLink}</li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <ul className={`${classes.sidenav} sidenav`} id="mobile-menu">
        <li>
          <Link to="/" className={`${classes['brand-logo']} brand-logo`} style={{ backgroundColor: 'var(--primary-color)' }}>
            <img src={SiteLogo} alt="Echo Health care" />
            <span className="sr-only">Echo Health care</span>
          </Link>
        </li>
        <li className="greeting">Hi {username}</li>
        {generateNavList("mobile")}
        <li>{loginLogoutLink}</li>
      </ul>
    </>
  );
};

export default Header;
