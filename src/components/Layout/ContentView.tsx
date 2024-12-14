import React, { useEffect, useState } from 'react';
import { Paper, CircularProgress } from '@mui/material';
import { FileSystemNode } from '../../types/FileSystem';
import { FileIcon } from '../FileIcon';
import { getFileType } from '../../utils/fileTypeUtils';
import { ContentListItem } from './ContentListItem';
import { ContentActions } from './ContentActions';
import { fetchChildren } from '../../services/nodeService';

interface ContentViewProps {
  currentNode: FileSystemNode;
  onNavigate?: (node: FileSystemNode) => void;
}

export const ContentView: React.FC<ContentViewProps> = ({ currentNode, onNavigate }) => {
  const [children, setChildren] = useState<FileSystemNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadChildren = async () => {
      if (currentNode?.type === 'folder') {
        setIsLoading(true);
        const items = await fetchChildren(currentNode.id);
        setChildren(items);
        setIsLoading(false);
      }
    };

    loadChildren();
  }, [currentNode]);

  const handleItemSelect = (node: FileSystemNode) => {
    if (node.type === 'folder' && onNavigate) {
      onNavigate(node);
    } else {
      // Handle file selection
      console.log('Selected file:', node.name);
    }
  };

  const handleCreateFolder = () => {
    console.log('Create folder');
  };

  const handleUpload = () => {
    console.log('Upload files');
  };

  if (currentNode?.type === 'file') {
    const fileType = getFileType(currentNode.name);
    return (
      <Paper className="p-6 h-full">
        <div className="flex items-center gap-3 mb-4">
          <FileIcon type="file" fileType={fileType} />
          <h2 className="text-xl font-semibold">{currentNode.name}</h2>
        </div>
        <p className="text-gray-600">File preview not available</p>
      </Paper>
    );
  }

  return (
    <Paper className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileIcon type="folder" />
          <h2 className="text-xl font-semibold">{currentNode?.name}</h2>
        </div>
        <ContentActions
          onCreateFolder={handleCreateFolder}
          onUpload={handleUpload}
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {children.map((item) => (
            <ContentListItem
              key={item.id}
              item={item}
              onSelect={handleItemSelect}
            />
          ))}
        </div>
      )}
    </Paper>
  );
};