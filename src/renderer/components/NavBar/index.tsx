import { Link } from 'react-router-dom';

const NavLinks = () => {
  return (
    <div id="nav-links">
      <div className="nav-link">
        <Link to="/">Library</Link>
      </div>
      <div className="nav-link">
        <i className="gg-search" />
        Search
      </div>
    </div>
  );
};

const NavLogo = () => {
  return (
    <div id="nav-logo">
      <div id="logo-icon">
        <i className="gg-play-button-o" />
      </div>
      <span id="logo-text">Player</span>
    </div>
  );
};

const NavBar = () => {
  return (
    <div className="NavBar">
      <NavLogo />
      <NavLinks />
    </div>
  );
};

export default NavBar;
