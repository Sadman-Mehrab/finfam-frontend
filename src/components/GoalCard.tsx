import axios from "axios";
import { useEffect, useState } from "react";

import AvatarGroup from "./AvatarGroup";
import CreateContributionModal from "./CreateContributionModal";

const GoalCard = ({
  goal,
  handleGoalRefresh,
}: {
  goal: any;
  handleGoalRefresh: any;
}) => {
  const [goalProgress, setGoalProgress] = useState({
    totalAmount: 0,
    totalCompleted: 0,
  });

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    handleGoalRefresh();
    setRefresh((refresh) => !refresh);
  };

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
      } catch (error) {
        console.log("Failed to fetch goal progress:", error);
      }
    };
    fetchGoalProgress();
  }, [refresh]);

  return (
    <div className="card w-96 bg-base-100 shadow-xl transform transition hover:-translate-y-1">
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
          {isNaN((goalProgress.totalCompleted / goalProgress.totalAmount) * 100)
            ? "0"
            : ((goalProgress.totalCompleted / goalProgress.totalAmount) * 100)
                .toString()
                .slice(0, 5)}
          %
        </p>
        <p>
          <b>Date Created: </b>
          {goal.createdAt.slice(0, 10)}
        </p>

        <div className="py-5 flex flex-row justify-between">
          <AvatarGroup members={goal.contributors || []} />
          <CreateContributionModal
            key={goal._id}
            goalId={goal._id}
            onContributionAdd={handleRefresh}
          />
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
