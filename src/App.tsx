// App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import HttpsRedirect from 'react-https-redirect';
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <HttpsRedirect>
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      

      

      
    </Routes>
    </HttpsRedirect>
  );
};

export default App;
