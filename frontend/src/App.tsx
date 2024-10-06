import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { NotFound } from "./Pages/Other/NotFound";
import { LoginPage } from "./Pages/Login/LoginPage";
import AdminPage from "./Pages/Admin/AdminPage";
import Home from "./Pages/Home/Home";
import Problems from "./Pages/Problems/Problems";
import Profile from "./Pages/Profile/Profile";
import Solving from "./Pages/Solving/Solving";
import Results from "./Pages/Solving/Results";
import Random from "./Pages/Random/Random";
import { auth } from "./Utils/firebase";
import { UserContext } from "./Utils/UserContext";
import { onAuthStateChanged } from "firebase/auth";

export const App = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/solving" element={<Solving />} />
            <Route path="/results" element={<Results />} />
            <Route path="/random" element={<Random />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};
