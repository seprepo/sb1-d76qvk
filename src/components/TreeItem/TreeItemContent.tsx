import React from 'react';
import { FileIcon } from '../FileIcon';
import { FileSystemNode } from '../../types/FileSystem';
import { getFileType } from '../../utils/fileTypeUtils';

interface TreeItemContentProps {
  node: FileSystemNode;
}

export const TreeItemContent: React.FC<TreeItemContentProps> = ({ node }) => {
  const fileType = node.type === 'file' ? getFileType(node.name) : undefined;
  const itemCount = node.children?.length || 0;
  
  return (
    <div className="flex items-center gap-2 py-1">
      <FileIcon type={node.type} fileType={fileType} />
      <span className="text-sm">{node.name}</span>
      {node.type === 'folder' && itemCount > 0 && (
        <span className="text-xs text-gray-500 ml-1">({itemCount})</span>
      )}
    </div>
  );
};