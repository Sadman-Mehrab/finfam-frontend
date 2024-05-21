import { Link, useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";

const UserNavbar = () => {
  const userName = localStorage.getItem("userName") || "";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to="/">
          🏦 fin-fam
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-1">
          <li>
            <Link to="/dashboard" className="btn btn-ghost btn-circle avatar">
              <div className="h-10 rounded-full">
                <UserAvatar userName={userName} />
              </div>
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserNavbar;
