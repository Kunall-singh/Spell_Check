import React from "react";

const Suggestions = ({ suggestions }) => (
  <div className="suggestions-container">
    <h2>Suggestions</h2>
    <ul>
      {suggestions.map((word, index) => (
        <li key={index}>{word}</li>
      ))}
    </ul>
  </div>
);

export default Suggestions;
