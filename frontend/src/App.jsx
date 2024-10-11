import React from 'react'
import Home from './Componets/Home';
import AdminLogin from './Componets/AdminLogin';
import AdminSignIn from './Componets/AdminSignin';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Dashboard from './Componets/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signin" element={<AdminSignIn />} />
        <Route path="/admin/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
};

export default App