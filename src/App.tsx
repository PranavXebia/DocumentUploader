// src/App.tsx

import React, { useState } from 'react';
import { Container, ThemeProvider, createTheme, CssBaseline, Dialog } from '@mui/material';
import Header from './Components/Header/Header';
import SyncButton from './Components/Header/SyncButton';
import DocumentTable from './Components/DocumentTable/DocumentTable';
import DocumentRow from './Components/DocumentTable/DocumentRow';
import ExpandableContent from './Components/DocumentTable/ExpandableContent';
import FileUploader from './Components/FileUpload/FileUploader';
import DocumentViewer from './Components/DocumentView/DocumentViewer';
import Notification from './Components/common/Notification';
import { Document, FilterOptions } from './types/Document';

// Sample data
const SAMPLE_DOCUMENTS: Document[] = [
  // Your sample documents here
];

const theme = createTheme({
  palette: {
    primary: { main: '#333333' },
    secondary: { main: '#757575' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

const App: React.FC = () => {
  // State
  const [documents, setDocuments] = useState<Document[]>(SAMPLE_DOCUMENTS);
  const [filters, setFilters] = useState<FilterOptions>({ brand: 'HAL', category: 'Medical' });
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as const });
  
  // Handlers
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  const handleAddDocument = () => {
    setIsUploaderOpen(true);
  };
  
  const handleAddMultipleDocuments = () => {
    // Implementation for adding multiple documents
    showNotification('This feature is coming soon!', 'info');
  };
  
  const handleSync = async () => {
    // Simulate sync operation
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        showNotification('Documents synchronized successfully!', 'success');
        resolve();
      }, 2000);
    });
  };
  
  const handleEdit = (document: Document) => {
    setSelectedDocument(document);
    setIsUploaderOpen(true);
  };
  
  const handleDelete = (document: Document) => {
    // Implement delete functionality
    setDocuments(documents.filter(doc => doc.id !== document.id));
    showNotification(`"${document.name}" has been deleted`, 'success');
  };
  
  const handleView = (document: Document) => {
    setSelectedDocument(document);
    setIsViewerOpen(true);
  };
  
  const handleUploaderClose = () => {
    setIsUploaderOpen(false);
    setSelectedDocument(null);
  };
  
  const handleUploaderSubmit = (data: any) => {
    // Handle file upload submission
    if (selectedDocument) {
      // Update existing document
      const updatedDocuments = documents.map(doc => 
        doc.id === selectedDocument.id 
          ? { ...doc, name: data.file?.name || doc.name } 
          : doc
      );
      setDocuments(updatedDocuments);
      showNotification(`"${selectedDocument.name}" has been updated`, 'success');
    } else if (data.file) {
      // Add new document
      const newDocument: Document = {
        id: `doc-${Date.now()}`,
        name: data.file.name,
        type: data.file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
        size: `${Math.round(data.file.size / 1024)}kb`,
        lastModified: new Date().toLocaleString(),
        tags: [
          { label: 'Year', value: '2025' },
          { label: 'Team', value: 'Medical' }
        ],
        isExpandable: true
      };
      
      setDocuments([...documents, newDocument]);
      showNotification(`"${newDocument.name}" has been added`, 'success');
    }
    
    handleUploaderClose();
  };
  
  const handleViewerClose = () => {
    setIsViewerOpen(false);
    setSelectedDocument(null);
  };
  
  const showNotification = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };
  
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Header
          lastSync="02/26/2025"
          filters={filters}
          onFilterChange={handleFilterChange}
          onAddDocument={handleAddDocument}
          onAddMultipleDocuments={handleAddMultipleDocuments}
          syncButton={
            <SyncButton 
              lastSync="02/26/2025" 
              onSync={handleSync} 
            />
          }
        />
        
        <DocumentTable
          documents={documents}
          renderRow={(document, isSelected, isExpanded, handlers) => (
            <DocumentRow
              document={document}
              isSelected={isSelected}
              isExpanded={isExpanded}
              onSelect={handlers.onSelect}
              onToggleExpand={handlers.onToggleExpand}
              onEdit={() => handleEdit(document)}
              onDelete={() => handleDelete(document)}
              onView={() => handleView(document)}
            />
          )}
          renderExpandableContent={(document) => (
            <ExpandableContent document={document} />
          )}
        />
        
        {/* File Uploader Dialog */}
        <Dialog
          open={isUploaderOpen}
          onClose={handleUploaderClose}
          maxWidth="md"
          fullWidth
        >
          <FileUploader
            onCancel={handleUploaderClose}
            onSubmit={handleUploaderSubmit}
            isOpen={isUploaderOpen}
          />
        </Dialog>
        
        {/* Document Viewer */}
        <DocumentViewer
          document={selectedDocument}
          open={isViewerOpen}
          onClose={handleViewerClose}
        />
        
        {/* Notifications */}
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={handleCloseNotification}
        />
      </Container>
    </ThemeProvider>
  );
};

export default App;