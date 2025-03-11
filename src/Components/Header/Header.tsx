// src/components/Header/Header.tsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  SelectChangeEvent,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SyncIcon from '@mui/icons-material/Sync';
import { FilterOptions } from '../../types/Document';

interface HeaderProps {
  lastSync: string;
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onSync: () => void;
  onAddDocument: () => void;
  onAddMultipleDocuments: () => void;
}

const Header: React.FC<HeaderProps> = ({
  lastSync,
  filters,
  onFilterChange,
  onSync,
  onAddDocument,
  onAddMultipleDocuments
}) => {
  // Handle filter changes with correct typing
  const handleFilterChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    onFilterChange({
      ...filters,
      [name as keyof FilterOptions]: value
    });
  };

  const handleAddCategory = () => {
    // Implement add category functionality
    alert('Add new category clicked');
  };

  return (
    <Box sx={{ mb: 3 }}>
      {/* Header with title and action buttons */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2
      }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 500 }}>
          Knowledge Base Document
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddDocument}
            sx={{ 
              bgcolor: '#333', 
              '&:hover': { bgcolor: '#555' },
              textTransform: 'none'
            }}
          >
            Add Document
          </Button>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddMultipleDocuments}
            sx={{ 
              bgcolor: '#333', 
              '&:hover': { bgcolor: '#555' },
              textTransform: 'none'
            }}
          >
            Add Multiple Document
          </Button>
        </Box>
      </Box>
      
      {/* Filters and sync button */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        p: 2,
        bgcolor: '#f5f5f5',
        borderRadius: '4px',
        mb: 2
      }}>
        {/* Sync status */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="textSecondary">
            Last Sync - {lastSync}
          </Typography>
          
          <IconButton 
            size="small" 
            onClick={onSync}
            sx={{ 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              p: 0.5,
              bgcolor: 'white'
            }}
          >
            <SyncIcon fontSize="small" />
          </IconButton>
        </Box>
        
        {/* Brand filter */}
        <FormControl size="small" sx={{ minWidth: 120, bgcolor: 'white' }}>
          <InputLabel id="brand-label">Brand</InputLabel>
          <Select
            labelId="brand-label"
            id="brand-select"
            name="brand"
            value={filters.brand}
            label="Brand"
            onChange={handleFilterChange}
          >
            <MenuItem value="HAL">HAL</MenuItem>
            <MenuItem value="ACME">ACME</MenuItem>
          </Select>
        </FormControl>
        
        {/* Category filter */}
        <FormControl size="small" sx={{ minWidth: 120, bgcolor: 'white' }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            name="category"
            value={filters.category}
            label="Category"
            onChange={handleFilterChange}
          >
            <MenuItem value="Medical">Medical</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
          </Select>
        </FormControl>
        
        {/* New category button */}
        <Button
          variant="outlined"
          size="small"
          onClick={handleAddCategory}
          sx={{ 
            bgcolor: 'white',
            borderColor: '#ccc',
            '&:hover': {
              borderColor: '#999',
              bgcolor: '#f9f9f9'
            }
          }}
        >
          New Category
        </Button>
      </Box>
    </Box>
  );
};

export default Header;