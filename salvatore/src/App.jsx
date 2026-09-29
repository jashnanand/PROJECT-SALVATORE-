import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CheckIn from "./pages/CheckIn";
import Results from "./pages/Results";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import Support from "./pages/Support";
import Breathe from "./pages/Breathe";
import CounsellorDashboard from "./pages/CounsellorDashboard";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import CounsellorProfile from "./pages/CounsellorProfile";
import Messages from "./pages/Messages";
import DistrictDashboard from "./pages/DistrictDashboard";
import DistrictProfile from "./pages/DistrictProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/results" element={<Results />} />
        <Route path="/history" element={<History />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/support" element={<Support />} />
        <Route path="/breathe" element={<Breathe />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-profile" element={<StudentProfile />} />

<Route path="/counsellor-profile" element={<CounsellorProfile />} />
<Route path="/messages" element={<Messages />} />

<Route
  path="/district-profile"
  element={<DistrictProfile />}
/>


<Route
  path="/district-dashboard"
  element={<DistrictDashboard />}
/>

        <Route
          path="/student-dashboard"
          element={<StudentDashboard />}
        />

        <Route
  path="/counsellor-dashboard"
  element={<CounsellorDashboard />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;