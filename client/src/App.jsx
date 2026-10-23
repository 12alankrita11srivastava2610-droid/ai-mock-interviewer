
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Interview from "./pages/Interview";
import Dashboard from "./pages/Dashboard";
import VoiceInterview from "./pages/VoiceInterview";
import Feedback from "./pages/Feedback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/interview" element={<Interview />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
  path="/voice-interview"
  element={<VoiceInterview />}
/>
<Route
  path="/feedback"
  element={<Feedback />}
/>
import Dashboard from "./pages/Dashboard";

<Route
  path="/dashboard"
  element={<Dashboard />}
/>
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;