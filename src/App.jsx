import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InfoModal from './components/InfoModal';
import QuickToast from './components/QuickToast';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import CategoriesPage from './pages/CategoriesPage';
import SearchPage from './pages/SearchPage';
import LeaderboardPage from './pages/LeaderboardPage';
import PremiumPage from './pages/PremiumPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <div className="app-content-body">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/game/:id" element={<GamePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/category/:categoryId" element={<CategoriesPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/premium" element={<PremiumPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
          <InfoModal />
          <QuickToast />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
