import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Ensure correct path and casing
import Layout from "./components/Layout/Layout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import CalculateForm from "./pages/calculateForm/CalculateForm";

import SignIn from "./pages/sign_in/SingIn";
import Items from "./pages/items/Items";
import Brand from "./pages/brand/Brand";
import SignUp from "./pages/signUp/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import Cart from "./pages/cart/Cart";
import Orders from "./pages/cart/Orders";
import NotFound from "./utils/NotFound";

function App() {
  return (
    <AuthProvider>
      
        <CartProvider>
          <OrderProvider>
            <Router>
              <Routes>
                {/* Auth routes outside of layout */}
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />

                {/* Protected routes with layout */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/calculate" element={<CalculateForm />} />
                  <Route path="/orders" element={<Orders/>} />
                  <Route
                    path="/items"
                    element={
                      <ProtectedRoute requiredRole={["ADMIN", "MANAGER","EMPLOYEE"]}>
                        <Items />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/brand"
                    element={
                      <ProtectedRoute requiredRole={["ADMIN", "MANAGER","EMPLOYEE"]}>
                        <Brand />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/cart" element={<Cart />} />
                </Route>

                {/* 404 Not Found route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </OrderProvider>
        </CartProvider>
    </AuthProvider>
  );
}

export default App;
