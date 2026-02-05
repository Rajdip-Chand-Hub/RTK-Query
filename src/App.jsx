import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login.jsx";
import Department from "./pages/department.jsx";
import ProtectedRoute from "./protectedRoutes.jsx";
import DepartmentDetails from "./pages/departmentDetails.jsx";
import CreateForm from "./components/createForm.jsx"
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
        <Route path="/departments" element={<ProtectedRoute><Department/></ProtectedRoute>} />

        {/* Department Details (next step) */}
        <Route path="/departments/:id" element={<DepartmentDetails />}/>

        <Route path="/create-form" element={<CreateForm/>} />

      </Routes>
    </Router>
  );
}

export default App;
