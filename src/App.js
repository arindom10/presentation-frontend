// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PresentationRoom from "./pages/PresentationRoom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/presentation/:presentationId"
          element={<PresentationRoom />}
        />
      </Routes>
    </Router>
  );
}

export default App;
