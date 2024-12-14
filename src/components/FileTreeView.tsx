import React, { useState } from 'react';
import { TreeView, TreeItem } from '@mui/x-tree-view';
import { ChevronRight, ChevronDown, Menu } from 'lucide-react';
import { FileSystemNode } from '../types/FileSystem';
import { TreeItemContent } from './TreeItem/TreeItemContent';
import { useMediaQuery, Drawer, IconButton } from '@mui/material';

interface FileTreeViewProps {
  data: FileSystemNode[];
  onNodeSelect?: (node: FileSystemNode) => void;
}

const renderTree = (node: FileSystemNode, onNodeSelect?: (node: FileSystemNode) => void) => {
  return (
    <TreeItem
      key={node.id}
      nodeId={node.id}
      label={<TreeItemContent node={node} />}
      onClick={() => onNodeSelect?.(node)}
    >
      {node.children?.map((child) => renderTree(child, onNodeSelect))}
    </TreeItem>
  );
};

export const FileTreeView: React.FC<FileTreeViewProps> = ({ data, onNodeSelect }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const treeContent = (
    <TreeView
      defaultCollapseIcon={<ChevronDown size={18} />}
      defaultExpandIcon={<ChevronRight size={18} />}
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
      {data.map((node) => renderTree(node, onNodeSelect))}
    </TreeView>
  );

  if (isMobile) {
    return (
      <>
        <IconButton 
          onClick={() => setIsDrawerOpen(true)}
          className="fixed top-4 left-4 z-50"
        >
          <Menu />
        </IconButton>
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <div className="w-[280px] p-4">
            {treeContent}
          </div>
        </Drawer>
      </>
    );
  }

  return treeContent;
};