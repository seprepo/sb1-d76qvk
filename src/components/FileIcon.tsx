import React from 'react';
import {
  Folder,
  FileText,
  Image,
  Video,
  Music,
  FileSpreadsheet,
  Presentation,
  Archive,
  FileCode,
  File,
  FileQuestion
} from 'lucide-react';
import { FileType } from '../types/FileSystem';

interface FileIconProps {
  type: 'file' | 'folder';
  fileType?: FileType;
}

export const FileIcon: React.FC<FileIconProps> = ({ type, fileType }) => {
  if (type === 'folder') {
    return <Folder size={20} className="text-yellow-600" />;
  }

  // File type specific icons
  switch (fileType) {
    case 'image':
      return <Image size={20} className="text-green-600" />;
    case 'video':
      return <Video size={20} className="text-purple-600" />;
    case 'audio':
      return <Music size={20} className="text-pink-600" />;
    case 'spreadsheet':
      return <FileSpreadsheet size={20} className="text-emerald-600" />;
    case 'presentation':
      return <Presentation size={20} className="text-orange-600" />;
    case 'archive':
      return <Archive size={20} className="text-gray-600" />;
    case 'executable':
      return <FileCode size={20} className="text-red-600" />;
    case 'pdf':
      return <File size={20} className="text-red-700" />;
    case 'document':
      return <FileText size={20} className="text-blue-600" />;
    default:
      return <FileQuestion size={20} className="text-gray-500" />;
  }
};