import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Paper } from '@mui/material';
import { ChevronRight, Home, Folder } from 'lucide-react';
import { FileSystemNode } from '../../types/FileSystem';
import { FileIcon } from '../FileIcon';
import { getFileType } from '../../utils/fileTypeUtils';
import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface BreadcrumbsProps {
  path: FileSystemNode[];
  onNavigate: (node: FileSystemNode) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path, onNavigate }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { t } = useTranslation();

  return (
    <Paper elevation={0} className="sticky top-0 z-10 border-b bg-white text-xs">
      <MuiBreadcrumbs
        separator={<ChevronRight size={18} className="text-gray-400" />}
        aria-label="file system navigation"
        className="px-3 md:px-6 py-2 md:py-3 text-xs"
        maxItems={isMobile ? 2 : undefined}
        itemsAfterCollapse={isMobile ? 1 : undefined}
      >
        <Link
          component="button"
          onClick={() => onNavigate(path[0])}
          className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 no-underline hover:underline"
          underline="none"
        >
          <Home size={18} />
          <span className="text-base">{t('home')}</span>
        </Link>
        
        {path.slice(1).map((node, index) => {
          const isLast = index === path.length - 2;
          const fileType = node.type === 'file' ? getFileType(node.name) : undefined;
          
          const icon = node.type === 'folder' ? (
            <Folder size={18} className="text-yellow-600" />
          ) : (
            <FileIcon type={node.type} fileType={fileType} />
          );

          return isLast ? (
            <Typography
              key={node.id}
              className="flex items-center gap-1.5 text-xs text-gray-600"
            >
              {icon}
              <span className="text-base">{node.name}</span>
            </Typography>
          ) : (
            <Link
              key={node.id}
              component="button"
              onClick={() => onNavigate(node)}
              className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 no-underline hover:underline"
              underline="none"
            >
              {icon}
              <span className="text-base">{node.name}</span>
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Paper>
  );
};