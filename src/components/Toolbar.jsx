import { useState } from "react";

// Toolbar.jsx
const Toolbar = ({ onDraw }) => {
  const [selectedTool, setSelectedTool] = useState("text");

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
  };

  const handleDraw = (event) => {
    const element = {
      type: selectedTool,
      x: event.clientX,
      y: event.clientY,
      content: "Sample text",
    };
    onDraw(element);
  };

  return (
    <div className="flex space-x-4 p-2 bg-gray-100">
      <button onClick={() => handleToolClick("text")}>Text</button>
      <button onClick={() => handleToolClick("rectangle")}>Rectangle</button>
      <button onClick={() => handleToolClick("circle")}>Circle</button>
    </div>
  );
};
export default Toolbar;
