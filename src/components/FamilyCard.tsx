import { Link } from "react-router-dom";
import FamilyAvatar from "./FamilyAvatar";
import AvatarGroup from "./AvatarGroup";
import { config } from "../config/config";
import axios from "axios";

const FamilyCard = ({
  family,
}: {
  family: any;
  onFamilyDelete: any;
}) => {


  return (
      <Link
        className="transform transition hover:-translate-y-1 w-96"
        to={`/families/${family._id}`}
      >
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
              <AvatarGroup members={family.members || []} />
            </div>
          </div>
        </div>
      </Link>

  );
};

export default FamilyCard;
