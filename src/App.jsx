import React from 'react';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

// Import your local images from the assets folder
import userInterfaceP1 from './assets/Prototype1_01.jpg';
import userInterfaceP2 from './assets/Prototype1_02.jpg';
import conductorInterfaceP1 from './assets/Prototype2_01.jpg';
import conductorInterfaceP2 from './assets/Prototype2_02.jpg';

// Helper component for individual image cards, now with the title included again
const ImageCard = ({ imageUrl, title, linkUrl }) => {
  return (
    <a href={linkUrl} className="image-card" target="_blank" rel="noopener noreferrer">
      <div className="image-wrapper">
        <img
          src={imageUrl}
          alt={title}
          className="card-image"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/424242?text=Image+Not+Found'; }}
        />
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
      </div>
    </a>
  );
};

// Main App component
export default function App() {
  // Data is now structured into groups, with titles restored to each image
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState(null);

  const closeAuthModal = () => setAuthModal(null);

  const handleLogout = async () => {
    // Call your backend logout route to clear the cookie
    await fetch('http://localhost:3000/auth/logout', { method: 'POST', credentials: 'include' });
    setUser(null);
  };

  const imageGroups = [
    {
      title: 'Prototype1',
      images: [
        { id: 1, title: 'User Interface', imageUrl: userInterfaceP1, linkUrl: 'https://sih-2026proto1user.vercel.app/' },
        { id: 2, title: 'Conductor Interface', imageUrl: userInterfaceP2, linkUrl: 'https://sih-2026proto1server.vercel.app/' },
      ]
    },
    {
      title: 'Prototype2',
      images: [
        { id: 3, title: 'User Interface', imageUrl: conductorInterfaceP1, linkUrl: 'https://bus-tracking-system-gules.vercel.app/' },
        { id: 4, title: 'Conductor Interface', imageUrl: conductorInterfaceP2, linkUrl: 'https://bus-tracking-system-proto2-simulato.vercel.app/' },
      ]
    }
  ];

  return (
    <>
      <BrowserRouter>
        <div className="app-layout">
          {/* Navigation Bar */}
          <nav className="navbar">
            <h1>Bus Tracking System</h1>
            <div className="nav-links">
              {user ? (
                <>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  {/* These are your navigation "icons" / buttons */}
                  <button type="button" onClick={() => setAuthModal('login')}>Login</button>
                  <button type="button" className="signup-button" onClick={() => setAuthModal('signup')}>Sign Up</button>
                </>
              )}
            </div>
          </nav>

          <div className="container">
            <header className="header">
              <h1 className="main-title">Application Interfaces</h1>
              <p className="subtitle">Click on any interface to learn more.</p>
            </header>

            <main>
              {imageGroups.map((group) => (
                <section key={group.title}>
                  <h2 className="group-title">{group.title}</h2>

                  <div style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#4b5563' }}>
                    <p style={{ margin: 0 }}>{group.line1}</p>
                    <p style={{ margin: '0.25rem 0 0 0' }}>{group.line2}</p>
                  </div>

                  <div className="image-grid">
                    {group.images.map((image) => (
                      <ImageCard
                        key={image.id}
                        imageUrl={image.imageUrl}
                        title={image.title}
                        linkUrl={image.linkUrl}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </main>
          </div>
          {authModal && (
            <div className="auth-modal-backdrop" onClick={closeAuthModal}>
              <div
                className="auth-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="auth-modal-title"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  className="auth-modal-close"
                  aria-label="Close"
                  onClick={closeAuthModal}
                >
                  &times;
                </button>

                {authModal === 'login' ? (
                  <Login
                    setUser={setUser}
                    onSuccess={closeAuthModal}
                    onSwitchToSignup={() => setAuthModal('signup')}
                  />
                ) : (
                  <Signup
                    onSuccess={() => setAuthModal('login')}
                    onSwitchToLogin={() => setAuthModal('login')}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </BrowserRouter>


    </>
  );
}
