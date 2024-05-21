import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AvatarGroup from "./AvatarGroup";

const GoalCard = ({ goal }: { goal: any }) => {
  const [goalProgress, setGoalProgress] = useState({
    totalAmount: 0,
    totalCompleted: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const fetchGoalProgress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/goals/progress/${goal._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGoalProgress(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Failed to fetch goal progress:", error);
      }
    };
    fetchGoalProgress();
  }, []);

  return (
    <Link className="w-96" to={`/goals/${goal._id}`}>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{goal.name}</h2>

          <progress
            className="progress progress-info w-56"
            value={goalProgress.totalCompleted}
            max={goalProgress.totalAmount}
          ></progress>
          <p>
            <b>Total Amount: </b>${goalProgress.totalAmount}
          </p>
          <p>
            <b>Amount Completed: </b>${goalProgress.totalCompleted}
          </p>
          <p>
            <b>Percentage: </b>
            {((goalProgress.totalCompleted / goalProgress.totalAmount) * 100)
              .toString()
              .slice(0, 5)}
            %
          </p>
          <p>
            <b>Date Created: </b>
            {goal.createdAt.slice(0, 10)}
          </p>
          <div className="card-actions justify-end">
            <AvatarGroup members={goal.contributors} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GoalCard;
