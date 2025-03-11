// src/components/DocumentView/DocumentViewer.tsx

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Document } from '../../types/Document';

interface DocumentViewerProps {
  document: Document | null;
  open: boolean;
  onClose: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  open,
  onClose
}) => {
  if (!document) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { 
          height: '80vh',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{document.name}</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 0 }}>
        {document.type.toLowerCase() === 'pdf' ? (
          <Box sx={{ flex: 1, bgcolor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* In a real app, you would render the PDF here */}
            <Box sx={{ textAlign: 'center' }}>
              <PictureAsPdfIcon sx={{ fontSize: 80, color: '#f44336', mb: 2 }} />
              <Typography>
                PDF Viewer would be displayed here
              </Typography>
              <Typography variant="caption" color="textSecondary">
                File: {document.name} ({document.size})
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ flex: 1, bgcolor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography>Preview not available for this file type</Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewer;