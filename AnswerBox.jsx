// src/components/AnswerBox.jsx
import { useState } from "react";
import API from "../api";

export default function AnswerBox({ questionId, onAnswerPosted }) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/answers/${questionId}`, { answer });
      setAnswer("");
      alert("Answer posted successfully!");
      if (onAnswerPosted) onAnswerPosted(); 
    } catch (err) {
      alert("Failed to post answer. Are you logged in?");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Your Answer</h3>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer here..."
        rows={5}
        required
      ></textarea>
      <button type="submit">Post Answer</button>
    </form>
  );
}