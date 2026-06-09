import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SessionExpired from "./pages/SessionExpired";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/session-expired"
          element={<SessionExpired />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;