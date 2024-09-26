// PresentationRoom.jsx
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const socket = io.connect("http://localhost:5000");

const PresentationRoom = () => {
  const { presentationId } = useParams();
  const [searchParams] = useSearchParams();
  const nickname = searchParams.get("nickname");

  const [presentation, setPresentation] = useState(null);
  const [slides, setSlides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    // Fetch the presentation data
    axios
      .get(`/api/presentations/${presentationId}`)
      .then((response) => {
        setPresentation(response.data);
        setSlides(response.data.slides);
      })
      .catch((error) => console.error(error));

    // Join the WebSocket room
    socket.emit("join_presentation", { presentationId, nickname });

    // Listen for real-time updates
    socket.on("draw", (data) => {
      setSlides((prevSlides) => {
        const updatedSlides = [...prevSlides];
        updatedSlides[data.slideIndex] = data.slide;
        return updatedSlides;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [presentationId, nickname]);

  const handleDraw = (newSlideData) => {
    socket.emit("draw", {
      presentationId,
      slideIndex: currentSlideIndex,
      slide: newSlideData,
    });
  };

  const addTextBlock = () => {
    const newSlide = { ...slides[currentSlideIndex] };
    newSlide.elements.push({
      type: "text",
      content: "Editable text",
      x: 100,
      y: 100,
    });
    setSlides((prevSlides) => {
      const updatedSlides = [...prevSlides];
      updatedSlides[currentSlideIndex] = newSlide;
      return updatedSlides;
    });
    handleDraw(newSlide);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-200 p-4">
        <h2 className="text-xl font-bold">Slides</h2>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`p-2 mt-2 cursor-pointer rounded ${
              index === currentSlideIndex
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
            onClick={() => setCurrentSlideIndex(index)}
          >
            Slide {index + 1}
          </div>
        ))}
      </div>

      <div className="flex-grow bg-white flex flex-col items-center justify-center relative">
        <div className="border-2 border-gray-300 w-3/4 h-3/4 relative">
          {/* Display slide elements */}
          {slides[currentSlideIndex]?.elements?.map((element, index) => (
            <div
              key={index}
              className="absolute"
              style={{ top: element.y, left: element.x }}
            >
              {element.type === "text" && (
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newSlide = { ...slides[currentSlideIndex] };
                    newSlide.elements[index].content = e.target.innerText;
                    setSlides((prevSlides) => {
                      const updatedSlides = [...prevSlides];
                      updatedSlides[currentSlideIndex] = newSlide;
                      return updatedSlides;
                    });
                    handleDraw(newSlide);
                  }}
                >
                  {element.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/5 bg-gray-200 p-4">
        <h2 className="text-xl font-bold">Users</h2>
        <button
          className="mt-4 p-2 bg-green-500 text-white rounded"
          onClick={addTextBlock}
        >
          Add Text Block
        </button>
      </div>
    </div>
  );
};

export default PresentationRoom;
