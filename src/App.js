import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./components/pages/login/LoginPage";
import RegisterPage from "./components/pages/register/RegisterPage";
import HomePage from "./components/pages/home/HomePage";
import ProductAddPage from "./components/pages/products/ProductAddPage";
import ProductsListPage from "./components/pages/products/ProductsListPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProtectedRoute() {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ from: window.location.pathname }}
        replace
      />
    );
  }
  return <Outlet />;
}

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/products/add" element={<ProductAddPage />} />
          <Route path="/products" element={<ProductsListPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
