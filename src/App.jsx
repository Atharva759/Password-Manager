import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Manager from './pages/Manager';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer'

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <Manager /> : <Navigate to="/auth" />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
