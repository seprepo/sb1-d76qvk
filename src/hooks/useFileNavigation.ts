import { useState } from 'react';
import { FileSystemNode } from '../types/FileSystem';
import { findNodePath } from '../utils/pathUtils';
import { sampleFileSystem } from '../data/sampleData';

export const useFileNavigation = () => {
  const [currentPath, setCurrentPath] = useState<FileSystemNode[]>([sampleFileSystem[0]]);
  const currentNode = currentPath[currentPath.length - 1];

  const handleNodeSelect = (node: FileSystemNode) => {
    const newPath = findNodePath(sampleFileSystem, node.id);
    if (newPath) {
      setCurrentPath(newPath);
    }
  };

  const handleBreadcrumbNavigate = (node: FileSystemNode) => {
    const index = currentPath.findIndex((item) => item.id === node.id);
    if (index !== -1) {
      setCurrentPath(currentPath.slice(0, index + 1));
    }
  };

  return {
    currentPath,
    currentNode,
    handleNodeSelect,
    handleBreadcrumbNavigate,
  };
};