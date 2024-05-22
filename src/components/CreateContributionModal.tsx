import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const CreateContributionModal = ({
  onContributionAdd,
  goalId,
}: {
  onContributionAdd: any;
  goalId: string;
}) => {
  const [amount, setAmount] = useState(0);

  const modalId = `createContributionModal-${goalId}`;

  const showModal = () => {
    // @ts-ignore
    document.getElementById(modalId).showModal();
  };

  const closeModal = () => {
    // @ts-ignore
    document.getElementById(modalId).close();
    setAmount(0);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/contributions",
        { amount, goalId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      closeModal();
      onContributionAdd();
      toast.success("Added!");
    } catch (error) {
      toast.error("Contribution amount exceeds total amount");
      console.log(error);
    }
  };
  return (
    <div>
      <button
        className="btn btn-primary "
        // @ts-ignore
        onClick={showModal}
      >
        Contribute
      </button>
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Contribute To Goal</h3>
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
                <span className="label-text">Amount</span>
              </div>
              <input
                type="number"
                name="amount"
                id="amount"
                className="input input-bordered"
                value={amount}
                required
                onChange={(e) => setAmount(+(e.target.value))}
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

export default CreateContributionModal;