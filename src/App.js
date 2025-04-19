import React from "react";
import "./App.css";
import LearningEntryForm from "./LearningEntryForm";
import LearningEntryList from "./LearningEntryList";

function App() {
  return (
    <div className="App">
      {/* Floating Bubble Background */}
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

      {/* Main UI */}
      <h1>Katherine's Learning Tracker</h1>
      <LearningEntryForm />
      <LearningEntryList />
    </div>
  );
}

export default App;
