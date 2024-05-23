import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { config } from "../config/config";

const AddMemberModal = ({
  familyId,
  onMemberAdd,
}: {
  familyId: string;
  onMemberAdd: any;
}) => {
  const [memberUserName, setMemberUserName] = useState("");

  const showModal = () => {
    // @ts-ignore
    document.getElementById("addMemberModal").showModal();
  };

  const closeModal = () => {
    // @ts-ignore
    document.getElementById("addMemberModal").close();
    setMemberUserName("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.patch(
        `${config.BACKEND_URL}/api/families/join/${familyId}`,
        { memberUserName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      closeModal();
      onMemberAdd();
      toast.success("Added!");
    } catch (error) {
      toast.error("Failure! Make sure that the user exists");
      console.error(error);
    }
  };
  return (
    <div>
      <button
        className="btn btn-accent"
        // @ts-ignore
        onClick={showModal}
      >
        New Member
      </button>
      <dialog id="addMemberModal" className="modal">
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Add New Member</h3>
            <button className="text-red-400" onClick={closeModal}>
              Close
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-box p-6 max-w-md "
          >
            <label className="form-control">
              <div className="label">
                <span className="label-text">Username</span>
              </div>
              <input
                type="text"
                name="memberUserName"
                id="memberUserName"
                className="input input-bordered"
                value={memberUserName}
                required
                onChange={(e) => setMemberUserName(e.target.value)}
              />
            </label>

            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddMemberModal;
