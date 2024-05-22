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
        <Link className="btn btn-ghost text-2xl" to="/">
          🏡 fin-fam
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
            <button onClick={handleLogout} className="btn btn-circle bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserNavbar;
