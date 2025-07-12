// src/components/AskQuestion.jsx
import { useState } from "react";
import API from "../api";

export default function AskQuestion() {
  const [question, setQuestion] = useState({ title: "", body: "", tags: "" });

  const handleChange = (e) =>
    setQuestion({ ...question, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/questions", question);
      alert("Question posted!");
    } catch (err) {
      alert("Error posting question");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ask a Question</h2>
      <input name="title" onChange={handleChange} placeholder="Title" />
      <textarea name="body" onChange={handleChange} placeholder="Describe your question" />
      <input name="tags" onChange={handleChange} placeholder="Comma-separated tags" />
      <button type="submit">Post</button>
    </form>
  );
}