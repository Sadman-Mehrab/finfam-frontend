import React, { useEffect, useState } from "react";
import axios from "axios";
import { FamilyCard, ProtectedRoute, UserNavbar } from "../../components";

const Dashboard = () => {
  const [families, setFamilies] = useState([]);

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
  }, []);

  return (
    <ProtectedRoute>
      <>
        <UserNavbar />
        <div className="p-10">
          <div>
            <h1 className="text-3xl">Families:</h1>
            <div className="py-10 flex flex-row space-x-10">
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
