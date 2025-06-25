import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
// later on he will explain about this line above

function Layout() {
  return (
    // we dont use div here because we don't need styling here. we just want to export these components

    <>
      <Header />
      <Outlet />
      {/* all the childern element in the main.jsx will be taken by outlet and rendered for us automatically whenever it is needed  */}
      <Footer />
    </>
  );
}

export default Layout;
