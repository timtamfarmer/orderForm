import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../components/AdminSidebar';
import MenuItemFormModal from '../components/MenuItemFormModal';
import FormBuilder from '../components/FormBuilder';
import Navbar from '../components/common/Navbar';

const AdminMenuManagement = () => {
  const [isMenuItemModalOpen, setMenuItemModalOpen] = useState(false);
  const [isFormBuilderOpen, setFormBuilderOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [pastMenus, setPastMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch menus on component mount
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const [activeMenuResponse, pastMenusResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/menus/active'),
          axios.get('http://localhost:5000/api/menus/past'),
        ]);
        setActiveMenu(activeMenuResponse.data);
        setPastMenus(pastMenusResponse.data);
      } catch (err) {
        console.error('Error fetching menus:', err);
        setError('Failed to fetch menus.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  const toggleMenuItemModal = () => setMenuItemModalOpen((prev) => !prev);
  const toggleFormBuilder = () => setFormBuilderOpen((prev) => !prev);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
        <AdminSidebar
          onCreateMenu={toggleMenuItemModal}
          onOpenFormBuilder={toggleFormBuilder}
          className="w-64 bg-gray-800 text-white"
        />
    
        <main className="flex-grow p-8 bg-white shadow-lg rounded-lg m-4">
          {!isFormBuilderOpen ? (
            <>
              <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to the Menu Management Page</h1>
              {activeMenu?.activeMenu ? ( // Updated access path
                <div className="p-6 mb-6 bg-indigo-500 text-white rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold">Active Menu</h2>
                  {console.log('Active Menu Data:', activeMenu.activeMenu)} {/* Debugging line */}
                  <p className="mt-2">Title: {activeMenu.activeMenu.menuTitle || 'N/A'}</p>
                  <p>
                    Available From:{' '}
                    {activeMenu.activeMenu.availableFrom ? new Date(activeMenu.activeMenu.availableFrom).toLocaleDateString() : 'N/A'}
                  </p>
                  <p>
                    Available Until:{' '}
                    {activeMenu.activeMenu.availableUntil ? new Date(activeMenu.activeMenu.availableUntil).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              ) : (
                <p className="p-4 mb-6 bg-gray-200 rounded-lg text-gray-700">No active menu available.</p>
              )}
              <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Past Menus</h2>
                {pastMenus.length > 0 ? (
                  <ul>
                    {pastMenus.map((menu) => (
                      <li key={menu._id} className="mb-2 p-2 bg-white rounded shadow hover:bg-gray-100 transition duration-200">
                        <p className="font-semibold">{menu.menuTitle || 'N/A'}</p>
                        <p className="text-sm text-gray-600">
                          Available From:{' '}
                          {menu.availableFrom ? new Date(menu.availableFrom).toLocaleDateString() : 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Available Until:{' '}
                          {menu.availableUntil ? new Date(menu.availableUntil).toLocaleDateString() : 'N/A'}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No past menus available.</p>
                )}
              </div>
            </>
          ) : (
            <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
              <FormBuilder />
            </div>
          )}
        </main>
    
        {isMenuItemModalOpen && (
          <MenuItemFormModal isOpen={isMenuItemModalOpen} onClose={toggleMenuItemModal} />
        )}
      </div>
    </div>
  );
  
  
};

export default AdminMenuManagement;
