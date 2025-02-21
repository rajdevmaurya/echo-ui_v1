import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { JobContext } from '../context/JobContext';
import M from 'materialize-css';
import TopHeader from './TopHeader';
import Search from '../UI/Search';
import SiteLogo from '../../assets/echo_logo.png';
import classes from './Header.module.css';

const defaultDropdownOptions = {
  coverTrigger: false,
  constrainWidth: false,
};

const dropdownOptions = {
  ...defaultDropdownOptions,
  closeOnClick: false,
  hover: true,
};

const adminDropdownOptions = {
  ...dropdownOptions,
  alignment: 'right',
};

const sidebarDropdownOptions = {
  ...defaultDropdownOptions,
  closeOnClick: true,
  inDuration: 300,
  outDuration: 200,
  onOpenStart: (el) => {
    if (window.innerWidth <= 992) {
      el.closest("li").classList.add("dropdown-expanded");
    }
  },
  onCloseEnd: (el) => {
    if (window.innerWidth <= 992) {
      el.closest("li").classList.remove("dropdown-expanded");
    }
  },
};

const Header = () => {
  const { getUser, userIsAuthenticated, userLogout } = useAuth();
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const { searchJob } = useContext(JobContext);
  const location = useLocation();

  useEffect(() => {
    searchJob('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    // Check authentication and get user data
    const checkAuthentication = async () => {
      const isAuthenticated = await userIsAuthenticated();
      setAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const userData = await getUser();
        setUser(userData);
      } else {
        setUser(null);
      }
    };

    checkAuthentication();
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
      // Destroy instances to avoid memory leaks
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

  const navigationLinks = [
   // { path: "/", label: "Home", roles: ["GUEST", "USER", "STAFF", "ADMIN"] },
   // {
    //  path: "/customer", label: "Sales & Services",
    //  roles: ["GUEST", "USER", "STAFF", "ADMIN"],
    //},
    //{
    //  path: "/staff", label: "Partners", roles: ["STAFF", "ADMIN"],
    //  dropdown: [
      //  { path: "/staff", label: "Update Details" },
    //    { path: "/", label: "My Pending Request" },
        //{ path: "/", label: "Closed Request" },
      //]
    //},
    {
      path: "/", label: "Medical Devices",
      roles: ["GUEST", "USER", "STAFF", "ADMIN"],
      dropdown: [
        { path: "/le", label: "Lab Equipments" },
        { path: "/de", label: "Dental Equipments" },
        { path: "/xray", label: "X-Ray" },
        { path: "/usm", label: "Ultrasound Machines" },
      ]
    },
    {
      path: "/tools", label: "Tools",
      roles: ["GUEST", "USER", "STAFF", "ADMIN"],
      dropdown: [
        { path: "/opt", label: "Orthopedic Power Tools" },
        { path: "/sis", label: "Surgical Instrument Sets" },
        { path: "/sm", label: "Sports Medicine" },
      ]
    }, 
    { path: "/tm", label: " Trolley & Mounting", roles: ["GUEST", "USER", "STAFF", "ADMIN"] },
    { path: "/", label: "Medicines", roles: ["GUEST", "USER", "STAFF", "ADMIN"] },
    {
      path: "/staff", label: "Partners", roles: ["STAFF", "ADMIN"],
      dropdown: [
        { path: "/staff", label: "Update Details" },
        { path: "/", label: "My Pending Request" },
        { path: "/", label: "Closed Request" },
      ]
    },
    {
      path: "/admin", label: "Admin",
      roles: ["ADMIN"],
      dropdown: [
        { path: "/admin", label: "Add/Update Details" },
        { path: "/", label: "All Service Request" },
      ]
    },
    {
      path: "/customer", label: "Sales & Services",
      roles: ["GUEST", "USER", "STAFF", "ADMIN"],
     // dropdown: [
      //  { path: "/customer", label: "Customer" },
     //   { path: "/", label: "More Customers" },
     // ]
    },
  ];

  const generateNavList = (menuType) => {
    return navigationLinks
      .filter(({ roles }) => (authenticated ? roles.includes(user?.role) : roles.includes("GUEST")))
      .map(({ path, label, dropdown }, index) => {
        if (dropdown) {
          const dropdownId = `dropdown-${label.toLowerCase()}-${menuType}`;
          return (
            <li key={`${label}-${index}`}>
              <NavLink to={path || ''} className="dropdown-trigger" data-target={dropdownId} end>
                {label} <i className="material-icons right">arrow_drop_down</i>
              </NavLink>
              <ul id={dropdownId} className="dropdown-content">
                {dropdown.map(({ path, label }) => (
                  <li key={`${path}-${index}`}><NavLink to={path} end>{label}</NavLink></li>
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
              <div className="admin-dropdown">
                <Link to='#' className={`right hide-on-med-and-down dropdown-trigger ${classes['user-welcome']}`} data-target="adminDropdown">
                  Hi, {username} <i className="material-icons right">arrow_drop_down</i>
                  {/* <i className="material-icons">account_circle</i> */}
                </Link>
                <ul id="adminDropdown" className="dropdown-content">
                  {authenticated &&
                    <li><Link to="/"><i className="material-icons left">person</i> My Profile</Link></li>
                  }
                  <li>{loginLogoutLink}</li>
                </ul>
              </div>
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
        <li>{loginLogoutLink}</li>
      </ul>
    </React.Fragment>
  );
};

export default Header;
