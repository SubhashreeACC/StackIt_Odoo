// src/components/QuestionList.jsx
import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    API.get("/questions").then((res) => setQuestions(res.data));
  }, []);

  return (
    <div>
      <h2>All Questions</h2>
      {questions.map((q) => (
        <div key={q._id}>
          <Link to={`/question/${q._id}`}>
            <h3>{q.title}</h3>
          </Link>
          <p>{q.tags.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}