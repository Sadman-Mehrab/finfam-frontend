import { Link } from "react-router-dom";
import { Navbar } from "../../components";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="hero min-h-screen ">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Very Good Web App Thanks
            </p>
            <Link to="/dashboard" className="btn btn-primary">
              Launch App
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
