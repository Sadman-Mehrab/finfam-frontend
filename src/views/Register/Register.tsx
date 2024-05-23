import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components";
import { config } from "../../config/config";

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${config.BACKEND_URL}/api/users/sign-up`,
        { userName, email, password }
      );

      toast.success("Registered!");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failure! Username or Email already exists.");
      console.log("Failed to register:" + error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center py-20">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-box p-6 max-w-md "
        >
          <h1 className="text-3xl font-bold self-center">Register</h1>

          <span className="self-center">
            Already have an account?
            <Link to="/login" className="link link-secondary">
              {" "}
              Login
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
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              name="email"
              id="email"
              className="input input-bordered"
              value={email}
              required
              pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
              title="Must be a valid email address"
              onChange={(e) => setEmail(e.target.value)}
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
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
