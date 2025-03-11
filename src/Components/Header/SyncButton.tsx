// src/components/Header/SyncButton.tsx

import React, { useState } from 'react';
import { Box, IconButton, Typography, Tooltip } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';

interface SyncButtonProps {
  lastSync: string;
  onSync: () => Promise<void>;
}

const SyncButton: React.FC<SyncButtonProps> = ({ lastSync, onSync }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  
  const handleSync = async () => {
    if (isSyncing) return;
    
    setIsSyncing(true);
    try {
      await onSync();
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setTimeout(() => setIsSyncing(false), 1500); // Show animation for at least 1.5s
    }
  };
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" color="textSecondary">
        Last Sync - {lastSync}
      </Typography>
      
      <Tooltip title={isSyncing ? "Syncing..." : "Sync now"}>
        <IconButton 
          size="small" 
          onClick={handleSync}
          disabled={isSyncing}
          sx={{ 
            bgcolor: 'white',
            border: '1px solid #ccc',
            p: 0.5,
            borderRadius: '4px',
            '&:hover': {
              bgcolor: '#f5f5f5'
            }
          }}
        >
          <SyncIcon 
            fontSize="small" 
            color="action" 
            sx={{ 
              animation: isSyncing ? 'spin 1.5s linear infinite' : 'none',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' }
              }
            }} 
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SyncButton;