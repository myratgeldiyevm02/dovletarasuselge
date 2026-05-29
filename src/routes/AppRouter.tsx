import { createBrowserRouter } from "react-router-dom"
import { lazy, Suspense } from "react"
import MainLayout from "../layout/MainLayout"

const Home = lazy(() => import("../pages/Home"))
const About = lazy(() => import("../pages/About"))
const Contact = lazy(() => import("../pages/Contact"))
const Services = lazy(() => import("../pages/Services"))
const NotFound = lazy(() => import("../pages/NotFound"))

const children = [
  { index: true, element: <Home /> },
  { path: "about", element: <About /> },
  { path: "contact", element: <Contact /> },
  { path: "services", element: <Services /> },
]

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<div className="min-h-screen bg-[#0a0f1e]" />}>
    {element}
  </Suspense>
)

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(<MainLayout />),
    children,
  },
  {
    path: "/:lang",
    element: withSuspense(<MainLayout />),
    children,
  },
  {
    path: "*",
    element: withSuspense(<NotFound />),
  },
])