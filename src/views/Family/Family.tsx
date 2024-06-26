import { useEffect, useState } from "react";
import axios from "axios";
import {
  AddMemberModal,
  AvatarGroup,
  CreateGoalModal,
  ProtectedRoute,
  UserNavbar,
  GoalCard,
} from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../config/config";
import toast from "react-hot-toast";

const Family = () => {
  const navigate = useNavigate();

  const { familyId } = useParams();
  const [family, setFamily] = useState({});
  const [goals, setGoals] = useState([]);

  const [refresh, setRefresh] = useState(false);
  const [goalRefresh, setGoalRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((refresh) => !refresh);
  };

  const handleGoalRefresh = () => {
    setGoalRefresh((goalRefresh) => !goalRefresh);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`${config.BACKEND_URL}/api/families/${familyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Deleted!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("You do not have permission to delete this family!");
      console.log(error);
    }
  };

  const handleLeave = async () => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.patch(
        `${config.BACKEND_URL}/api/families/leave/${familyId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Left family!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const fetchGoals = async () => {
      try {
        const [goalResponse, familyResponse] = await axios.all([
          axios.get(`${config.BACKEND_URL}/api/goals/family/${familyId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`${config.BACKEND_URL}/api/families/${familyId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        setGoals(goalResponse.data);
        setFamily(familyResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGoals();
  }, [refresh, goalRefresh]);

  return (
    <ProtectedRoute>
      <>
        <UserNavbar />
        <div className="p-10">
          <div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col space-y-5">
                {/* @ts-ignore */}
                <AvatarGroup members={family.members || []} />
                <h1 className="text-3xl">
                  {/* @ts-ignore */}
                  {family.name || "Family"}'s Goals:
                </h1>
              </div>
              <div className="flex flex-row space-x-2">
                <CreateGoalModal
                  familyId={familyId || ""}
                  onGoalAdd={handleRefresh}
                />
                <AddMemberModal
                  familyId={familyId || ""}
                  onMemberAdd={handleRefresh}
                />

                <button
                  className="btn bg-secondary"
                  // @ts-ignore
                  onClick={handleDelete}
                >
                  Delete Family
                </button>
                <button
                  className="btn bg-secondary"
                  // @ts-ignore
                  onClick={handleLeave}
                >
                  Leave Family
                </button>
              </div>
            </div>
            <div className="py-10 grid sm:grid-cols-3 grid-cols-1 gap-10">
              {goals.map((goal, index) => (
                <GoalCard
                  // @ts-ignore
                  key={goal._id}
                  goal={goal}
                  handleGoalRefresh={handleGoalRefresh}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
};

export default Family;
