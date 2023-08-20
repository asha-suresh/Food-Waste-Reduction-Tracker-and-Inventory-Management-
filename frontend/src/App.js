import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import InventoryPage from "./pages/InventoryPage";
import CollectionsPage from "./pages/CollectionsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AddNewFooodPage from "./pages/AddNewFooodPage";
import DonationsPage from "./pages/DonationsPage";
import Notifications from "./pages/Notifications";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);
  const [activePath, setActivePath] = useState("");
  const test = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/" element={<MainLayout activePath={activePath} isLoggedIn={false} />} >
            <Route index element={<DashboardPage setActivePath={setActivePath} />} />
            <Route path="/inventory" element={<InventoryPage setActivePath={setActivePath} />} />
            <Route path="/cart" element={<CollectionsPage setActivePath={setActivePath} />} />
            <Route path="/donations" element={<DonationsPage setActivePath={setActivePath} />} />
            <Route path="/add/food" element={<AddNewFooodPage setActivePath={setActivePath}/>} />
            <Route path="/notifications" element={<Notifications setActivePath={setActivePath}/>} />
        </Route>
        
        <Route path="*" element={<p>404!</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
