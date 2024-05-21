import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CreateGoalModal = ({
  onGoalAdd,
  familyId,
}: {
  onGoalAdd: any;
  familyId: string;
}) => {
  const [name, setName] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const showModal = () => {
    // @ts-ignore
    document.getElementById("createGoalModal").showModal();
  };

  const closeModal = () => {
    // @ts-ignore
    document.getElementById("createGoalModal").close();
    setName("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/goals",
        { name, totalAmount, familyId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      closeModal();
      onGoalAdd();
      toast.success("Added!");
    } catch (error) {
      toast.error("Failure! Re-check the information");
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
        + New
      </button>
      <dialog id="createGoalModal" className="modal">
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Create New Goal</h3>
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
            <label className="form-control">
              <div className="label">
                <span className="label-text">Total Amount</span>
              </div>
              <input
                type="number"
                name="totalAmount"
                id="totalAmount"
                className="input input-bordered"
                value={totalAmount}
                required
                onChange={(e) => setTotalAmount(+(e.target.value))}
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

export default CreateGoalModal;
