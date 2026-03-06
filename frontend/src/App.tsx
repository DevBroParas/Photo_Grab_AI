import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login.tsx";
import Register from "./features/auth/Register.tsx";
import Dashboard from "./features/dashboard/Dashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoutes.tsx";
import PublicRoute from "./components/PublicRoutes.tsx";
import GlobalLoader from "./components/ui/GlobalLoader.tsx";
import { useAuth } from "./features/auth/context/AuthContext.tsx";
import MainLayout from "./components/layout/MainLayout.tsx";
import PublicLayout from "./components/layout/PublicLayout.tsx";
import LandingPage from "./features/landingPage/LandingPage.tsx";
import UploadPage from "./features/upload/UploadPage.tsx";


function App() {
  const { loading } = useAuth();


  if (loading) {
    return <GlobalLoader />;
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />} >
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadPage />} />
          </Route>
        </Route>



      </Routes>
    </BrowserRouter>
  );
}

export default App;