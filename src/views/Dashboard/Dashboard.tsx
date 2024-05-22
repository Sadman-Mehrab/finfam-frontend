import  { useEffect, useState } from "react";
import axios from "axios";
import {
  CreateFamilyModal,
  FamilyCard,
  ProtectedRoute,
  UserNavbar,
} from "../../components";
import { config } from "../../config/config";

const Dashboard = () => {
  const userName = localStorage.getItem("userName");
  const [families, setFamilies] = useState([]);
  

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((refresh) => !refresh);
  };
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const fetchFamilies = async () => {
      try {
        const response = await axios.get(`${config.BACKEND_URL}/api/families`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFamilies(response.data);
      } catch (error) {
        console.log("Failed to fetch information:"+ error);
      }
    };
    fetchFamilies();
  }, [refresh]);

  return (
    <ProtectedRoute>
      <>
        <UserNavbar />
        <div className="p-10">
          <div>
            <div className="flex flex-row justify-between">
              <h1 className="text-3xl">{userName}'s Families:</h1>
              <CreateFamilyModal onFamilyAdd={handleRefresh} />
            </div>
            <div className="py-10 grid sm:grid-cols-3 grid-cols-1 gap-10">
              {families.map((family, index) => (
                <FamilyCard key={index} family={family} />
              ))}
            </div>
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
};

export default Dashboard;
