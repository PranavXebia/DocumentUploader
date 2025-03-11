// src/components/FileUpload/FileUploader.tsx
import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button,
  Dialog,
  IconButton
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloseIcon from '@mui/icons-material/Close';

interface FileUploaderProps {
  onCancel?: () => void;
  onSubmit?: (data: FileUploadData) => void;
  isOpen?: boolean;
}

interface FileUploadData {
  file: File | null;
  description: string;
  tags: string[];
}

enum UploadState {
  IDLE = 'idle',
  UPLOADING = 'uploading',
  COMPLETE = 'complete'
}

const FileUploader: React.FC<FileUploaderProps> = ({ 
  onCancel,
  onSubmit,
  isOpen = true
}) => {
  // File upload state
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadState, setUploadState] = useState<UploadState>(UploadState.IDLE);
  
  // Description state
  const [description, setDescription] = useState<string>('');
  
  // Tags state
  const [tags, setTags] = useState<string[]>([]);
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      simulateFileUpload(selectedFile);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      simulateFileUpload(droppedFile);
    }
  };

  // Simulate file upload with progress
  const simulateFileUpload = (fileToUpload: File) => {
    setUploadState(UploadState.UPLOADING);
    setUploadProgress(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setUploadState(UploadState.COMPLETE);
        }, 500);
      }
      
      setUploadProgress(progress);
    }, 300);
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' Bytes';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  // Get file icon based on type
  const getFileIcon = () => {
    if (!file) return <InsertDriveFileIcon style={{ color: '#666', fontSize: '2.5rem' }} />;
    
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <PictureAsPdfIcon style={{ color: '#666', fontSize: '2.5rem' }} />;
      default:
        return <InsertDriveFileIcon style={{ color: '#666', fontSize: '2.5rem' }} />;
    }
  };

  // Handle description change
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (onSubmit && file) {
      onSubmit({
        file,
        description,
        tags
      });
    }
  };

  // Reset the uploader
  const handleReset = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadState(UploadState.IDLE);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onCancel} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{ 
        elevation: 1,
        style: { 
          borderRadius: '0.25rem',
          maxWidth: '32.5rem',
          padding: 0
        }
      }}
    >
      <Box style={{ padding: '0' }}>
        {/* Header */}
        <Box style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '1rem 1.25rem',
          borderBottom: '0.0625rem solid #eee'
        }}>
          <Typography variant="h6" style={{ fontWeight: 400 }}>Add/EDIT</Typography>
          <Button 
            variant="outlined" 
            size="small" 
            style={{ 
              borderRadius: '0.25rem',
              color: '#666',
              borderColor: '#ccc',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              minWidth: '3.75rem',
              padding: '0.25rem 0.5rem'
            }}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Box>
        
        {/* File Upload Area with progress effect */}
        {uploadState === UploadState.IDLE ? (
          // Initial state - file dropzone
          <Box style={{
            backgroundColor: '#f0f0f0',
            padding: '1.25rem',
          }}>
            <Box
              style={{
                border: '0.125rem dashed #ccc',
                borderRadius: '0.25rem',
                padding: '1.5rem',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.txt,.json"
              />
              <Box style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>+</Box>
              <Typography variant="body1" style={{ marginBottom: '0.5rem' }}>
                Click or drop file to upload
              </Typography>
              <Box style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                gap: '0.25rem' 
              }}>
                <span style={{ 
                  backgroundColor: '#e0e0e0', 
                  padding: '0.125rem 0.375rem', 
                  borderRadius: '0.125rem',
                  fontSize: '0.75rem'
                }}>pdf</span>
                <span style={{ 
                  backgroundColor: '#e0e0e0', 
                  padding: '0.125rem 0.375rem', 
                  borderRadius: '0.125rem',
                  fontSize: '0.75rem'
                }}>doc</span>
                <span style={{ 
                  backgroundColor: '#e0e0e0', 
                  padding: '0.125rem 0.375rem', 
                  borderRadius: '0.125rem',
                  fontSize: '0.75rem'
                }}>docx</span>
                <span style={{ 
                  backgroundColor: '#e0e0e0', 
                  padding: '0.125rem 0.375rem', 
                  borderRadius: '0.125rem',
                  fontSize: '0.75rem'
                }}>xls</span>
                <span style={{ 
                  backgroundColor: '#e0e0e0', 
                  padding: '0.125rem 0.375rem', 
                  borderRadius: '0.125rem',
                  fontSize: '0.75rem'
                }}>xlsx</span>
                <span style={{ 
                  backgroundColor: '#e0e0e0', 
                  padding: '0.125rem 0.375rem', 
                  borderRadius: '0.125rem',
                  fontSize: '0.75rem'
                }}>csv</span>
                <span style={{ 
                  backgroundColor: '#e0e0e0', 
                  padding: '0.125rem 0.375rem', 
                  borderRadius: '0.125rem',
                  fontSize: '0.75rem'
                }}>tsv</span>
                <span style={{ 
                  backgroundColor: '#e0e0e0', 
                  padding: '0.125rem 0.375rem', 
                  borderRadius: '0.125rem',
                  fontSize: '0.75rem'
                }}>txt</span>
                <span style={{ 
                  backgroundColor: '#e0e0e0', 
                  padding: '0.125rem 0.375rem', 
                  borderRadius: '0.125rem',
                  fontSize: '0.75rem'
                }}>json</span>
                <span style={{ 
                  backgroundColor: '#e0e0e0', 
                  padding: '0.125rem 0.375rem', 
                  borderRadius: '0.125rem',
                  fontSize: '0.75rem'
                }}>&lt; 10 MB</span>
              </Box>
            </Box>
          </Box>
        ) : (
          // Uploading or Complete state with progress background
          <Box style={{ position: 'relative' }}>
            {/* Progress background container - this is the entire background area */}
            <Box style={{ 
              display: 'flex', 
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 0
            }}>
              {/* Completed part (darker) */}
              <Box style={{ 
                width: `${uploadProgress}%`, 
                height: '100%', 
                backgroundColor: '#c8c8c8',
                transition: 'width 0.3s ease-in-out'
              }} />
              
              {/* Remaining part (lighter) */}
              <Box style={{ 
                width: `${100 - uploadProgress}%`, 
                height: '100%', 
                backgroundColor: '#f0f0f0',
                transition: 'width 0.3s ease-in-out'
              }} />
            </Box>
            
            {/* Content on top of the progress background */}
            <Box style={{ 
              position: 'relative', 
              zIndex: 1, 
              padding: '2.5rem 1.25rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {/* Remove file button */}
              {uploadState === UploadState.COMPLETE && (
                <IconButton 
                  size="small"
                  onClick={handleReset}
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    padding: '0.25rem',
                  }}
                >
                  <CloseIcon style={{ fontSize: '1rem' }} />
                </IconButton>
              )}
              
              {getFileIcon()}
              <Typography variant="body1" style={{ 
                marginTop: '0.75rem', 
                fontWeight: 500,
                fontSize: '1rem' 
              }}>
                {file?.name || 'HAL-document.pdf'}
              </Typography>
              {uploadState === UploadState.UPLOADING ? (
                <Typography variant="body2" style={{ 
                  color: '#2196f3',
                  fontSize: '0.875rem'
                }}>
                  {uploadProgress}% Uploading · {file ? formatFileSize(file.size) : '8.77 MB'}
                </Typography>
              ) : (
                <Box style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: '#666',
                  marginTop: '0.25rem'
                }}>
                  <CheckCircleOutlineIcon style={{ fontSize: '1rem', marginRight: '0.25rem' }} />
                  <Typography variant="body2">
                    Upload complete
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}
        
        {/* Description Field */}
        <Box style={{ padding: '1rem 1.25rem' }}>
          <Typography variant="subtitle1" style={{ 
            marginBottom: '0.5rem',
            fontWeight: 400
          }}>
            Description
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Donec aliquam commodo massa, et viverra augue vehicula nec."
            value={description}
            onChange={handleDescriptionChange}
            variant="outlined"
            style={{
              borderRadius: '0.25rem',
            }}
          />
        </Box>
        
        {/* Tags Section */}
        <Box style={{ padding: '1rem 1.25rem' }}>
          <Typography variant="subtitle1" style={{ 
            marginBottom: '0.5rem',
            fontWeight: 400
          }}>
            Tags :
          </Typography>
          
          <Box style={{ display: 'flex', gap: '0.5rem' }}>
            <Button 
              variant="outlined"
              style={{ 
                borderRadius: '1.25rem',
                color: '#666',
                borderColor: '#ccc',
                textTransform: 'none',
                padding: '0.375rem 1rem'
              }}
            >
              Add Tags
            </Button>
            
            <Button 
              variant="outlined"
              style={{ 
                borderRadius: '1.25rem',
                color: '#666',
                borderColor: '#ccc',
                textTransform: 'none',
                padding: '0.375rem 1rem'
              }}
              onClick={onCancel}
            >
              Cancel
            </Button>
            
            <Button 
              variant="contained"
              style={{ 
                borderRadius: '1.25rem',
                backgroundColor: '#333',
                color: 'white',
                textTransform: 'none',
                padding: '0.375rem 1rem'
              }}
              onClick={handleSubmit}
              disabled={uploadState === UploadState.UPLOADING}
            >
              ADD
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default FileUploader;