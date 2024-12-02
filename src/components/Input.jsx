import React from "react";

const Input = ({ input, setInput, findSuggestions }) => (
  <div className="input-container">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type a word..."
    />
    <button onClick={findSuggestions}>Find Suggestions</button>
  </div>
);

export default Input;
