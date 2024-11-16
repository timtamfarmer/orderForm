import React, { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle'; // Create menu item icon
import BuildIcon from '@mui/icons-material/Build'; // Form builder icon
import SettingsModal from './SettingsModal'; // Modal component for settings

const AdminSidebar = ({ onCreateMenu, onOpenFormBuilder }) => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
  };

  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  return (
    <div className="bg-gray-800 text-white h-screen p-4 flex flex-col space-y-4 w-1/5">
      <button
        onClick={onCreateMenu}
        className="flex items-center p-2 bg-blue-500 rounded hover:bg-blue-600"
      >
        <AddCircleIcon className="mr-2" />
        <span>Create Menu Item</span>
      </button>
      <button
        onClick={openSettingsModal}
        className="flex items-center p-2 bg-green-500 rounded hover:bg-green-600"
      >
        <SettingsIcon className="mr-2" />
        <span>Settings</span>
      </button>
      <button
        onClick={onOpenFormBuilder} // Correctly using the prop passed from AdminMenuManagement
        className="flex items-center p-2 bg-purple-500 rounded hover:bg-purple-600"
      >
        <BuildIcon className="mr-2" />
        <span>Form Builder</span>
      </button>

      {/* Settings Modal */}
      {isSettingsModalOpen && <SettingsModal onClose={closeSettingsModal} />}
    </div>
  );
};

export default AdminSidebar;
