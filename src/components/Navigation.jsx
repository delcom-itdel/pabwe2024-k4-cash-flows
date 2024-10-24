import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaUser,
  FaRightFromBracket,
  FaTags,
  FaClock,
  FaChartBar,
} from "react-icons/fa6";

function Navigation({ authLogin, onAuthSignOut }) {
  const { id, name, photo } = authLogin;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Cash Flow K4
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navApp"
            aria-controls="navApp"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navApp">
            <ul className="navbar-nav ms-auto">
              <li className="mt-2 ms-2">
                <Link
                  className="btn btn-light btn-sm text-dark"
                  to="/cash-flows/stats/monthly"
                >
                  <FaChartBar className="me-1" />{" "}
                  {/* Spasi antara ikon dan teks */}
                  Cash Flow Stats Monthly
                </Link>
              </li>
              <li className="mt-2 ms-2">
                <Link
                  className="btn btn-light btn-sm text-dark"
                  to="/cash-flows/stats/daily"
                >
                  <FaClock className="me-1" />{" "}
                  {/* Spasi antara ikon dan teks */}
                  Cash Flow Stats Daily
                </Link>
              </li>
              <li className="mt-2 ms-2">
                <Link
                  className="btn btn-light btn-sm text-dark"
                  to="/cash-flows/labels"
                >
                  <FaTags className="me-1" /> {/* Spasi antara ikon dan teks */}
                  Cash Flow Labels
                </Link>
              </li>
              <li className="mt-2 ms-2">
                <Link
                  className="btn btn-light btn-sm text-dark"
                  to="/cash-flows/add"
                >
                  <FaPlus className="me-1" /> {/* Spasi antara ikon dan teks */}
                  Create Cash Flow
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link mx-2 dropdown-toggle"
                  href="#"
                  id="navUser"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    className="nav-profile"
                    src={photo || "/default-profile.png"}
                    alt={id}
                    title={name}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navUser"
                >
                  <li>
                    <Link className="dropdown-item" to="/users/me">
                      <FaUser className="me-1" />{" "}
                      {/* Spasi antara ikon dan teks */}
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={onAuthSignOut}
                    >
                      <FaRightFromBracket className="me-1" />{" "}
                      {/* Spasi antara ikon dan teks */}
                      Sign out
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

const authLoginShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  photo: PropTypes.string,
};

Navigation.propTypes = {
  authLogin: PropTypes.shape(authLoginShape).isRequired,
  onAuthSignOut: PropTypes.func.isRequired,
};

export default Navigation;
