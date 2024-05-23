import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("access_token");

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-2xl" to="/">
          🏡 fin-fam
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-1">
          <li>
            <Link className=" bg-primary" to="/dashboard">
              Launch App
            </Link>
          </li>
          {!token && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {!token && (
            <li>
              <Link to="/register">Register</Link>
            </li>
          )}
          

        </ul>
      </div>
    </div>
  );
};

export default Navbar;
