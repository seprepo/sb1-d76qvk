import React from 'react';
import { Button } from '@mui/material';
import { FolderPlus, Upload } from 'lucide-react';

interface ContentActionsProps {
  onCreateFolder: () => void;
  onUpload: () => void;
}

export const ContentActions: React.FC<ContentActionsProps> = ({
  onCreateFolder,
  onUpload,
}) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <Button
        variant="contained"
        startIcon={<Upload size={18} />}
        onClick={onUpload}
        className="bg-blue-600 hover:bg-blue-700"
      >
        Upload Files
      </Button>
      <Button
        variant="outlined"
        startIcon={<FolderPlus size={18} />}
        onClick={onCreateFolder}
        className="border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        New Folder
      </Button>
    </div>
  );
};