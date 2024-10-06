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

  const [evaluationResult, setEvaluationResult] = useState(null); // Store the evaluation result
  const [errorMessage, setErrorMessage] = useState(''); // Store any error messages

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

  // Function to submit code to the backend for evaluation
  const submitCodeForEvaluation = async (language: string, problemDescription: string, userCode: string) => {
    try {
      const response = await fetch('http://localhost:5000/evaluate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          problemDescription,
          userCode,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setEvaluationResult(data);  // Save the evaluation result in state
      setErrorMessage('');  // Clear any previous error messages
    } catch (error) {
      console.error('Error evaluating code:', error);
      setErrorMessage('There was an error evaluating your code. Please try again.');
    }
  };

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/problems" element={<Problems submitCode={submitCodeForEvaluation} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/solving" element={<Solving submitCode={submitCodeForEvaluation} />} />
            <Route path="/results" element={<Results evaluation={evaluationResult} />} />
            <Route path="/random" element={<Random />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>

        {evaluationResult && (
          <div>
            <h3>Evaluation Results</h3>
            <pre>{JSON.stringify(evaluationResult, null, 2)}</pre>
          </div>
        )}

        {errorMessage && (
          <div style={{ color: 'red' }}>
            <p>{errorMessage}</p>
          </div>
        )}
      </BrowserRouter>
    </UserContext.Provider>
  );
};