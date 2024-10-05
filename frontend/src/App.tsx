import * as React from "react"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {Dashboard} from "./Pages/Dashboard/Dashboard";
import {NotFound} from "./Pages/Other/NotFound";
import { LoginPage } from "./Pages/Login/LoginPage";
import AdminPage from "./Pages/Admin/AdminPage";
import Home from "./Pages/Home/Home";
import Problems from "./Pages/Problems/Problems";
import Profile from "./Pages/Profile/Profile";
import Solving from "./Pages/Solving/Solving";

export const App = () => {
  return (
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Dashboard/>}>
            <Route path="/home" element={<Home />}/>
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/problems" element={<Problems/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/solving" element={<Solving/>}/>
          </Route>

          <Route path="*" element={<NotFound/>}/>
          <Route path="/login" element={<LoginPage/>}/>

        </Routes>
      </BrowserRouter>
)}
