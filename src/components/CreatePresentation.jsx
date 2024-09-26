import { useState } from "react";
import axios from "axios";

// CreatePresentation.jsx
const CreatePresentation = () => {
  const [title, setTitle] = useState("");

  const handleCreate = async () => {
    await axios.post("/presentations/create", { title });
  };

  return (
    <div className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Presentation Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2"
      />
      <button
        onClick={handleCreate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Presentation
      </button>
    </div>
  );
};
export default CreatePresentation;
