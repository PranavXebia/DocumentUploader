// src/components/DocumentTable/ExpandableContent.tsx

import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  Divider,
  Paper
} from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Document } from '../../types/Document';

interface ExpandableContentProps {
  document: Document;
}

const ExpandableContent: React.FC<ExpandableContentProps> = ({ document }) => {
  // Mock data for downloadable files
  const downloadFiles = [
    {
      name: document.name,
      size: document.size,
      lastModified: document.lastModified
    },
    {
      name: `${document.name} - Appendix`,
      size: '345kb',
      lastModified: document.lastModified
    },
    {
      name: `${document.name} - References`,
      size: '128kb',
      lastModified: document.lastModified
    }
  ];

  return (
    <TableRow>
      <TableCell colSpan={8} sx={{ p: 0 }}>
        <Box sx={{ bgcolor: '#f5f5f5', p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Available Downloads
          </Typography>
          
          <Paper variant="outlined" sx={{ mt: 1, overflow: 'hidden' }}>
            <Table size="small">
              <TableHead sx={{ bgcolor: '#e0e0e0' }}>
                <TableRow>
                  <TableCell>DOCUMENT NAME</TableCell>
                  <TableCell>DOWNLOAD</TableCell>
                  <TableCell>FILE SIZE</TableCell>
                  <TableCell>LAST MODIFIED</TableCell>
                  <TableCell align="right">ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {downloadFiles.map((file, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{file.name}</TableCell>
                    <TableCell>
                      <CloudDownloadIcon fontSize="small" color="action" />
                    </TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell>{file.lastModified}</TableCell>
                    <TableCell align="right">
                      <Button 
                        variant="outlined" 
                        size="small"
                        sx={{ 
                          borderRadius: '16px',
                          textTransform: 'none',
                          px: 2
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default ExpandableContent;