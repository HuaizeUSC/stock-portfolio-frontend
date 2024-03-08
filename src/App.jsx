import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Market from "./pages/Market";
import Trade from "./pages/Trade";
import Stock from "./pages/Stock";
import Favorite from "./pages/Favorite";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index path="dashboard" element={<Dashboard />} />
          <Route path="/market" element=<Navigate to="/market/1/12" /> />
          <Route path="market/:pageId/:itemNum" element={<Market />} />
          <Route path="/trade" element=<Navigate to="/trade/1/10" /> />
          <Route path="trade/:pageId/:itemNum" element={<Trade />} />
          <Route path="stock/:symbol" element={<Stock />} />
          <Route path="/favorite" element=<Navigate to="/favorite/1/12" /> />
          <Route path="favorite/:pageId/:itemNum" element={<Favorite />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
