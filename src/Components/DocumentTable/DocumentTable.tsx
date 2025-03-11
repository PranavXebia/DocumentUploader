// src/components/DocumentTable/DocumentTable.tsx

import React, { useState, ReactNode } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Checkbox,
  Paper
} from '@mui/material';
import { Document } from '../../types/Document';

interface DocumentTableProps {
  documents: Document[];
  renderRow: (
    document: Document, 
    isSelected: boolean, 
    isExpanded: boolean, 
    handlers: {
      onSelect: () => void;
      onToggleExpand: () => void;
    }
  ) => ReactNode;
  renderExpandableContent: (document: Document) => ReactNode;
}

const DocumentTable: React.FC<DocumentTableProps> = ({
  documents,
  renderRow,
  renderExpandableContent
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedIds(documents.map(doc => doc.id));
    } else {
      setSelectedIds([]);
    }
  };
  
  const handleSelectOne = (id: string) => {
    const selectedIndex = selectedIds.indexOf(id);
    let newSelected: string[] = [];
    
    if (selectedIndex === -1) {
      newSelected = [...selectedIds, id];
    } else {
      newSelected = selectedIds.filter(itemId => itemId !== id);
    }
    
    setSelectedIds(newSelected);
  };
  
  const handleToggleExpand = (id: string) => {
    const expandedIndex = expandedIds.indexOf(id);
    let newExpanded: string[] = [];
    
    if (expandedIndex === -1) {
      newExpanded = [...expandedIds, id];
    } else {
      newExpanded = expandedIds.filter(itemId => itemId !== id);
    }
    
    setExpandedIds(newExpanded);
  };
  
  const isSelected = (id: string) => selectedIds.indexOf(id) !== -1;
  const isExpanded = (id: string) => expandedIds.indexOf(id) !== -1;
  
  return (
    <TableContainer component={Paper} sx={{ border: '1px solid #e0e0e0', boxShadow: 'none', borderRadius: '4px' }}>
      <Table>
        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selectedIds.length > 0 && selectedIds.length < documents.length}
                checked={documents.length > 0 && selectedIds.length === documents.length}
                onChange={handleSelectAll}
              />
            </TableCell>
            <TableCell width="48px"></TableCell> {/* Expansion column */}
            <TableCell sx={{ fontWeight: 500, color: '#666' }}>DOCUMENT NAME</TableCell>
            <TableCell sx={{ fontWeight: 500, color: '#666' }}>TYPE</TableCell>
            <TableCell sx={{ fontWeight: 500, color: '#666' }}>SIZE</TableCell>
            <TableCell sx={{ fontWeight: 500, color: '#666' }}>LAST MODIFIED</TableCell>
            <TableCell sx={{ fontWeight: 500, color: '#666' }}>TAGS</TableCell>
            <TableCell align="right" sx={{ fontWeight: 500, color: '#666' }}>ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((document) => (
            <React.Fragment key={document.id}>
              {renderRow(
                document, 
                isSelected(document.id), 
                isExpanded(document.id),
                {
                  onSelect: () => handleSelectOne(document.id),
                  onToggleExpand: () => handleToggleExpand(document.id)
                }
              )}
              
              {isExpanded(document.id) && document.isExpandable && (
                renderExpandableContent(document)
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DocumentTable;