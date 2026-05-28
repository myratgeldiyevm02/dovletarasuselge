import { createBrowserRouter } from "react-router-dom"
import { lazy, Suspense } from "react"
import MainLayout from "../layout/MainLayout"

const Home = lazy(() => import("../pages/Home"))
const About = lazy(() => import("../pages/About"))
const Contact = lazy(() => import("../pages/Contact"))
const Services = lazy(() => import("../pages/Services"))
const NotFound = lazy(() => import("../pages/NotFound"))

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-[#0a0f1e]" />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "services", element: <Services /> },
      { path: "*", element: <NotFound /> },
    ],
  },
])