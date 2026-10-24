import React, { createContext, useContext, useState, useEffect } from 'react';
import sound from '../utils/sound';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isVipMode, setIsVipMode] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(sound.isMuted());
  const [activeModal, setActiveModal] = useState(null); // 'about' | 'contact' | 'privacy' | 'terms' | null
  const [toastMessage, setToastMessage] = useState(null);

  // Load VIP demo state from session storage
  useEffect(() => {
    try {
      const savedVip = sessionStorage.getItem('pixelplay_vip_demo');
      if (savedVip === 'true') {
        setIsVipMode(true);
      }
    } catch {
      // Ignore
    }
  }, []);

  const toggleVipMode = () => {
    setIsVipMode(prev => {
      const next = !prev;
      try {
        sessionStorage.setItem('pixelplay_vip_demo', next.toString());
      } catch {
        // Ignore
      }
      showToast(next ? '⭐ PixelPlay Plus Demo Activated! Ads hidden.' : 'PixelPlay Plus Demo Deactivated.');
      return next;
    });
  };

  const toggleSound = () => {
    const nextMuted = sound.toggleMute();
    setIsSoundMuted(nextMuted);
    showToast(nextMuted ? '🔇 Audio muted' : '🔊 Audio unmuted');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(current => current === msg ? null : current);
    }, 3200);
  };

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <AppContext.Provider
      value={{
        isVipMode,
        toggleVipMode,
        isSoundMuted,
        toggleSound,
        activeModal,
        openModal,
        closeModal,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
