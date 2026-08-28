import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import ProductDetailOverlay from "./components/ProductDetailOverlay";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import PlaceholderPage from "./pages/PlaceholderPage";
import { CartProvider } from "./context/CartContext";
import { ProductOverlayProvider } from "./context/ProductOverlayContext";

export default function App() {
  return (
    <CartProvider>
      <ProductOverlayProvider>
        <BrowserRouter>
          <div className="app-shell">
            <TopNav />
            <div className="page-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/orders" element={<Orders />} />
                <Route
                  path="/about"
                  element={<PlaceholderPage title="About Us" />}
                />
                <Route
                  path="/profile"
                  element={<PlaceholderPage title="Profile" />}
                />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </div>
            <BottomNav />
          </div>
          <ProductDetailOverlay />
        </BrowserRouter>
      </ProductOverlayProvider>
    </CartProvider>
  );
}
