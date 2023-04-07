import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AdminRouters from "./routes/AdminRouters";
import Bigrouters from "./routes/BigRouters";
import Sidebar from "./components/Sidebar/Navbar";
import Routers from "./routes/Routers";
import LayoutAdmin from "./components/Layout/LayoutAdmin";

function App() {
  return (
    // <div>
    //   <div>
    //     <LayoutAdmin />
    //   </div>
    //   <div>
    //     <Layout />
    //   </div>
    // </div>
    <Bigrouters/>
  )
}

export default App;
