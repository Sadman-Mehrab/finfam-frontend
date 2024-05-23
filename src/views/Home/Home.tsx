import { Link } from "react-router-dom";
import { Navbar } from "../../components";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="hero h-screen ">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold">🏠 a wholesome way of contributing to family goals 🤗</h1>
            <p className="py-6 text-xl">progress through your family's financial goals together, one contribution at a time.</p>
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
