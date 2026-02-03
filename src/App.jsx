import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login.jsx";
import Department from "./pages/department.jsx";
// (Details page will be added next)

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Department List */}
        <Route path="/departments" element={<Department />} />

        {/* Department Details (next step) */}
        {/* <Route path="/departments/:id" element={<DepartmentDetails />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
