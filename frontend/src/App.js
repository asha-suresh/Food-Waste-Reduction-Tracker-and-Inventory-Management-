import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import InventoryPage from "./pages/InventoryPage";
import CollectionsPage from "./pages/CollectionsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AddNewFooodPage from "./pages/AddNewFooodPage";
import DonationsPage from "./pages/DonationsPage";
import NotificationPage from "./pages/NotificationPage";
import AdminScreenLayout from "./pages/AdminScreenLayout";
import AdminDashboard from "./pages/AdminDashboard";
import UserProfilePage from "./pages/UserProfilePage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import CollectionHomePage from "./pages/CollectionHomePage";

const App = () => {
  
  const [activePath, setActivePath] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot" element={<ForgetPasswordPage />} />
    
        <Route path="/" element={<MainLayout activePath={activePath} />} >
            <Route index element={<DashboardPage setActivePath={setActivePath} />} />
            <Route path="/inventory" element={<InventoryPage setActivePath={setActivePath} />} />
            <Route path="/cart" element={<CollectionsPage setActivePath={setActivePath} />} />
            <Route path="/donations" element={<DonationsPage setActivePath={setActivePath} />} />
            <Route path="/add/food" element={<AddNewFooodPage setActivePath={setActivePath}/>} />
            <Route path="/notifications" element={<NotificationPage setActivePath={setActivePath}/>} />
            <Route path="/profile" element={<UserProfilePage setActivePath={setActivePath}/>} />
        </Route>

        <Route path="/admin" element={<AdminScreenLayout activePath={activePath} />} >
            <Route index element={<AdminDashboard setActivePath={setActivePath} /> } />
        </Route> 
        
        <Route path="/view/collection/:collectionid" element={<CollectionHomePage />} />
        <Route path="*" element={<p><h1>404!</h1></p>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
