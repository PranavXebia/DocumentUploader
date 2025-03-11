// src/components/Header/Header.tsx
import React from 'react';
import { Box, Typography, Button, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SyncIcon from '@mui/icons-material/Sync';
import { FilterOptions } from '../../types/Document';

interface HeaderProps {
  lastSync: string;
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onAddDocument: () => void;
  onAddMultipleDocuments: () => void;
  onSync: () => void;
}

const Header: React.FC<HeaderProps> = ({
  lastSync,
  filters,
  onFilterChange,
  onAddDocument,
  onAddMultipleDocuments,
  onSync
}) => {
  const handleFilterChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = event.target.name as keyof FilterOptions;
    onFilterChange({
      ...filters,
      [name]: event.target.value as string
    });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Knowledge Base Document</Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddDocument}
            sx={{ bgcolor: '#333', '&:hover': { bgcolor: '#555' } }}
          >
            Add Document
          </Button>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddMultipleDocuments}
            sx={{ bgcolor: '#333', '&:hover': { bgcolor: '#555' } }}
          >
            Add Multiple Document
          </Button>
        </Box>
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        bgcolor: '#f5f5f5', 
        p: 1.5, 
        borderRadius: 1,
        mb: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2">Last Sync - {lastSync}</Typography>
          <IconButton size="small" onClick={onSync} sx={{ border: '1px solid #ccc', borderRadius: '4px' }}>
            <SyncIcon fontSize="small" />
          </IconButton>
        </Box>
        
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Brand</InputLabel>
          <Select
            name="brand"
            value={filters.brand}
            label="Brand"
            onChange={handleFilterChange}
          >
            <MenuItem value="HAL">HAL</MenuItem>
            <MenuItem value="ACME">ACME</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={filters.category}
            label="Category"
            onChange={handleFilterChange}
          >
            <MenuItem value="Medical">Medical</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
          </Select>
        </FormControl>
        
        <Button variant="outlined" size="small">
          New Category
        </Button>
      </Box>
    </Box>
  );
};

export default Header;