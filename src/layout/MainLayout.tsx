import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ScrollToTop from "../components/ScrollToTop"

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout