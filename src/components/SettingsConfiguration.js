// src/components/SettingsConfiguration.js
import React, { useState, useEffect } from 'react';

const SettingsConfiguration = () => {
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    // Fetch existing settings from the server if needed
    setWelcomeMessage('Welcome to the Menu Management Page!'); // Example default message
  }, []);

  const handleSave = () => {
    // Logic to save settings (e.g., API call)
    console.log('Saving settings:', { welcomeMessage });
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Welcome Message</label>
        <input
          type="text"
          value={welcomeMessage}
          onChange={(e) => setWelcomeMessage(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleSave}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Settings
      </button>
    </div>
  );
};

export default SettingsConfiguration;
