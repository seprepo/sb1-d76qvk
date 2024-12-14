import { FileSystemNode } from '../types/FileSystem';

export const findNodePath = (
  nodes: FileSystemNode[],
  targetId: string,
  path: FileSystemNode[] = []
): FileSystemNode[] | null => {
  for (const node of nodes) {
    const newPath = [...path, node];
    if (node.id === targetId) return newPath;
    if (node.children) {
      const found = findNodePath(node.children, targetId, newPath);
      if (found) return found;
    }
  }
  return null;
};