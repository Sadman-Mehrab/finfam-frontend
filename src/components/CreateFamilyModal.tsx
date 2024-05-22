import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const CreateFamilyModal = ({ onFamilyAdd }: { onFamilyAdd: any }) => {
  const [name, setName] = useState("");

  const showModal = () => {
    // @ts-ignore
    document.getElementById("createFamilyModal").showModal();
  };

  const closeModal = () => {
    // @ts-ignore
    document.getElementById("createFamilyModal").close();
    setName("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/families",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      closeModal();
      onFamilyAdd();
      toast.success("Added!");
    } catch (error) {
      toast.error("Failure! Re-check the information");
      console.log(error);
    }
  };
  return (
    <div>
      <button
        className="btn btn-accent"
        // @ts-ignore
        onClick={showModal}
      >
        + New Family
      </button>
      <dialog id="createFamilyModal" className="modal">
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Create New Family</h3>
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
                <span className="label-text">Name</span>
              </div>
              <input
                type="text"
                name="name"
                id="name"
                className="input input-bordered"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
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

export default CreateFamilyModal;
