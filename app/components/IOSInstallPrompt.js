"use client";

import { useState, useEffect } from "react";

export default function IOSInstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if the device is iOS
    const ios = /iphone|ipad|ipod/.test(
      window.navigator.userAgent.toLowerCase()
    );
    // Check if the app is already installed
    const standalone = window.navigator.standalone === true;

    setIsIOS(ios);
    setIsStandalone(standalone);
  }, []);

  if (!isIOS || isStandalone) {
    return null;
  }

  return (
    <div className="ios-prompt">
      <p>
        Install this app on your iPhone: tap
        <svg className="share-icon" /* Add your share icon SVG */ />
        and then "Add to Home Screen"
      </p>
    </div>
  );
}
