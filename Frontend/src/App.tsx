import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { ToastProvider } from "./utils/ToastContext";
import { AuthProvider } from "./utils/AuthContext";
function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:level" element={<Game />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
