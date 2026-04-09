// File: src/App.js
import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Loader from './components/Loader';
import { GlobalStyle } from './styles/globalStyles'; // Global styles using styled-components

// Lazy-loaded components
const HomePage = React.lazy(() => import('./components/HomePage'));
const AboutMe = React.lazy(() => import('./components/AboutMe'));
const ProjectPage = React.lazy(() => import('./components/ProjectPage'));
const ContactPage = React.lazy(() => import('./components/ContactPage'));

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = { duration: 0.5, ease: 'easeInOut' };

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.key}>
        <Route
          path="/"
          element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <HomePage />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <AboutMe />
            </motion.div>
          }
        />
        <Route
          path="/projects"
          element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <ProjectPage />
            </motion.div>
          }
        />
        <Route
          path="/contact"
          element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <ContactPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500); // Simulate 1-second load
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      <GlobalStyle /> {/* Apply global styles */}
      <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Suspense fallback={<Loader />}>
          <AnimatedRoutes />
        </Suspense>
        <footer style={{
          textAlign: 'center',
          padding: '20px',
          marginTop: 'auto',
          backgroundColor: '#000',
          color: '#fff',
          fontSize: '14px'
        }}>
          © 2024–{new Date().getFullYear()} Edwin Polanco. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;