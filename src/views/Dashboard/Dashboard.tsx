import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CreateFamilyModal,
  FamilyCard,
  ProtectedRoute,
  UserNavbar,
} from "../../components";

const Dashboard = () => {
  const [families, setFamilies] = useState([]);

  const [refreshFamilyList, setRefreshFamilyList] = useState(false);

  const handleRefreshFamilyList = () => {
    setRefreshFamilyList((refreshFamilyList) => !refreshFamilyList);
  };
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const fetchFamilies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/families", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFamilies(response.data);
      } catch (error) {
        console.error("Failed to fetch families:", error);
      }
    };
    fetchFamilies();
  }, [refreshFamilyList]);

  return (
    <ProtectedRoute>
      <>
        <UserNavbar />
        <div className="p-10">
          <div>
            <div className="flex flex-row justify-between">
              <h1 className="text-3xl">Families:</h1>
              <CreateFamilyModal onFamilyAdd={handleRefreshFamilyList} />
            </div>
            <div className="py-10 grid grid-cols-3 gap-10">
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
