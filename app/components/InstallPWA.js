'use client';

import { useState, useEffect } from 'react';

export default function InstallPWA() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setPromptInstall(e);
      setSupportsPWA(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!promptInstall) {
      return;
    }
    // Show the install prompt
    promptInstall.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await promptInstall.userChoice;
    // Clear the saved prompt since it can't be used again
    setPromptInstall(null);
  };

  if (!supportsPWA) {
    return null;
  }

  return (
    <button
      className="install-button"
      onClick={handleInstallClick}
    >
      Install App
    </button>
  );
}
