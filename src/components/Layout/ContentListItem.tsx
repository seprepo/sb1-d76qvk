import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Download, Eye, Share2, Trash2 } from 'lucide-react';
import { FileSystemNode } from '../../types/FileSystem';
import { FileIcon } from '../FileIcon';
import { getFileType } from '../../utils/fileTypeUtils';

interface ContentListItemProps {
  item: FileSystemNode;
  onSelect: (node: FileSystemNode) => void;
}

export const ContentListItem: React.FC<ContentListItemProps> = ({ item, onSelect }) => {
  const fileType = item.type === 'file' ? getFileType(item.name) : undefined;
  
  const handleAction = (action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`${action} action for ${item.name}`);
  };

  return (
    <div
      onClick={() => onSelect(item)}
      className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer group"
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg">
          <FileIcon
            type={item.type}
            fileType={fileType}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-medium">{item.name}</span>
          <span className="text-sm text-gray-500">
            {item.type === 'folder' 
              ? `${item.children?.length || 0} items`
              : fileType}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {item.type === 'file' && (
          <>
            <Tooltip title="Preview">
              <IconButton size="small" onClick={(e) => handleAction('preview', e)}>
                <Eye size={18} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download">
              <IconButton size="small" onClick={(e) => handleAction('download', e)}>
                <Download size={18} />
              </IconButton>
            </Tooltip>
          </>
        )}
        <Tooltip title="Share">
          <IconButton size="small" onClick={(e) => handleAction('share', e)}>
            <Share2 size={18} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            size="small"
            className="text-red-600 hover:text-red-700"
            onClick={(e) => handleAction('delete', e)}
          >
            <Trash2 size={18} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};