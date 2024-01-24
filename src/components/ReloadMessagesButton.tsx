"use client"

import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface ReloadMessagesButtonProps {
  onReload: () => void;
}

const ReloadMessagesButton: React.FC<ReloadMessagesButtonProps> = ({ onReload }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      onReload();
    }
  }, [loading, onReload]);

  const handleReload = () => {
    try {
      setLoading(true);
    } catch (error) {
      console.error('Error reloading page:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="text-gray-500 hover:text-gray-700 focus:outline-none"
      onClick={handleReload}
      disabled={loading}
    >
      <RefreshCw size={20} />
    </button>
  );
};

export default ReloadMessagesButton;
