import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import Suggestions from "./components/Suggestions";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const [dictionary, setDictionary] = useState([]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Load the dictionary file on mount
  useEffect(() => {
    const fetchDictionary = async () => {
      try {
        const response = await fetch("/dictionary.txt");
        const data = await response.text();
        setDictionary(data.split("\n").map((word) => word.trim()));
      } catch (error) {
        console.error("Error loading dictionary:", error);
      }
    };
    fetchDictionary();
  }, []);

  // Helper function to check if a character is a vowel
  const isVowel = (char) => "aeiou".includes(char.toLowerCase());

  // Dynamic programming function for alignment penalty
  const calculatePenalty = (word1, word2) => {
    const n = word1.length;
    const m = word2.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    for (let i = 0; i <= n; i++) dp[i][0] = i * 2;
    for (let j = 0; j <= m; j++) dp[0][j] = j * 2;

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        if (word1[i - 1] === word2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else if (
          (isVowel(word1[i - 1]) && isVowel(word2[j - 1])) ||
          (!isVowel(word1[i - 1]) && !isVowel(word2[j - 1]))
        ) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = dp[i - 1][j - 1] + 3;
        }
        dp[i][j] = Math.min(dp[i][j], dp[i - 1][j] + 2, dp[i][j - 1] + 2);
      }
    }
    return dp[n][m];
  };

  const findSuggestions = () => {
    if (!input.trim()) {
      alert("Please enter a word.");
      return;
    }
    const wordCosts = {};
    dictionary.forEach((word) => {
      wordCosts[word] = calculatePenalty(word, input);
    });
    const sorted = Object.entries(wordCosts)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 10)
      .map(([word]) => word);
    setSuggestions(sorted);
  };

  return (
    <div className="container">
      <Header />
      <Input input={input} setInput={setInput} findSuggestions={findSuggestions} />
      <Suggestions suggestions={suggestions} />
      <Footer /> 
    </div>
  );
};

export default App;
