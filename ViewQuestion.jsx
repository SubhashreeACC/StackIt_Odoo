// src/components/ViewQuestion.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function ViewQuestion() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    API.get(`/questions/${id}`).then((res) => setQuestion(res.data));
  }, [id]);

  if (!question) return <p>Loading...</p>;

  return (
    <div>
      <h2>{question.title}</h2>
      <p>{question.body}</p>
      <p>Tags: {question.tags.join(", ")}</p>
    </div>
  );
}