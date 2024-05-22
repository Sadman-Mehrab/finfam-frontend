import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components";
import { config } from "../../config/config";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("access_token");
  if (token) {
    navigate("/dashboard");
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${config.BACKEND_URL}/api/users/sign-in`,
        { userName, password }
      );

      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("userName", response.data.userName);

      toast.success("Logged in!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Log in failure! Check your credentials");
      console.log("Failed to login:" + error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center py-28">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-box p-6 max-w-md "
        >
          <h1 className="text-3xl font-bold self-center">Log in</h1>

          <span className="self-center">
            Don't have an account?
            <Link to="/register" className="link link-secondary">
              {" "}
              Register
            </Link>
          </span>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              type="text"
              name="userName"
              id="userName"
              className="input input-bordered"
              value={userName}
              required
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Password</span>
            </div>

            <input
              type="password"
              name="password"
              id="password"
              className="input input-bordered"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit" className="btn btn-primary">
            Log in
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
