import React, { useState } from "react";
import "./App.css";
import LearningEntryForm from "./LearningEntryForm";
import LearningEntryList from "./LearningEntryList";

function App() {
  const [reload, setReload] = useState(false);
  const [entryBeingEdited, setEntryBeingEdited] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleEntrySaved = () => {
    setReload(!reload);
    setEntryBeingEdited(null); // Clear form after update
  };

  const handleEditEntry = (entry) => {
    setEntryBeingEdited(entry);
  };

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <div className="bubbles-background">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * -20}s`,
              animationDuration: `${15 + Math.random() * 20}s`,
              width: `${100 + Math.random() * 100}px`,
              height: `${100 + Math.random() * 100}px`,
            }}
          />
        ))}
      </div>

      <h1>Katherine's Learning Tracker</h1>
      <button
        className="toggle-darkmode-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <LearningEntryForm
        onEntrySaved={handleEntrySaved}
        editingEntry={entryBeingEdited}
      />
      <LearningEntryList reload={reload} onEdit={handleEditEntry} />
    </div>
  );
}

export default App;
