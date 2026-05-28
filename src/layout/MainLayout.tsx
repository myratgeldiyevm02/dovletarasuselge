import { Outlet, useParams } from "react-router-dom"
import { useEffect } from "react"
import i18n from "../i18n"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ScrollToTop from "../components/ScrollToTop"
import StructuredData from "../components/StructuredData"

const SUPPORTED_LANGUAGES = ["en", "ru", "zh", "tk"]

const MainLayout = () => {
  const { lang } = useParams()

  useEffect(() => {
    if (lang && SUPPORTED_LANGUAGES.includes(lang)) {
      i18n.changeLanguage(lang)
    } else {
      i18n.changeLanguage("en")
    }
  }, [lang])

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <StructuredData />
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout