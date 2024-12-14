import React from 'react';
import { TreeView, TreeItem } from '@mui/x-tree-view';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { FileSystemNode } from '../types/FileSystem';
import { TreeItemContent } from './TreeItem/TreeItemContent';

interface FileTreeViewProps {
  data: FileSystemNode[];
  onNodeSelect?: (node: FileSystemNode) => void;
}

const renderTree = (node: FileSystemNode, onNodeSelect?: (node: FileSystemNode) => void) => {
  // Skip rendering if it's a file
  if (node.type === 'file') return null;

  // Filter children to only include folders
  const folderChildren = node.children?.filter(child => child.type === 'folder') || [];

  return (
    <TreeItem
      key={node.id}
      nodeId={node.id}
      label={<TreeItemContent node={node} />}
      onClick={() => onNodeSelect?.(node)}
    >
      {folderChildren.map((child) => renderTree(child, onNodeSelect))}
    </TreeItem>
  );
};

export const FileTreeView: React.FC<FileTreeViewProps> = ({ data, onNodeSelect }) => {
  // Filter root level to only include folders
  const folderData = data.filter(node => node.type === 'folder');

  return (
    <TreeView
      defaultCollapseIcon={<ChevronDown size={18} />}
      defaultExpandIcon={<ChevronRight size={18} />}
      defaultExpanded={['1']}
      sx={{
        height: '100%',
        flexGrow: 1,
        maxWidth: '100%',
        overflowY: 'auto',
        '& .MuiTreeItem-root': {
          '& .MuiTreeItem-content': {
            padding: '2px 0',
          },
        },
      }}
    >
      {folderData.map((node) => renderTree(node, onNodeSelect))}
    </TreeView>
  );
};