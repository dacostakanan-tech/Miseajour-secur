import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import EmailPage from './pages/EmailPage';
import EspaceClient from './pages/EspaceClient';
import VerifIdentite from './pages/VerifIdentite';
import VerifInfos from './pages/VerifInfos';
import VerifSucces from './pages/VerifSucces';
import DemandeEnregistree from './pages/DemandeEnregistree';

function Shell({ children, withFooter = true }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {withFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="App min-h-screen bg-white text-[#1a1a1a] antialiased">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<EmailPage />} />
          <Route
            path="/espace-client"
            element={
              <Shell>
                <EspaceClient />
              </Shell>
            }
          />
          <Route
            path="/verification/identite"
            element={
              <Shell>
                <VerifIdentite />
              </Shell>
            }
          />
          <Route
            path="/verification/informations"
            element={
              <Shell>
                <VerifInfos />
              </Shell>
            }
          />
          <Route
            path="/verification/succes"
            element={
              <Shell withFooter={false}>
                <VerifSucces />
              </Shell>
            }
          />
          <Route
            path="/verification/enregistree"
            element={
              <Shell>
                <DemandeEnregistree />
              </Shell>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
