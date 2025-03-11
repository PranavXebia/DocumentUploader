// src/components/DocumentTable/DocumentRow.tsx

import React from 'react';
import { 
  TableRow, 
  TableCell, 
  Checkbox, 
  IconButton, 
  Tooltip,
  Typography,
  Box
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import { Document } from '../../types/Document';

interface DocumentRowProps {
  document: Document;
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: () => void;
  onToggleExpand: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

const DocumentRow: React.FC<DocumentRowProps> = ({
  document,
  isSelected,
  isExpanded,
  onSelect,
  onToggleExpand,
  onEdit,
  onDelete,
  onView
}) => {
  // Get icon based on document type
  const getDocumentIcon = () => {
    switch (document.type.toLowerCase()) {
      case 'pdf':
        return <PictureAsPdfIcon fontSize="small" color="error" />;
      default:
        return <DescriptionIcon fontSize="small" color="primary" />;
    }
  };

  return (
    <TableRow 
      hover
      selected={isSelected}
      sx={{ 
        cursor: 'pointer',
        '&.Mui-selected': { backgroundColor: 'rgba(33, 150, 243, 0.08)' },
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
      }}
    >
      <TableCell padding="checkbox" onClick={(e) => { e.stopPropagation(); onSelect(); }}>
        <Checkbox checked={isSelected} />
      </TableCell>
      
      <TableCell padding="checkbox">
        {document.isExpandable && (
          <IconButton size="small" onClick={onToggleExpand}>
            {isExpanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        )}
      </TableCell>
      
      <TableCell onClick={onView}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {getDocumentIcon()}
          <Typography
            variant="body2"
            sx={{ 
              color: '#2196f3', 
              fontWeight: 500,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            {document.name}
          </Typography>
        </Box>
      </TableCell>
      
      <TableCell>{document.type}</TableCell>
      <TableCell>{document.size}</TableCell>
      <TableCell>{document.lastModified}</TableCell>
      
      <TableCell>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {document.tags.map((tag, index) => (
            <Box 
              key={index}
              sx={{
                bgcolor: '#f0f0f0',
                px: 1,
                py: 0.5,
                borderRadius: '16px',
                fontSize: '0.75rem',
                whiteSpace: 'nowrap'
              }}
            >
              {tag.label} : {tag.value}
            </Box>
          ))}
        </Box>
      </TableCell>
      
      <TableCell align="right">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Tooltip title="Edit">
            <IconButton 
              size="small" 
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
              sx={{ '&:hover': { color: '#2196f3' } }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Delete">
            <IconButton 
              size="small" 
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              sx={{ '&:hover': { color: '#f44336' } }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default DocumentRow;