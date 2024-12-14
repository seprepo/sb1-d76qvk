export type FileType = 
  | 'folder'
  | 'document'
  | 'image'
  | 'pdf'
  | 'video'
  | 'audio'
  | 'spreadsheet'
  | 'presentation'
  | 'archive'
  | 'executable'
  | 'unknown';

export interface FileSystemNode {
  id: string;
  name: string;
  isFolder: boolean;
  isFile: boolean;
  modifiedAt: string;
  modifiedBy: string;
  nodeType: string;
  fileCount?: number; // Add this line
  path: string;
  parentId: string;
  type: 'file' | 'folder';
  fileType?: FileType;
  children?: FileSystemNode[];
}