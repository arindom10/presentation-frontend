// Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [presentations, setPresentations] = useState([]);
  const [newPresentationTitle, setNewPresentationTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all presentations
    axios
      .get("/api/presentations")
      .then((response) => {
        setPresentations(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleCreatePresentation = () => {
    if (newPresentationTitle.trim() && nickname.trim()) {
      axios
        .post("/api/presentations/create", { title: newPresentationTitle })
        .then((response) => {
          const presentation = response.data;
          navigate(`/presentation/${presentation._id}?nickname=${nickname}`);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleJoinPresentation = (presentationId) => {
    if (nickname.trim()) {
      navigate(`/presentation/${presentationId}?nickname=${nickname}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Collaborative Presentations</h1>

      <input
        type="text"
        placeholder="Enter your nickname"
        className="mb-4 p-2 border border-gray-300 rounded"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <div className="mb-6">
        <input
          type="text"
          placeholder="New Presentation Title"
          className="p-2 border border-gray-300 rounded"
          value={newPresentationTitle}
          onChange={(e) => setNewPresentationTitle(e.target.value)}
        />
        <button
          className="ml-4 p-2 bg-blue-500 text-white rounded"
          onClick={handleCreatePresentation}
        >
          Create Presentation
        </button>
      </div>

      <div className="w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          Join an Existing Presentation
        </h2>
        {presentations.map((presentation) => (
          <div key={presentation._id} className="mb-2">
            <button
              className="w-full p-2 bg-gray-200 hover:bg-gray-300 rounded"
              onClick={() => handleJoinPresentation(presentation._id)}
            >
              {presentation.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
