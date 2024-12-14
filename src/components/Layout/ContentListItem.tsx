import React from 'react';
import { IconButton, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Download, Eye, Share2, Trash2, MoreVertical, Copy, Edit, Archive, Info } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FileSystemNode } from '../../types/FileSystem';
import { FileIcon } from '../FileIcon';
import { getFileType } from '../../utils/fileTypeUtils';

interface ContentListItemProps {
  item: FileSystemNode;
  onSelect: (node: FileSystemNode) => void;
}

export const ContentListItem: React.FC<ContentListItemProps> = ({ item, onSelect }) => {
  const fileType = item.type === 'file' ? getFileType(item.name) : undefined;
  
  const formatCreationDate = (dateString: string) => {
    const date = new Date(dateString);
    return `Créé ${formatDistanceToNow(date, { addSuffix: true, locale: fr })} par ${item.createdBy}`;
  };

  const handleAction = (action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`${action} action for ${item.name}`);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleMenuAction = (action: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(`Menu action ${action} for ${item.name}`);
    setAnchorEl(null);
  };

  return (
    <div
      onClick={() => onSelect(item)}
      className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer group"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-lg">
          <FileIcon
            type={item.type}
            fileType={fileType}
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-medium truncate">{item.name}</span>
          <div className="flex gap-2 text-sm text-gray-500">
            <span className="truncate">
              {item.type === 'folder' 
                ? `${item.children?.length || 0} element(s)`
                : fileType}
            </span>
            <span className="flex-shrink-0">•</span>
            <span className="truncate">{formatCreationDate(item.created)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
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
        <Tooltip title="Plus d'actions">
          <IconButton 
            size="small" 
            onClick={handleMenuOpen}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MoreVertical size={18} />
          </IconButton>
        </Tooltip>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          onClick={(e) => e.stopPropagation()}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={(e) => handleMenuAction('duplicate', e)}>
            <ListItemIcon>
              <Copy size={18} />
            </ListItemIcon>
            <ListItemText>Dupliquer</ListItemText>
          </MenuItem>
          <MenuItem onClick={(e) => handleMenuAction('rename', e)}>
            <ListItemIcon>
              <Edit size={18} />
            </ListItemIcon>
            <ListItemText>Renommer</ListItemText>
          </MenuItem>
          <MenuItem onClick={(e) => handleMenuAction('archive', e)}>
            <ListItemIcon>
              <Archive size={18} />
            </ListItemIcon>
            <ListItemText>Archiver</ListItemText>
          </MenuItem>
          <MenuItem onClick={(e) => handleMenuAction('details', e)}>
            <ListItemIcon>
              <Info size={18} />
            </ListItemIcon>
            <ListItemText>Détails</ListItemText>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};