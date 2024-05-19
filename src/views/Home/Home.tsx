import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <p>home is where R is, but dashboard is:</p>
      <Link className="btn btn-circle" to="/dashboard">here</Link>
    </div>
  );
};

export default Home;
