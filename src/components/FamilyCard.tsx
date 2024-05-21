import { Link } from "react-router-dom";
import FamilyAvatar from "./FamilyAvatar";

const FamilyCard = ({ family }: { family: any }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full">
      <figure>
        <FamilyAvatar familyName={family.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{family.name}</h2>
        <p>
          <b>Date Created: </b>
          {family.createdAt.slice(0, 10)}
        </p>
        <div className="card-actions justify-end">
          <Link to={`/families/${family._id}`} className="btn btn-primary">
            Enter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FamilyCard;
