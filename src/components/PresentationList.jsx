import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const PresentationList = () => {
  const [presentations, setPresentations] = useState([]);

  useEffect(() => {
    // Fetch presentations from the server
    axios.get("/presentations").then((res) => setPresentations(res.data));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {presentations.map((presentation) => (
        <div key={presentation._id} className="p-4 border rounded">
          <img src={presentation.thumbnail} alt="Slide Thumbnail" />
          <h3 className="text-lg">{presentation.title}</h3>
        </div>
      ))}
    </div>
  );
};
export default PresentationList;
