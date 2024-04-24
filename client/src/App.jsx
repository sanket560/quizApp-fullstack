import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Logout from "./pages/Logout";
import AddQuizz from './pages/add-quizz/AddQuizz';
import StartQuiz from "./pages/home/startQuiz/StartQuiz";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/add-quiz" element={<AddQuizz />} />
          <Route path="/start-quiz/:quiz_id" element={<StartQuiz />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
