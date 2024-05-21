import React, { useEffect, useState } from "react";
import axios from "axios";
import { CreateGoalModal, ProtectedRoute, UserNavbar } from "../../components";
import { useParams } from "react-router-dom";
import GoalCard from "../../components/GoalCard";

const Family = () => {
  const { familyId } = useParams();
  const [goals, setGoals] = useState([]);

  const [refreshGoalList, setRefreshGoalList] = useState(false);

  const handleRefreshGoalList = () => {
    setRefreshGoalList((refreshGoalList) => !refreshGoalList);
  };
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const fetchGoals = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/goals/family/${familyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGoals(response.data);
      } catch (error) {
        console.log("Failed to fetch goals:", error);
      }
    };
    fetchGoals();
  }, [refreshGoalList]);

  return (
    <ProtectedRoute>
      <>
        <UserNavbar />
        <div className="p-10">
          <div>
            <div className="flex flex-row justify-between">
              <h1 className="text-3xl">Goals:</h1>
              <CreateGoalModal
                familyId={familyId || ""}
                onGoalAdd={handleRefreshGoalList}
              />
            </div>
            <div className="py-10 grid grid-cols-3 gap-10">
              {goals.map((goal, index) => (
                <GoalCard key={index} goal={goal} />
              ))}
            </div>
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
};

export default Family;
