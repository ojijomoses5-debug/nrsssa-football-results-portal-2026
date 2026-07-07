import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import TournamentList from './pages/TournamentList';
import CSVUpload from './pages/CSVUpload';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>⚽ NRSSSA Football Results Portal</h1>
          <p>Tournament Management System 2026</p>
        </header>
        
        <nav className="nav">
          <ul>
            <li><Link to="/">🏠 Home</Link></li>
            <li><Link to="/tournaments">🏆 Tournaments</Link></li>
            <li><Link to="/upload">📤 Upload Fixtures</Link></li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tournaments" element={<TournamentList />} />
            <Route path="/upload" element={<CSVUpload />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2026 NRSSSA Football Results Portal. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home">
      <h2>Welcome to NRSSSA Football Results Portal</h2>
      <p>Manage tournaments, fixtures, and results with ease.</p>
      <div className="features">
        <div className="feature-card">
          <h3>🏆 Tournament Management</h3>
          <p>Create and manage mixed format tournaments with group and knockout stages</p>
        </div>
        <div className="feature-card">
          <h3>📤 Bulk Upload</h3>
          <p>Upload fixtures from CSV files to quickly populate your tournament</p>
        </div>
        <div className="feature-card">
          <h3>📊 Live Standings</h3>
          <p>Real-time standings and bracket updates as results are recorded</p>
        </div>
        <div className="feature-card">
          <h3>⚙️ Fixture Scheduling</h3>
          <p>Automatic fixture generation and round-robin scheduling</p>
        </div>
      </div>
      
      <div className="quick-actions">
        <Link to="/upload" className="action-button primary">
          📤 Upload Tournament Fixtures
        </Link>
        <Link to="/tournaments" className="action-button secondary">
          🏆 View All Tournaments
        </Link>
      </div>
    </div>
  );
}

export default App;
