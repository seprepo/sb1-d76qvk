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
  type: 'file' | 'folder';
  fileType?: FileType;
  children?: FileSystemNode[];
}