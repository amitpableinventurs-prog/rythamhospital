import React, { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import TopBar from './components/TopBar/TopBar'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ScrollToTop from './utils/ScrollToTop'
import Loader from './components/Loader/Loader'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
// The homepage is the main landing page, so it ships in the main bundle for a faster first paint.
import Home from './pages/Home/Home'

const About = lazy(() => import('./pages/About/About'))
const Doctors = lazy(() => import('./pages/Doctors/Doctors'))
const Departments = lazy(() => import('./pages/Departments/Departments'))
const GalleryPage = lazy(() => import('./pages/Gallery/Gallery'))
const Blogs = lazy(() => import('./pages/Blogs/Blogs'))
const BlogDetail = lazy(() => import('./pages/BlogDetail/BlogDetail'))
const Contact = lazy(() => import('./pages/Contact/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy/PrivacyPolicy'))
const Terms = lazy(() => import('./pages/Terms/Terms'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))
const AdminApp = lazy(() => import('./admin/AdminApp'))

function App() {
  const { pathname } = useLocation()

  // The admin panel has its own layout and never shows the public header/footer.
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return (
      <ErrorBoundary resetKey={pathname}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/admin/*" element={<AdminApp />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    )
  }

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <ScrollToTop />
      <TopBar />
      <Navbar />
      <main id="main-content">
        <ErrorBoundary resetKey={pathname}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  )
}

export default App
