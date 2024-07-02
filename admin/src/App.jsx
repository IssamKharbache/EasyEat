import NavBar from "./components/navbar/NavBar";
import SideBar from "./components/sidebar/SideBar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/add/Add";
import List from "./pages/list/List";
import Orders from "./pages/orders/Orders";
import { Toaster } from "sonner";
import Dashboard from "./pages/dashboard/Dashboard";

const App = () => {
  //base url
  const url = "https://easyeat.onrender.com";
  return (
    <div>
      <Toaster richColors />
      <NavBar />
      <hr />
      <div className="app-content">
        <SideBar />
        <Routes>
          <Route path="/" element={<Dashboard baseUrl={url} />} />
          <Route path="/add" element={<Add baseUrl={url} />} />
          <Route path="/list" element={<List baseUrl={url} />} />
          <Route path="/orders" element={<Orders baseUrl={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;