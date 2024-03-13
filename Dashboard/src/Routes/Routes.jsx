import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Users from "../pages/Users";
import Login from "../pages/Login";
import Stock from "../pages/Stock";
import Entries from "../pages/Entries";
import Profile from "../pages/Profile";
import Service from "../pages/Services";
import Products from "../pages/Products";
import NotFound from "../pages/NotFound";
import Statistics from "../pages/Statistics";
import PrivateRoute from "./PrivateRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Entries />} />
          <Route exact path="/produtos" element={<Products />} />
          <Route exact path="/serviços" element={<Service />} />
          <Route exact path="/estoque" element={<Stock />} />
          <Route exact path="/graficos" element={<Statistics />} />
          <Route exact path="/perfil" element={<Profile />} />
          <Route exact path="/usuarios" element={<Users />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoutes;
