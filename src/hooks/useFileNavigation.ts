import { useState, useEffect } from 'react';
import { FileSystemNode } from '../types/FileSystem';
import { fetchChildren, fetchNodePath } from '../services/nodeService';

export const useFileNavigation = () => {
  const [currentPath, setCurrentPath] = useState<FileSystemNode[]>([]);
  const [currentNode, setCurrentNode] = useState<FileSystemNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeNavigation = async () => {
      const rootChildren = await fetchChildren();
      if (rootChildren.length > 0) {
        setCurrentPath([rootChildren[0]]);
        setCurrentNode(rootChildren[0]);
      }
      setIsLoading(false);
    };

    initializeNavigation();
  }, []);

  const handleNodeSelect = async (node: FileSystemNode) => {
    try {
      const newPath = await fetchNodePath(node.id);
      if (newPath) {
        setCurrentPath(newPath);
        setCurrentNode(node);
      }
    } catch (error) {
      console.error('Error navigating to node:', error);
    }
  };

  const handleBreadcrumbNavigate = async (node: FileSystemNode) => {
    try {
      const newPath = await fetchNodePath(node.id);
      if (newPath) {
        setCurrentPath(newPath);
        setCurrentNode(node);
      }
    } catch (error) {
      console.error('Error navigating to breadcrumb:', error);
    }
  };

  return {
    currentPath,
    currentNode,
    isLoading,
    handleNodeSelect,
    handleBreadcrumbNavigate,
  };
};