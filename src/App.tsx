import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Dashboard } from "./views/Dashboard";
import { Login } from "./views/Login";
import { Toaster } from "react-hot-toast";
import { Register } from "./views/Register";
import { Family } from "./views/Family";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/families/:familyId" element={<Family />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
