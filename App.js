import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestionList from "./components/QuestionList";
import AskQuestion from "./components/AskQuestion";
import ViewQuestion from "./components/ViewQuestion";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuestionList />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/login" element={<Login />} />
        <Route path="/question/:id" element={<ViewQuestion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
