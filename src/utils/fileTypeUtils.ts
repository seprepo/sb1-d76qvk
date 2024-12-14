import { FileType } from '../types/FileSystem';

export const getFileType = (fileName: string): FileType => {
  const extension = fileName.toLowerCase().split('.').pop();
  
  switch (extension) {
    case 'pdf':
      return 'pdf';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
      return 'image';
    case 'mp4':
    case 'mov':
    case 'avi':
    case 'mkv':
      return 'video';
    case 'mp3':
    case 'wav':
    case 'ogg':
      return 'audio';
    case 'doc':
    case 'docx':
    case 'txt':
      return 'document';
    case 'xls':
    case 'xlsx':
    case 'csv':
      return 'spreadsheet';
    case 'ppt':
    case 'pptx':
      return 'presentation';
    case 'zip':
    case 'rar':
    case '7z':
      return 'archive';
    case 'exe':
    case 'msi':
    case 'dmg':
      return 'executable';
    default:
      return 'folder';
  }
};