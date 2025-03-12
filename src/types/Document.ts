// src/types/Document.ts
export interface Tag {
    label: string;
    value: string;
  }
  
  export interface Document {
    id: string;
    name: string;
    type: string;
    size: string;
    lastModified: string;
    tags: Tag[];
    isExpandable?: boolean;
  }
  
  export interface FilterOptions {
    brand: string;
    category?: string;
  }