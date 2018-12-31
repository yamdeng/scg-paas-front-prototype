import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/chart">
              Chart
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/list">
              List
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
