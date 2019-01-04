import React from 'react';
import { Link } from 'react-router-dom';
import Config from '../config/Config';

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
            <Link className="nav-link" to="/profile">
              프로필
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/setting">
              설정
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to={`/safeHistory/${Config.contractNo}`}>
              안전점검 이력조회
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/tariff">
              가스요금조회
            </Link>
          </li>
          <li className="nav-item active">
            <Link
              className="nav-link"
              to={`/monthInfo/201812/${Config.contractNo}`}
            >
              청구요금조회
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
