// SlideView.jsx
import { useEffect, useState } from "react";
import socket from "../socket";
import Toolbar from "./Toolbar";

const SlideView = ({ presentationId }) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    socket.emit("join_presentation", { presentationId, nickname: "user" });

    socket.on("draw", (newElement) => {
      setElements((prev) => [...prev, newElement]);
    });

    socket.on("update_text", (updatedText) => {
      // Handle text update
    });

    return () => {
      socket.off("draw");
      socket.off("update_text");
    };
  }, [presentationId]);

  const handleDraw = (element) => {
    socket.emit("draw", { presentationId, element });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full h-full border" id="canvas">
        {elements.map((el, index) => (
          <div
            key={index}
            style={{ left: el.x, top: el.y }}
            className="absolute"
          >
            {el.type === "text" ? <span>{el.content}</span> : null}
            {/* Handle other elements like shapes */}
          </div>
        ))}
      </div>
      <Toolbar onDraw={handleDraw} />
    </div>
  );
};
export default SlideView;
